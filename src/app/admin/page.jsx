"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconLayoutDashboard, 
  IconPhoto, 
  IconSlideshow, 
  IconPackage, 
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
  { id: "dashboard", label: "Dashboard", icon: <IconLayoutDashboard size={20} /> },
  { id: "gallery", label: "Gallery", icon: <IconPhoto size={20} /> },
  { id: "carousel", label: "Carousel", icon: <IconSlideshow size={20} /> },
  { id: "events", label: "Events", icon: <IconPackage size={20} /> },
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

function ImageCard({ img, index, onDelete, label, isVideo = false }) {
  const sizeLabel = img.bytes
    ? img.bytes > 1024 * 1024
      ? `${(img.bytes/1024/1024).toFixed(1)}MB`
      : `${Math.round(img.bytes/1024)}KB`
    : "";

  return (
    <div
      className={`relative group ${isVideo ? "aspect-video" : "aspect-square"} bg-[#F2EDE4] overflow-hidden rounded-xl border border-[#E8E0D4]`}
    >
      <Image
        src={img.secure_url}
        alt={label || `Image ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 20vw, 16vw"
        loading="lazy"
      />

      {/* Index badge — top left */}
      {label && (
        <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 font-body tracking-wide pointer-events-none">
          {label}
        </div>
      )}

      {/* Size badge — bottom right */}
      {sizeLabel && (
        <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 font-body pointer-events-none group-hover:opacity-0 transition-opacity duration-150">
          {sizeLabel}
        </div>
      )}

      {/* Delete overlay — CSS only, no state */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(img.public_id); }}
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-body font-medium uppercase tracking-wider px-4 py-2 transition-colors duration-150"
        >
          {isVideo ? "Remove" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  
  // Tabs & Navigation
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [carouselUploading, setCarouselUploading] = useState(false);

  const [eventCategory, setEventCategory] = useState("weddings");
  const [eventImages, setEventImages] = useState({
    weddings: [],
    corporate: [],
    "private-parties": [],
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventUploading, setEventUploading] = useState(false);

  const [galleryProgress,  setGalleryProgress] = useState(0);
  const [carouselProgress, setCarouselProgress] = useState(0);
  const [eventProgress,    setEventProgress] = useState(0);

  const [galleryError, setGalleryError] = useState("");
  const [carouselError, setCarouselError] = useState("");
  const [eventError, setEventError] = useState("");

  // Upgrade Features: Selection, Lightbox, Deletion, Toasts
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  
  const [lightbox, setLightbox] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, image: null, count: 1, onConfirm: null, loading: false });
  const [toasts, setToasts] = useState([]);

  // Refs
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchStats();
    fetchGallery();
    fetchCarousel();
    fetchEvents("weddings");
    fetchEvents("corporate");
    fetchEvents("private-parties");
  }, []);

  useEffect(() => {
    // Reset selection when tab changes
    setSelectedIds(new Set());
    setSelectMode(false);
  }, [activeTab]);

  // Toast Helper
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- API FETCHERS ---
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchGallery = async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/images/gallery");
      const data = await res.json();
      setGalleryImages(data.images || []);
    } catch {
      addToast("Failed to load gallery", "error");
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchCarousel = async () => {
    setCarouselLoading(true);
    try {
      const res = await fetch("/api/images/carousel");
      const data = await res.json();
      setCarouselImages(data.images || []);
    } catch {
      addToast("Failed to load carousel", "error");
    } finally {
      setCarouselLoading(false);
    }
  };

  const fetchEvents = async (category) => {
    setEventLoading(true);
    try {
      const res = await fetch(`/api/images/events?category=${category}`);
      const data = await res.json();
      setEventImages((prev) => ({
        ...prev,
        [category]: data.images || [],
      }));
    } catch {
      addToast(`Failed to load ${category} images`, "error");
    } finally {
      setEventLoading(false);
    }
  };

  // --- ACTIONS ---
  // --- FIX 5: GALLERY UPLOAD HANDLER ---
  const handleGalleryUpload = async (files) => {
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files);

    setGalleryUploading(true);
    setGalleryError("");
    setGalleryProgress(0);

    let uploaded = 0;

    for (const file of fileArr) {
      try {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/images/gallery", { 
          method: "POST", 
          body: form 
        });
        const data = await res.json();

        if (!res.ok) {
          setGalleryError(data.error || "Upload failed");
          addToast(data.error || "Upload failed", "error");
        } else {
          uploaded++;
          setGalleryProgress(Math.round((uploaded / fileArr.length) * 100));
          // Optimistic — add to UI immediately
          setGalleryImages(prev => [...prev, data]);
        }
      } catch (err) {
        setGalleryError(`Failed to upload ${file.name}`);
        addToast(`Failed to upload ${file.name}`, "error");
      }
    }

    await fetchGallery();
    await fetchStats();
    setGalleryUploading(false);
    setGalleryProgress(0);
  };

  // --- FIX 6: GALLERY DELETE HANDLER ---
  const handleGalleryDelete = async (publicId) => {
    if (!confirm("Delete this image permanently?")) return;

    // Optimistic — remove immediately
    setGalleryImages(prev => prev.filter(img => img.public_id !== publicId));

    try {
      const res = await fetch("/api/images/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) {
        await fetchGallery(); // revert
        setGalleryError("Delete failed. Please try again.");
        addToast("Delete failed", "error");
      } else {
        addToast("Deleted permanently");
        await fetchStats();
      }
    } catch {
      await fetchGallery(); // revert
      setGalleryError("Network error.");
      addToast("Network error", "error");
    }
  };

  // --- FIX 7: CAROUSEL UPLOAD HANDLER ---
  const handleCarouselUpload = async (files) => {
    if (!files || files.length === 0) return;

    const slotsAvailable = 8 - carouselImages.length;

    if (slotsAvailable <= 0) {
      setCarouselError("Carousel is full (8/8). Delete a slide to add new ones.");
      addToast("Carousel is full (8/8)", "error");
      return;
    }

    const fileArr = Array.from(files).slice(0, slotsAvailable);

    setCarouselUploading(true);
    setCarouselError("");
    setCarouselProgress(0);

    let uploaded = 0;

    for (const file of fileArr) {
      try {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/images/carousel", { 
          method: "POST", 
          body: form 
        });
        const data = await res.json();

        if (!res.ok) {
          setCarouselError(data.error || "Upload failed");
          addToast(data.error || "Upload failed", "error");
        } else {
          uploaded++;
          setCarouselProgress(Math.round((uploaded / fileArr.length) * 100));
          setCarouselImages(prev => [...prev, data]);
        }
      } catch {
        setCarouselError(`Failed to upload ${file.name}`);
        addToast(`Failed to upload ${file.name}`, "error");
      }
    }

    await fetchCarousel();
    await fetchStats();
    setCarouselUploading(false);
    setCarouselProgress(0);
  };

  // --- FIX 8: CAROUSEL DELETE HANDLER ---
  const handleCarouselDelete = async (publicId) => {
    if (!confirm("Remove this slide?")) return;

    // Optimistic — remove immediately
    setCarouselImages(prev => prev.filter(img => img.public_id !== publicId));

    try {
      const res = await fetch("/api/images/carousel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) {
        await fetchCarousel(); // revert
        setCarouselError("Delete failed. Please try again.");
        addToast("Delete failed", "error");
      } else {
        addToast("Slide removed");
        await fetchStats();
      }
    } catch {
      await fetchCarousel(); // revert
      setCarouselError("Network error.");
      addToast("Network error", "error");
    }
  };

  // --- FIX 9: EVENTS UPLOAD HANDLER ---
  const handleEventUpload = async (files) => {
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files);

    setEventUploading(true);
    setEventError("");
    setEventProgress(0);

    let uploaded = 0;

    for (const file of fileArr) {
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("category", eventCategory);

        const res = await fetch("/api/images/events", { 
          method: "POST", 
          body: form 
        });
        const data = await res.json();

        if (!res.ok) {
          setEventError(data.error || "Upload failed");
          addToast(data.error || "Upload failed", "error");
        } else {
          uploaded++;
          setEventProgress(Math.round((uploaded / fileArr.length) * 100));
          // Optimistic update for current category
          setEventImages(prev => ({
            ...prev,
            [eventCategory]: [...prev[eventCategory], data],
          }));
        }
      } catch {
        setEventError(`Failed to upload ${file.name}`);
        addToast(`Failed to upload ${file.name}`, "error");
      }
    }

    await fetchEvents(eventCategory);
    await fetchStats();
    setEventUploading(false);
    setEventProgress(0);
  };

  // --- FIX 10: EVENTS DELETE HANDLER ---
  const handleEventDelete = async (publicId) => {
    if (!confirm("Delete this event photo?")) return;

    // Optimistic — remove immediately
    setEventImages(prev => ({
      ...prev,
      [eventCategory]: prev[eventCategory].filter(img => img.public_id !== publicId),
    }));

    try {
      const res = await fetch("/api/images/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!res.ok) {
        await fetchEvents(eventCategory); // revert
        setEventError("Delete failed. Please try again.");
        addToast("Delete failed", "error");
      } else {
        addToast("Deleted permanently");
        await fetchStats();
      }
    } catch {
      await fetchEvents(eventCategory); // revert
      setEventError("Network error.");
      addToast("Network error", "error");
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;

    const tab = activeTab === "events" ? "events" : activeTab;
    const apiPath = tab === "carousel" ? "/api/images/carousel" : (tab === "gallery" ? "/api/images/gallery" : "/api/images/events");
    const refreshData = tab === "carousel" ? fetchCarousel : (tab === "gallery" ? fetchGallery : () => fetchEvents(eventCategory));

    const selectedImages = getActiveImages().filter(img => selectedIds.has(img.public_id));

    setConfirmDelete({
      isOpen: true,
      image: null,
      images: selectedImages,
      count: selectedIds.size,
      loading: false,
      onConfirm: async () => {
        setConfirmDelete(prev => ({ ...prev, loading: true }));
        try {
          let successCount = 0;
          for (const publicId of selectedIds) {
            const res = await fetch(apiPath, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ public_id: publicId }),
            });
            if (res.ok) successCount++;
          }
          addToast(`Deleted ${successCount} images`);
          await refreshData();
          await fetchStats();
          setSelectedIds(new Set());
          setSelectMode(false);
        } catch {
          addToast("Bulk delete failed", "error");
        } finally {
          setConfirmDelete({ isOpen: false, image: null, count: 1, onConfirm: null, loading: false });
        }
      }
    });
  };

  const toggleSelection = (publicId) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(publicId)) next.delete(publicId);
      else next.add(publicId);
      return next;
    });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  // --- SUB-COMPONENTS ---

  const SkeletonCard = () => (
    <div className="aspect-square rounded-xl bg-[#E8E0D4]/40 animate-pulse border border-[#E8E0D4]/50" />
  );

  const StatCard = ({ label, value, sub, active = false }) => (
    <div className={`bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#E8E0D4] relative overflow-hidden group
                    ${active ? "border-b-2 border-b-[#C9A84C]" : ""}`}>
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#7A6A5A] font-body">
        {label}
      </p>
      <p className="mt-3 text-4xl text-[#1C1009] font-heading font-normal">
        {value}
      </p>
      {sub && (
        <p className="mt-2 text-xs text-[#7A6A5A] font-body opacity-80">
          {sub}
        </p>
      )}
    </div>
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

  const imagesCount = () => {
    if (activeTab === "gallery") return galleryImages.length;
    if (activeTab === "carousel") return carouselImages.length;
    if (activeTab === "events") return eventImages[eventCategory]?.length || 0;
    return 0;
  };

  const getActiveImages = () => {
    if (activeTab === "gallery") return galleryImages;
    if (activeTab === "carousel") return carouselImages;
    if (activeTab === "events") return eventImages[eventCategory] || [];
    return [];
  };

  // --- TAB RENDERS ---

  const DashboardTab = () => {
    if (statsLoading) {
      return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-[#E8E0D4]/30 rounded-xl animate-pulse" />
          ))}
        </div>
      );
    }

    const totalImg = stats?.totalImages ?? 0;
    const galleryCount = stats?.gallery?.count ?? 0;
    const carouselCount = stats?.carousel?.count ?? 0;
    const eventsCount = stats?.events?.total ?? 0;
    const storage = stats?.totalBytes ? (stats.totalBytes / (1024 * 1024)).toFixed(1) : 0;

    return (
      <div className="space-y-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Media" value={totalImg} sub={`Storage: ${storage} MB`} />
          <StatCard label="Gallery" value={galleryCount} sub="Venue showcase" />
          <StatCard label="Carousel" value={`${carouselCount}/8`} sub="Hero slides" active={true} />
          <StatCard label="Events" value={eventsCount} sub="Client memories" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E8E0D4] bg-[#F7F4EF]/30">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#7A6A5A]">Category Distribution</h3>
          </div>
          <div className="p-8 grid md:grid-cols-3 gap-8 items-center">
            <div className="space-y-4">
              {[
                { label: "Weddings", count: stats?.events?.weddings ?? 0, color: "bg-[#C9A84C]" },
                { label: "Corporate", count: stats?.events?.corporate ?? 0, color: "bg-[#7A6A5A]" },
                { label: "Private Parties", count: stats?.events?.["private-parties"] ?? 0, color: "bg-[#E8E0D4]" }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1.5 font-body">
                    <span className="text-[#1C1009]">{item.label}</span>
                    <span className="text-[#C9A84C] font-bold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-[#F7F4EF] rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color}`} 
                      style={{ width: `${eventsCount > 0 ? (item.count / eventsCount) * 100 : 0}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-2 flex items-center justify-center p-4">
               <div className="text-center">
                 <IconPackage size={48} className="mx-auto text-[#E8E0D4] mb-2" />
                 <p className="text-xs text-[#7A6A5A] font-body">Detailed reporting and re-ordering for these categories are coming soon in v2.0</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ManagementPage = ({ tab }) => {
    const images = getActiveImages();
    const loading = tab === "gallery" ? galleryLoading : (tab === "carousel" ? carouselLoading : eventLoading);
    const uploading = tab === "carousel" ? carouselUploading : (tab === "gallery" ? galleryUploading : eventUploading);
    
    return (
      <div className="space-y-8">
        <PageHeader 
          title={tab === "gallery" ? "Venue Gallery" : (tab === "carousel" ? "Homepage Carousel" : "Events Media")}
          countLabel={tab === "carousel" ? `${carouselImages.length}/8 slides` : `${images.length} images`}
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

        {tab === "events" && (
          <div className="flex gap-4 p-1 bg-[#E8E0D4]/30 rounded-lg w-fit mb-8 border border-[#E8E0D4]/50">
            {["weddings", "corporate", "private-parties"].map((id) => (
              <button
                key={id}
                onClick={() => { if (!uploading) { setEventCategory(id); fetchEvents(id); } }}
                className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-all
                           ${eventCategory === id ? "bg-white text-[#C9A84C] shadow-sm" : "text-[#7A6A5A] hover:bg-white/50"}`}
              >
                {id.replace("-", " ")}
              </button>
            ))}
          </div>
        )}

        {/* Dropzone area */}
        <div 
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { 
            e.preventDefault(); 
            e.currentTarget.classList.add("border-[#C9A84C]", "bg-[#C9A84C]/[0.1]"); 
            e.currentTarget.style.borderStyle = "solid";
          }}
          onDragLeave={(e) => { 
            e.preventDefault(); 
            e.currentTarget.classList.remove("border-[#C9A84C]", "bg-[#C9A84C]/[0.1]");
            e.currentTarget.style.borderStyle = "dashed";
          }}
          onDrop={(e) => { 
            e.preventDefault(); 
            e.currentTarget.classList.remove("border-[#C9A84C]", "bg-[#C9A84C]/[0.1]");
            e.currentTarget.style.borderStyle = "dashed";
            const handler = tab === "carousel" ? handleCarouselUpload : (tab === "gallery" ? handleGalleryUpload : handleEventUpload);
            handler(e.dataTransfer.files); 
          }}
          className="border-2 border-dashed border-[#C9A84C]/30 rounded-2xl bg-[#C9A84C]/[0.03] hover:bg-[#C9A84C]/[0.06] transition-all cursor-pointer p-12 text-center group"
        >
          <input 
            type="file" 
            multiple 
            hidden 
            ref={fileInputRef} 
            onChange={(e) => {
              const handler = tab === "carousel" ? handleCarouselUpload : (tab === "gallery" ? handleGalleryUpload : handleEventUpload);
              handler(e.target.files);
              e.target.value = "";
            }} 
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

        {/* Info banners */}
        {tab === "carousel" && carouselImages.length >= 8 && (
          <div className="bg-[#FAF0F0] border border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-800">
             <IconAlertCircle size={20} />
             <p className="text-sm font-body">Slide limit reached. Please remove an existing slide to upload new content.</p>
          </div>
        )}

        {/* Image Grid */}
        {/* FIX 12: PROGRESS BARS */}
        {tab === "gallery" && <UploadProgressBar progress={galleryProgress} uploading={galleryUploading} />}
        {tab === "carousel" && <UploadProgressBar progress={carouselProgress} uploading={carouselUploading} />}
        {tab === "events" && <UploadProgressBar progress={eventProgress} uploading={eventUploading} />}

        {/* FIX 11: UPDATE ALL IMAGE GRIDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          ) : images.length === 0 ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center text-center opacity-40">
              <span className="text-6xl mb-4">📷</span>
              <h3 className="text-lg font-heading text-[#1C1009] mb-1">No images yet</h3>
              <p className="text-sm font-body">Upload your first image above to get started</p>
            </div>
          ) : tab === "carousel" ? (
             images.map((img, i) => (
                <ImageCard
                  key={img.public_id}
                  img={img}
                  index={i}
                  onDelete={handleCarouselDelete}
                  label={`Slide ${i + 1}`}
                  isVideo={true}
                />
              ))
          ) : (
            images.map((img, i) => (
              <ImageCard
                key={img.public_id}
                img={img}
                index={i}
                onDelete={tab === "gallery" ? handleGalleryDelete : handleEventDelete}
              />
            ))
          )}
        </div>

        {tab === "carousel" && images.length > 0 && (
          <p className="text-xs italic text-[#7A6A5A] font-body pt-4 border-t border-[#E8E0D4]">
            * Homepage slides are displayed in the order they were uploaded.
          </p>
        )}
      </div>
    );
  };

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
              {item.id === "carousel" && carouselImages.length > 0 && (
                <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded-sm
                                 ${activeTab === item.id ? "bg-[#0F0A07]/10 text-[#0F0A07]" : "bg-white/5 text-white/30"}`}>
                  {carouselImages.length}/8
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
        <h1 className="text-white font-heading text-lg">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#C9A84C]">
          {isSidebarOpen ? <IconX /> : <IconMenu2 />}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 xl:ml-[220px] min-h-screen pt-16 xl:pt-0">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {activeTab === "dashboard" && <DashboardTab />}
          {(activeTab === "gallery" || activeTab === "carousel" || activeTab === "events") && (
            <ManagementPage tab={activeTab} />
          )}
        </div>
      </main>

      {/* BULK ACTION BAR */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 xl:left-[220px] right-0 bg-[#0F0A07] border-t border-[#C9A84C]/30 px-8 py-5 z-40 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-4">
              <span className="text-[#C9A84C] font-semibold">
                {selectedIds.size} images selected
              </span>
              <div className="w-px h-6 bg-white/10 hidden sm:block" />
              <button 
                onClick={() => { setSelectedIds(new Set()); setSelectMode(false); }}
                className="text-white/40 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            <button
               onClick={handleBulkDelete}
               className="bg-[#DC2626] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <IconTrash size={18} />
              Delete Permanently
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERRAYS */}
      <Lightbox 
        {...lightbox} 
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))} 
        onPrev={() => setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }))}
        onNext={() => setLightbox(prev => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }))}
      />

      <ConfirmDeleteModal 
        {...confirmDelete} 
        onClose={() => setConfirmDelete(prev => ({ ...prev, isOpen: false }))} 
      />

      <div className="pointer-events-none fixed inset-0 z-[200]">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast 
              key={toast.id} 
              {...toast} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
