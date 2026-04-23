"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { 
  IconPhoto, 
  IconSlideshow, 
  IconPackage, 
  IconToolsKitchen2,
  IconLogout, 
  IconPlus, 
  IconTrash, 
  IconSearch, 
  IconCheck, 
  IconX,
  IconMenu2,
  IconLoader2,
  IconUpload,
  IconAlertCircle
} from "@tabler/icons-react";

// Shared Components
import Lightbox from "@/components/admin/Lightbox";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import Toast from "@/components/admin/Toast";

const NAV_ITEMS = [
  { id: "gallery", label: "Gallery", icon: <IconPhoto size={20} /> },
  { id: "carousel", label: "Carousel", icon: <IconSlideshow size={20} /> },
  { id: "events", label: "Events", icon: <IconPackage size={20} /> },
  { id: "catering", label: "Catering", icon: <IconToolsKitchen2 size={20} /> },
];

function UploadProgressBar({ progress, uploading }) {
  if (!uploading) return null;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-[#6B5E4E] font-body tracking-wide">
          Uploading...
        </span>
        <span className="text-xs font-medium text-[#C9A84C] font-body">
          {progress}%
        </span>
      </div>
      <div className="w-full h-px bg-[#E8E0D0] overflow-hidden">
        <div
          className="h-full bg-[#C9A84C] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ImageCard({ img, index, onDelete, onSelect, onPreview, isSelected, label, isVideo = false }) {
  // Use secure_url or url from new API
  const src = img.url || img.secure_url;

  return (
    <div
      onClick={() => onSelect(img.public_id)}
      className={`relative group cursor-pointer ${isVideo ? "aspect-video" : "aspect-square"} bg-[#F2EDE4] overflow-hidden rounded-xl border-2 transition-all duration-200 
                 ${isSelected ? "border-[#C9A84C] scale-[0.98] shadow-inner" : "border-[#E8E0D4] hover:shadow-md"}`}
    >
      <Image
        src={src}
        alt={label || `Image ${index + 1}`}
        fill
        className={`object-cover transition-transform duration-500 ${isSelected ? "scale-105 opacity-80" : "group-hover:scale-105"}`}
        sizes="(max-width: 1280px) 20vw, 16vw"
        loading="lazy"
      />

      {/* Index badge — top left */}
      {label && (
        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 font-body tracking-wide pointer-events-none z-10">
          {label}
        </div>
      )}

      {/* Selection Indicator */}
      <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10
                      ${isSelected ? "bg-[#C9A84C] border-[#C9A84C] scale-110" : "bg-black/20 border-white opacity-0 group-hover:opacity-100"}`}>
        {isSelected && <IconCheck size={12} className="text-[#0F0A07]" />}
      </div>

      {/* Hover overlay — Only show delete if NOT selected, or show both? 
          Actually, let's make selection primary on click, and delete button on top. */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-200 flex items-center justify-center gap-4
                      ${isSelected ? "opacity-40" : "opacity-0 group-hover:opacity-100"}`}>
        {!isSelected && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(index); }}
              className="bg-white text-[#1C1009] p-2 rounded-full transition-all duration-150 transform hover:scale-110 shadow-lg"
              title="Preview Image"
            >
              <IconSearch size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(img); }}
              className="bg-white/90 hover:bg-red-500 hover:text-white text-[#1C1009] p-2 rounded-full transition-all duration-150 transform hover:scale-110 shadow-lg"
              title="Delete permanently"
            >
              <IconTrash size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  
  // Tabs & Navigation
  const [activeTab, setActiveTab] = useState("gallery");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const [eventCategory, setEventCategory] = useState("weddings");
  
  const [toasts, setToasts] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, count: 1, onConfirm: null, loading: false });
  const [preview, setPreview] = useState({ isOpen: false, index: 0 });

  // Refs
  const fileInputRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Header Animation
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    
    fetchImages();
  }, [activeTab, eventCategory]);

  // Toast Helper
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- API FETCHERS ---

  const toggleSelect = (publicId) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(publicId)) next.delete(publicId);
      else next.add(publicId);
      return next;
    });
  };

  const fetchImages = async () => {
    setLoading(true);
    const section = activeTab === "events" ? eventCategory : activeTab;
    try {
      const res = await fetch(`/api/images?section=${section}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setImages(data.images || []);
    } catch (err) {
      addToast(err.message || "Failed to load images", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files);
    const section = activeTab === "events" ? eventCategory : activeTab;

    setUploading(true);
    setError("");
    setProgress(0);

    let uploadedCount = 0;

    for (const file of fileArr) {
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("section", section);

        const res = await fetch("/api/images", { 
          method: "POST", 
          body: form 
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Upload failed");
          addToast(data.error || "Upload failed", "error");
        } else {
          uploadedCount++;
          setProgress(Math.round((uploadedCount / fileArr.length) * 100));
          // Update UI immediately
          setImages(prev => [data, ...prev]);
        }
      } catch (err) {
        setError(`Failed to upload ${file.name}`);
        addToast(`Failed to upload ${file.name}`, "error");
      }
    }

    setUploading(false);
    setProgress(0);
    // Refresh to ensure order is correct (carousel is oldest-first)
    fetchImages();
  };

  const handleDelete = (img) => {
    setConfirmDelete({
      isOpen: true,
      count: 1,
      image: { ...img, secure_url: img.url || img.secure_url },
      loading: false,
      onConfirm: async () => {
        setConfirmDelete(prev => ({ ...prev, loading: true }));
        const section = activeTab === "events" ? eventCategory : activeTab;
        try {
          const res = await fetch("/api/images", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_id: img.public_id, section }),
          });

          if (!res.ok) {
            const data = await res.json();
            addToast(data.error || "Delete failed", "error");
          } else {
            setImages(prev => prev.filter(i => i.public_id !== img.public_id));
            addToast("Deleted successfully");
          }
        } catch {
          addToast("Network error", "error");
        } finally {
          setConfirmDelete({ isOpen: false, count: 1, onConfirm: null, loading: false });
        }
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    const section = activeTab === "events" ? eventCategory : activeTab;
    const selectedImages = images.filter(img => selectedIds.has(img.public_id))
      .map(img => ({ ...img, secure_url: img.url || img.secure_url }));

    setConfirmDelete({
      isOpen: true,
      count: selectedIds.size,
      images: selectedImages,
      loading: false,
      onConfirm: async () => {
        setConfirmDelete(prev => ({ ...prev, loading: true }));
        try {
          let successCount = 0;
          for (const publicId of selectedIds) {
            const res = await fetch("/api/images", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ public_id: publicId, section }),
            });
            if (res.ok) successCount++;
          }
          addToast(`Deleted ${successCount} images`);
          fetchImages();
          setSelectedIds(new Set());
        } catch {
          addToast("Bulk delete failed", "error");
        } finally {
          setConfirmDelete({ isOpen: false, count: 1, onConfirm: null, loading: false });
        }
      }
    });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/brp-portal-login/login";
  };

  const openPreview = (index) => {
    setPreview({ isOpen: true, index });
  };

  const closePreview = () => {
    setPreview(prev => ({ ...prev, isOpen: false }));
  };

  const handlePrevPreview = () => {
    setPreview(prev => ({
      ...prev,
      index: prev.index === 0 ? images.length - 1 : prev.index - 1
    }));
  };

  const handleNextPreview = () => {
    setPreview(prev => ({
      ...prev,
      index: (prev.index + 1) % images.length
    }));
  };

  // --- SUB-COMPONENTS ---

  const SkeletonCard = () => (
    <div className="aspect-square rounded-xl bg-[#E8E0D4]/40 animate-pulse border border-[#E8E0D4]/50" />
  );

  const PageHeader = ({ title, countLabel, action }) => (
    <div className="flex items-end justify-between py-6 border-b border-[#E8E0D4] mb-8 sticky top-0 bg-[#F7F4EF]/80 backdrop-blur-md z-30 px-2 -mx-2">
      <div>
        <h2 className="font-heading text-3xl text-[#1C1009] flex items-center gap-3">
          {title}
          {countLabel && (
            <span className="text-xs font-body font-semibold px-2 py-0.5 bg-[#C9A84C]/15 text-[#C9A84C] rounded tracking-widest">
              {countLabel}
            </span>
          )}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        {action}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F7F4EF] text-[#1C1009]">
      
      {/* SIDEBAR */}
      <aside className={`fixed top-0 bottom-0 left-0 bg-[#0F0A07] w-[220px] z-[60] transition-transform duration-300 xl:translate-x-0 overflow-y-auto
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-6 py-8 border-b border-white/5 mb-6">
          <p className="text-[#C9A84C]/60 text-[9px] tracking-[0.35em] uppercase font-body mb-2">
            Admin Panel
          </p>
          <h1 className="font-heading text-white text-xl leading-snug">
            Basti Ram<br />Palace
          </h1>
        </div>

        <nav className="px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-xs tracking-[0.15em] uppercase font-body
                         ${activeTab === item.id 
                           ? "bg-[#C9A84C] text-[#0F0A07] font-bold" 
                           : "text-white/40 hover:text-white/70 hover:bg-white/5"}`}
            >
              <span className={activeTab === item.id ? "text-[#0F0A07]" : "text-[#C9A84C]/50"}>
                {item.icon}
              </span>
              {item.label}
              {item.id === "carousel" && activeTab === "carousel" && images.length > 0 && (
                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-sm
                                 ${activeTab === item.id ? "bg-[#0F0A07]/10 text-[#0F0A07]" : "bg-white/5 text-white/30"}`}>
                  {images.length}/8
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-3 pt-12">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs tracking-widest uppercase font-body"
          >
            <IconLogout size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="xl:hidden fixed top-0 left-0 right-0 h-16 bg-[#0F0A07] flex items-center justify-between px-6 z-50">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#C9A84C] p-2 -ml-2">
          {isSidebarOpen ? <IconX /> : <IconMenu2 />}
        </button>
        <h1 className="text-white font-heading text-lg">Admin Panel</h1>
        <div className="w-8" /> {/* Spacer to keep title centered if desired, or just leave it between */}
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 xl:ml-[220px] min-h-screen pt-16 xl:pt-0">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          <div className="space-y-8">
            <PageHeader 
              title={
                activeTab === "gallery" ? "Venue Gallery" : 
                activeTab === "carousel" ? "Homepage Carousel" : 
                activeTab === "events" ? "Events Media" : "Catering Media"
              }
              countLabel={activeTab === "carousel" ? `${images.length}/8 slides` : `${images.length} images`}
              action={
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-[#C9A84C] text-[#0F0A07] px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? <IconLoader2 size={18} className="animate-spin" /> : <IconPlus size={18} />}
                  Upload
                </button>
              }
            />

            {/* MANAGEMENT GUIDELINES */}
            <div className="bg-[#E8E0D4]/20 border border-[#E8E0D4] rounded-2xl p-6 mb-8">
              <h3 className="font-heading text-lg text-[#1C1009] mb-4 flex items-center gap-2">
                <IconAlertCircle className="text-[#C9A84C]" size={20} />
                Management Guidelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-[10px] tracking-widest uppercase text-[#C9A84C] font-semibold">Homepage Carousel</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed">
                    Upload between <strong>3 to 8</strong> high-quality landscape images. These form the first impression on the home page.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] tracking-widest uppercase text-[#C9A84C] font-semibold">Event Categories</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed">
                    Minimum <strong>5 images</strong> per category (Weddings, Corporate, Private) to ensure the masonry gallery looks rich and complete.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] tracking-widest uppercase text-[#C9A84C] font-semibold">Venue Gallery</p>
                  <p className="text-xs text-[#7A6A5A] leading-relaxed">
                    Minimum <strong>12 images</strong> required. These are used in the scrolling gallery and the main gallery page.
                  </p>
                </div>
              </div>
            </div>

            {activeTab === "events" && (
              <div className="flex gap-4 p-1 bg-[#E8E0D4]/30 rounded-lg w-fit mb-8 border border-[#E8E0D4]/50">
                {["weddings", "corporate", "private-parties"].map((id) => (
                  <button
                    key={id}
                    onClick={() => { if (!uploading) setEventCategory(id); }}
                    className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-all
                               ${eventCategory === id ? "bg-white text-[#C9A84C] shadow-sm" : "text-[#7A6A5A] hover:bg-white/50"}`}
                  >
                    {id.replace("-", " ")}
                  </button>
                ))}
              </div>
            )}

            <div 
              onClick={() => !uploading && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={(e) => { e.preventDefault(); handleUpload(e.dataTransfer.files); }}
              className="border-2 border-dashed border-[#C9A84C]/30 rounded-2xl bg-[#C9A84C]/[0.03] hover:bg-[#C9A84C]/[0.06] transition-all cursor-pointer p-12 text-center group"
            >
              <input 
                type="file" 
                multiple 
                hidden 
                ref={fileInputRef} 
                onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} 
                accept="image/*"
              />
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] mb-4 group-hover:scale-110 transition-transform">
                  {uploading ? <IconLoader2 className="animate-spin" /> : <IconUpload />}
                </div>
                <h3 className="text-[#1C1009] font-semibold mb-1 uppercase tracking-wider text-sm">Click or drag images to upload</h3>
                <p className="text-[#7A6A5A] text-xs font-body">PNG, JPG or WebP up to 10MB per file</p>
              </div>
            </div>

            {activeTab === "carousel" && images.length >= 8 && (
              <div className="bg-[#FAF0F0] border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-800">
                 <IconAlertCircle size={20} />
                 <p className="text-sm font-body">Slide limit reached (8/8). Delete a slide to upload new ones.</p>
              </div>
            )}

            <UploadProgressBar progress={progress} uploading={uploading} />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              ) : images.length === 0 ? (
                <div className="col-span-full py-24 flex flex-col items-center justify-center text-center opacity-40">
                  <span className="text-6xl mb-4">📷</span>
                  <h3 className="text-lg font-heading text-[#1C1009] mb-1">No images yet</h3>
                  <p className="text-sm font-body">Upload your first image above to get started</p>
                </div>
              ) : (
                images.map((img, i) => (
                  <ImageCard
                    key={img.public_id}
                    img={img}
                    index={i}
                    onDelete={handleDelete}
                    onSelect={toggleSelect}
                    onPreview={openPreview}
                    isSelected={selectedIds.has(img.public_id)}
                    label={activeTab === "carousel" ? `Slide ${i + 1}` : null}
                    isVideo={activeTab === "carousel"}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete.onConfirm}
        isLoading={confirmDelete.loading}
        count={confirmDelete.count}
        image={confirmDelete.image}
        images={confirmDelete.images}
      />

      {/* BULK ACTION BAR SKELETON (if needed) */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-0 xl:left-[220px] right-0 bg-[#0F0A07] border-t border-[#C9A84C]/30 px-8 py-5 z-40 flex items-center justify-between">
          <span className="text-[#C9A84C] font-semibold">{selectedIds.size} selected</span>
          <button onClick={handleBulkDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <IconTrash size={18} /> Delete Selected
          </button>
        </div>
      )}

      {/* LIGHTBOX PREVIEW */}
      <Lightbox
        isOpen={preview.isOpen}
        onClose={closePreview}
        images={images.map(img => ({ ...img, secure_url: img.url || img.secure_url }))}
        currentIndex={preview.index}
        onPrev={handlePrevPreview}
        onNext={handleNextPreview}
      />

      {/* TOASTS */}
      <div className="pointer-events-none fixed inset-0 z-[200]">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>

    </div>
  );
}
