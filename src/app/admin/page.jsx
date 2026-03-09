'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { ToastContainer, useToast } from '@/components/admin/ToastSystem';

const getAuthToken = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(^| )admin_token=([^;]+)/);
  return match ? match[2] : null;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('gallery');
  const [images, setImages] = useState({ gallery: [], events: { weddings: [], corporate: [], 'private-parties': [] } });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Custom Hook Toast
  const { toasts, showToast, removeToast } = useToast();

  // Selection & Dialog State
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: null,
    targetId: null,
    targetCategory: null,
    targetTab: null,
    isLoading: false,
  });

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/images/gallery', {
        headers: { Authorization: getAuthToken() }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.images) {
        setImages(prev => ({ ...prev, gallery: data.images }));
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      showToast({ message: 'Failed to load gallery images', type: 'error' });
    }
  };

  const fetchEvents = async () => {
    try {
      const categories = ['weddings', 'corporate', 'private-parties'];
      const results = { weddings: [], corporate: [], 'private-parties': [] };
      
      for (const cat of categories) {
        const res = await fetch(`/api/images/events/${cat}`, {
          headers: { Authorization: getAuthToken() }
        });
        const data = await res.json();
        if (data.images) {
          results[cat] = data.images;
        }
      }
      
      setImages(prev => ({ ...prev, events: results }));
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast({ message: 'Failed to load event images', type: 'error' });
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (activeTab === 'gallery') {
        await fetchGallery();
      } else {
        await fetchEvents();
      }
      setLoading(false);
      exitSelectionMode(); // Reset selection on tab switch
    };
    init();
  }, [activeTab]);

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/admin/login');
  };

  // ---------------------------------------------------------------------------
  // SELECTION LOGIC
  // ---------------------------------------------------------------------------
  
  const validateCurrentSet = () => {
    let currentSet = [];
    if (activeTab === 'gallery') {
      currentSet = images.gallery;
    } else {
      currentSet = [
        ...images.events.weddings,
        ...images.events.corporate,
        ...images.events['private-parties']
      ];
    }
    return currentSet;
  };

  const toggleSelectionMode = () => {
    if (selectionMode) {
      exitSelectionMode();
    } else {
      setSelectionMode(true);
    }
  };

  const toggleSelection = (public_id) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(public_id)) newSet.delete(public_id);
      else newSet.add(public_id);
      return newSet;
    });
  };

  const selectAll = () => {
    const currentSet = validateCurrentSet();
    const newSet = new Set(currentSet.map(img => img.public_id));
    setSelectedIds(newSet);
  };

  const deselectAll = () => setSelectedIds(new Set());
  
  const exitSelectionMode = () => {
    setSelectionMode(false);
    deselectAll();
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectionMode) return;
      
      // Ignore if confirm dialog is open
      if (confirmDialog.isOpen) return;

      if (e.key === 'Escape') {
        exitSelectionMode();
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        selectAll();
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedIds.size > 0) {
        e.preventDefault();
        triggerBulkDeleteConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectionMode, selectedIds, confirmDialog.isOpen, activeTab, images]);


  // ---------------------------------------------------------------------------
  // DELETE LOGIC (API CALLS & DIALOG FLOW)
  // ---------------------------------------------------------------------------

  const deleteSingleImageAPI = async (public_id, type) => {
    const endpoint = type === 'gallery' ? '/api/images/gallery' : '/api/images/events';
    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthToken()
      },
      body: JSON.stringify({ public_id })
    });
    if (!res.ok) throw new Error('API Error');
    return res;
  };

  const executeDelete = async () => {
    setConfirmDialog(prev => ({ ...prev, isLoading: true }));

    try {
      if (confirmDialog.type === 'single') {
        await deleteSingleImageAPI(confirmDialog.targetId, confirmDialog.targetTab);
        showToast({ message: 'Photo deleted successfully' });
        
        // Refresh grid
        if (confirmDialog.targetTab === 'gallery') fetchGallery();
        else fetchEvents();
        
      } else if (confirmDialog.type === 'bulk') {
        const idsArray = Array.from(selectedIds);
        
        // Execute all deletes in parallel
        const results = await Promise.allSettled(
          idsArray.map(id => {
            // Find which tab this image belongs to based on the current active tab
            // (Assuming you can only bulk delete from the currently active tab)
            return deleteSingleImageAPI(id, activeTab);
          })
        );
        
        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failCount = results.filter(r => r.status === 'rejected').length;

        if (failCount === 0) {
          showToast({ message: `${successCount} photo${successCount > 1 ? 's' : ''} deleted successfully` });
          exitSelectionMode();
        } else if (successCount > 0) {
          showToast({ 
            message: `${successCount} deleted, ${failCount} failed`, 
            subMessage: 'Failed photos remain selected',
            type: 'warning'
          });
          
          // Remove successful IDs from selection
          const successfulIds = new Set(
            results.map((r, i) => r.status === 'fulfilled' ? idsArray[i] : null).filter(Boolean)
          );
          setSelectedIds(prev => {
            const newSet = new Set(prev);
            successfulIds.forEach(id => newSet.delete(id));
            return newSet;
          });
        } else {
          showToast({ message: 'Failed to delete photos. Please try again.', type: 'error' });
        }

        // Refresh grid
        if (activeTab === 'gallery') fetchGallery();
        else fetchEvents();
      }
      
      closeConfirmDialog();
    } catch (error) {
      showToast({ message: 'An error occurred during deletion.', type: 'error' });
      setConfirmDialog(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Triggers
  const triggerSingleDeleteConfirm = (public_id, type, category) => {
    setConfirmDialog({
      isOpen: true,
      type: 'single',
      targetId: public_id,
      targetCategory: category,
      targetTab: type,
      isLoading: false,
    });
  };

  const triggerBulkDeleteConfirm = () => {
    setConfirmDialog({
      isOpen: true,
      type: 'bulk',
      targetId: null,
      targetCategory: null,
      targetTab: null,
      isLoading: false,
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
  };

  const getPreviewImages = () => {
    if (confirmDialog.type !== 'bulk' || selectedIds.size === 0) return [];
    const currentSet = validateCurrentSet();
    return currentSet.filter(img => selectedIds.has(img.public_id));
  };

  // ---------------------------------------------------------------------------
  // MISC ACTIONS
  // ---------------------------------------------------------------------------

  const copyURL = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast({ message: 'URL copied to clipboard', type: 'info' });
    } catch (err) {
      showToast({ message: 'Failed to copy URL', type: 'error' });
    }
  };

  const handleFileUpload = async (files, type, category = null) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    const endpoint = type === 'gallery' ? '/api/images/gallery' : '/api/images/events';

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);
      if (category) {
        formData.append('category', category);
      }

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: getAuthToken()
          },
          body: formData
        });

        if (res.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        errorCount++;
      }
    }

    setUploading(false);
    if (successCount > 0) {
      showToast({ message: `Successfully uploaded ${successCount} image(s)` });
      if (type === 'gallery') fetchGallery();
      else fetchEvents();
    }
    if (errorCount > 0) {
      showToast({ message: `Failed to upload ${errorCount} image(s)`, type: 'error' });
    }
    
    // Reset file input if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDropGallery = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files, 'gallery');
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------------------------

  const renderImageGrid = (imgs = [], type, category) => {
    if (!imgs || imgs.length === 0) {
      return <div className="text-gray-500 py-8 text-center bg-gray-50 rounded-lg border border-dashed">No images found</div>;
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6 mt-6">
        {imgs.map((img) => {
          const isSelected = selectedIds.has(img.public_id);
          
          return (
            <div 
              key={img.public_id} 
              className={`relative group rounded-xl overflow-hidden aspect-square bg-gray-100 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md
                ${isSelected ? 'border-[3px] border-[#C9A84C]' : 'border border-gray-200'}`}
              onClick={() => {
                if (selectionMode) toggleSelection(img.public_id);
              }}
            >
              <Image 
                src={img.secure_url} 
                alt="Uploaded image" 
                fill
                className={`object-cover transition-transform duration-300 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {/* Overlay states */}
              {!selectionMode && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-end justify-start p-3">
                  {/* Three-Dot Menu Alternative */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col origin-top-right transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                    <button onClick={(e) => { e.stopPropagation(); setSelectionMode(true); toggleSelection(img.public_id); }} className="px-4 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                       <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Select
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); copyURL(img.secure_url); }} className="px-4 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                       <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy URL
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); triggerSingleDeleteConfirm(img.public_id, type, category); }} className="px-4 py-2 text-sm text-left font-medium text-red-600 hover:bg-red-50 flex items-center gap-2">
                       <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Delete
                    </button>
                  </div>
                </div>
              )}

              {/* Selection Checkbox */}
              {selectionMode && (
                <div className="absolute top-3 left-3 z-10">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#C9A84C] border-[#C9A84C]' : 'bg-black/20 border-white hover:bg-black/40'
                  }`}>
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0] text-gray-800 font-sans pb-32">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Ram Palace <span className="font-light text-gray-500 hidden sm:inline">| Admin Panel</span>
          </h1>
          <button 
            onClick={handleLogout}
            className="text-sm font-medium px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'gallery' ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'events' ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Events
          </button>
        </div>

        {uploading && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg flex items-center gap-3 shadow-inner">
            <svg className="animate-spin h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="font-medium">Uploading images, please wait...</span>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gallery Images</h2>
              <div className="flex items-center gap-3">
                
                {/* Selection Toggle */}
                {!loading && images.gallery.length > 0 && (
                  <button 
                    onClick={toggleSelectionMode}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-colors border text-sm flex items-center gap-2 ${selectionMode ? 'bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {selectionMode ? 'Cancel Selection' : 'Select'}
                  </button>
                )}

                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  id="gallery-upload"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e.target.files, 'gallery')}
                />
                <label 
                  htmlFor="gallery-upload"
                  className="cursor-pointer bg-[#C9A84C] hover:bg-[#b0923d] text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Files
                </label>
              </div>
            </div>
            
            {/* Drag & Drop Zone */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors mb-8 cursor-pointer group"
              onDragOver={onDragOver}
              onDrop={onDropGallery}
              onClick={() => document.getElementById('gallery-upload').click()}
            >
              <div className="bg-white w-16 h-16 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A84C]/10 group-hover:text-[#C9A84C] transition-colors">
                <svg className="h-8 w-8 text-gray-400 group-hover:text-[#C9A84C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <p className="text-gray-700 font-medium text-lg">Drag and drop images here, or click to browse</p>
              <p className="text-gray-500 text-sm mt-2">Supports high-res JPG, PNG, WEBP (Auto-optimized by Cloudinary)</p>
            </div>

            {loading ? (
              <div className="py-16 flex justify-center"><div className="animate-pulse w-10 h-10 rounded-full bg-[#C9A84C]"></div></div>
            ) : (
              renderImageGrid(images.gallery, 'gallery')
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-8">

            {/* Global Events Selection Toggle (Top Right) */}
            <div className="flex justify-end gap-3 mb-4">
              {!loading && (
                <button 
                  onClick={toggleSelectionMode}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-colors border text-sm flex items-center gap-2 ${selectionMode ? 'bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectionMode ? 'Cancel Selection' : 'Select'}
                </button>
              )}
            </div>

            {/* Weddings Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold">Weddings</h2>
                <div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    id="weddings-upload"
                    onChange={(e) => {
                      handleFileUpload(e.target.files, 'events', 'weddings');
                      e.target.value = '';
                    }}
                  />
                  <label 
                    htmlFor="weddings-upload"
                    className="cursor-pointer bg-[#C9A84C] hover:bg-[#b0923d] text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Add Photos
                  </label>
                </div>
              </div>
              {loading ? <div className="py-8 text-center text-gray-500">Loading...</div> : renderImageGrid(images.events.weddings, 'events', 'weddings')}
            </div>

            {/* Corporate Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold">Corporate Events</h2>
                <div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    id="corporate-upload"
                    onChange={(e) => {
                      handleFileUpload(e.target.files, 'events', 'corporate');
                      e.target.value = '';
                    }}
                  />
                  <label 
                    htmlFor="corporate-upload"
                    className="cursor-pointer bg-[#C9A84C] hover:bg-[#b0923d] text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Add Photos
                  </label>
                </div>
              </div>
              {loading ? <div className="py-8 text-center text-gray-500">Loading...</div> : renderImageGrid(images.events.corporate, 'events', 'corporate')}
            </div>

            {/* Private Parties Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold">Private Parties</h2>
                <div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    id="private-upload"
                    onChange={(e) => {
                      handleFileUpload(e.target.files, 'events', 'private-parties');
                      e.target.value = '';
                    }}
                  />
                  <label 
                    htmlFor="private-upload"
                    className="cursor-pointer bg-[#C9A84C] hover:bg-[#b0923d] text-white px-4 py-2 text-sm rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Add Photos
                  </label>
                </div>
              </div>
              {loading ? <div className="py-8 text-center text-gray-500">Loading...</div> : renderImageGrid(images.events['private-parties'], 'events', 'private-parties')}
            </div>
          </div>
        )}

      </main>

      {/* FIXED BOTTOM SELECTION BAR */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-200 p-4 sm:px-8 z-50 transform transition-transform duration-300 ease-in-out flex flex-col sm:flex-row justify-between items-center gap-4 ${
          selectionMode && selectedIds.size > 0 ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        <div className="flex items-center gap-4 text-gray-800">
          <div className="bg-[#C9A84C]/10 text-[#C9A84C] px-3 py-1 rounded-full font-bold">
            {selectedIds.size} selected
          </div>
          <span className="text-sm text-gray-500 hidden sm:inline">Tip: Press <kbd className="bg-gray-100 px-1 border rounded text-xs mx-1">Ctrl+A</kbd> to select all &middot; <kbd className="bg-gray-100 px-1 border rounded text-xs mx-1">Esc</kbd> to cancel</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={selectAll} 
            className="text-sm font-medium px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            Select All
          </button>
          <button 
            onClick={deselectAll} 
            className="text-sm font-medium px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors"
          >
            Deselect
          </button>
          <button 
            onClick={triggerBulkDeleteConfirm} 
            className="text-sm font-bold px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete Selected
          </button>
        </div>
      </div>

      {/* Toast Notifications container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Custom Confirm Dialog Modal */}
      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.type === 'bulk' ? `Delete ${selectedIds.size} Photos` : 'Delete Photo'}
        message={
          confirmDialog.type === 'bulk' 
            ? `These ${selectedIds.size} photos will be permanently removed from your website.\nThis cannot be undone.`
            : 'This photo will be permanently removed from your website.\nThis cannot be undone.'
        }
        confirmLabel={confirmDialog.type === 'bulk' ? `Delete ${selectedIds.size} Photos` : 'Delete Photo'}
        variant="danger"
        isLoading={confirmDialog.isLoading}
        onConfirm={executeDelete}
        onCancel={closeConfirmDialog}
        previewImages={getPreviewImages()}
      />

    </div>
  );
}

