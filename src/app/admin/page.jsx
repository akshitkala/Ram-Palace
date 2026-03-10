"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "▤" },
  { id: "gallery", label: "Gallery", icon: "⊞" },
  { id: "carousel", label: "Carousel", icon: "◫" },
  { id: "events", label: "Events", icon: "◈" },
];

export default function AdminPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryError, setGalleryError] = useState("");

  const [carouselImages, setCarouselImages] = useState([]);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [carouselUploading, setCarouselUploading] = useState(false);
  const [carouselError, setCarouselError] = useState("");

  const [eventCategory, setEventCategory] = useState("weddings");
  const [eventImages, setEventImages] = useState({
    weddings: [],
    corporate: [],
    "private-parties": [],
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventUploading, setEventUploading] = useState(false);
  const [eventError, setEventError] = useState("");

  useEffect(() => {
    fetchStats();
    fetchGallery();
    fetchCarousel();
    fetchEvents("weddings");
    fetchEvents("corporate");
    fetchEvents("private-parties");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch {
      // silently fail, UI will just not show stats
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
      setGalleryError("Failed to load gallery");
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
      setCarouselError("Failed to load carousel");
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
      setEventError("Failed to load event images");
    } finally {
      setEventLoading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setGalleryUploading(true);
    setGalleryError("");
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/images/gallery", {
          method: "POST",
          body: form,
        });
        if (!res.ok) {
          throw new Error("Upload failed");
        }
      }
      await fetchGallery();
      await fetchStats();
    } catch (err) {
      setGalleryError(err.message || "Failed to upload");
    } finally {
      setGalleryUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryDelete = async (publicId) => {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await fetch("/api/images/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });
      setGalleryImages((prev) =>
        prev.filter((img) => img.public_id !== publicId)
      );
      await fetchStats();
    } catch {
      setGalleryError("Failed to delete image");
    }
  };

  const handleCarouselUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (carouselImages.length >= 8) {
      setCarouselError("Carousel full (8/8)");
      return;
    }

    setCarouselUploading(true);
    setCarouselError("");
    try {
      let currentCount = carouselImages.length;
      for (const file of files) {
        if (currentCount >= 8) break;
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/images/carousel", {
          method: "POST",
          body: form,
        });
        if (!res.ok) {
          const d = await res.json().catch(() => null);
          throw new Error(d?.error || "Upload failed");
        }
        currentCount += 1;
      }
      await fetchCarousel();
      await fetchStats();
    } catch (err) {
      setCarouselError(err.message || "Failed to upload");
    } finally {
      setCarouselUploading(false);
      e.target.value = "";
    }
  };

  const handleCarouselDelete = async (publicId) => {
    if (!window.confirm("Remove this slide?")) return;
    try {
      await fetch("/api/images/carousel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });
      setCarouselImages((prev) =>
        prev.filter((img) => img.public_id !== publicId)
      );
      await fetchStats();
    } catch {
      setCarouselError("Failed to delete slide");
    }
  };

  const handleEventUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setEventUploading(true);
    setEventError("");
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        form.append("category", eventCategory);
        const res = await fetch("/api/images/events", {
          method: "POST",
          body: form,
        });
        if (!res.ok) {
          throw new Error("Upload failed");
        }
      }
      await fetchEvents(eventCategory);
      await fetchStats();
    } catch (err) {
      setEventError(err.message || "Failed to upload");
    } finally {
      setEventUploading(false);
      e.target.value = "";
    }
  };

  const handleEventDelete = async (publicId) => {
    if (!window.confirm("Delete this event photo?")) return;
    try {
      await fetch("/api/images/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });
      setEventImages((prev) => ({
        ...prev,
        [eventCategory]: prev[eventCategory].filter(
          (img) => img.public_id !== publicId
        ),
      }));
      await fetchStats();
    } catch {
      setEventError("Failed to delete image");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const formatBytesToLabel = (bytes) => {
    if (!bytes || Number.isNaN(bytes)) return "";
    const mb = bytes / 1024 / 1024;
    if (mb >= 1) return `${mb.toFixed(1)} MB`;
    const kb = bytes / 1024;
    return `${kb.toFixed(0)} KB`;
  };

  const formatImageSize = (img) => {
    const bytes = img?.bytes ?? img?.size;
    return formatBytesToLabel(bytes);
  };

  const currentEventImages = eventImages[eventCategory] || [];
  const carouselCount = carouselImages.length;
  const carouselCapacity = 8;
  const carouselProgress = Math.min(
    100,
    (carouselCount / carouselCapacity) * 100
  );

  const DashboardTab = () => {
    if (statsLoading) {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-[#E8E0D0] animate-pulse border border-[#E8E0D0]"
              />
            ))}
          </div>
        </div>
      );
    }

    const totalImages = stats?.totalImages ?? 0;
    const galleryCount = stats?.gallery?.count ?? 0;
    const carouselStatCount = stats?.carousel?.count ?? 0;
    const eventsTotal = stats?.events?.total ?? 0;
    const weddingsCount = stats?.events?.weddings ?? 0;
    const corporateCount = stats?.events?.corporate ?? 0;
    const partiesCount = stats?.events?.["private-parties"] ?? 0;
    const storageLabel = formatBytesToLabel(stats?.totalBytes ?? 0);
    const carouselStatProgress = Math.min(
      100,
      (carouselStatCount / carouselCapacity) * 100
    );

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E8E0D0] p-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#A99686] font-body">
              Total Images
            </p>
            <p className="mt-3 text-4xl text-[#1C1C1E] font-heading">
              {totalImages}
            </p>
            <p className="mt-2 text-[13px] text-[#6B5E4E] font-body">
              Across all sections
            </p>
          </div>

          <div className="bg-white border border-[#E8E0D0] p-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#A99686] font-body">
              Gallery Photos
            </p>
            <p className="mt-3 text-4xl text-[#1C1C1E] font-heading">
              {galleryCount}
            </p>
            <p className="mt-2 text-[13px] text-[#6B5E4E] font-body">
              Venue gallery
            </p>
          </div>

          <div className="bg-white border border-[#E8E0D0] p-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#A99686] font-body">
              Carousel Slides
            </p>
            <p className="mt-3 text-4xl text-[#1C1C1E] font-heading">
              {carouselStatCount}/8
            </p>
            <div className="mt-3 h-[2px] bg-[#C9A84C]" style={{ width: `${carouselStatProgress}%` }} />
            <p className="mt-2 text-[13px] text-[#6B5E4E] font-body">
              Homepage carousel
            </p>
          </div>

          <div className="bg-white border border-[#E8E0D0] p-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#A99686] font-body">
              Event Photos
            </p>
            <p className="mt-3 text-4xl text-[#1C1C1E] font-heading">
              {eventsTotal}
            </p>
            <p className="mt-2 text-[13px] text-[#6B5E4E] font-body">
              Weddings · Corporate · Parties
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E8E0D0]">
          <div className="border-b border-[#E8E0D0] px-6 py-3">
            <p className="text-[12px] tracking-[0.18em] uppercase text-[#A99686] font-body">
              Event Category Breakdown
            </p>
          </div>
          <div className="divide-y divide-[#E8E0D0] font-body">
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-sm text-[#1C1C1E]">Weddings</span>
              <span className="text-sm text-[#C9A84C]">{weddingsCount}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-sm text-[#1C1C1E]">Corporate</span>
              <span className="text-sm text-[#C9A84C]">{corporateCount}</span>
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-sm text-[#1C1C1E]">Private Parties</span>
              <span className="text-sm text-[#C9A84C]">{partiesCount}</span>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#A99686] font-body">
          Storage Used: {storageLabel}
        </p>
      </div>
    );
  };

  const GalleryTab = () => (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl text-[#1C1C1E]">
            Gallery Photos
          </h3>
          <p className="mt-1 text-[13px] text-[#A99686] font-body">
            {galleryImages.length} images
          </p>
        </div>

        <div className="font-body">
          <input
            id="gallery-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("gallery-upload-input")?.click()
            }
            className="px-4 py-2 bg-[#1C1C1E] text-white text-[11px] tracking-[0.22em] uppercase font-body transition-colors duration-200 hover:bg-[#C9A84C] hover:text-[#1C1C1E]"
          >
            Upload Photos
          </button>
        </div>
      </div>

      {galleryError && (
        <div className="flex items-center justify-between px-4 py-3 border border-red-200 bg-red-50 font-body text-[13px] text-red-600">
          <span>{galleryError}</span>
          <button
            type="button"
            onClick={() => setGalleryError("")}
            className="ml-4 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {galleryUploading && (
        <div className="space-y-2 font-body">
          <div className="h-1 bg-[#C9A84C]/20">
            <div className="h-full w-1/3 bg-[#C9A84C] animate-pulse" />
          </div>
          <p className="text-[13px] text-[#A99686]">Uploading...</p>
        </div>
      )}

      {galleryLoading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-[#E8E0D0] animate-pulse" />
          ))}
        </div>
      ) : galleryImages.length === 0 ? (
        <div className="border border-dashed border-[#E8E0D0] bg-white px-8 py-10 text-center font-body">
          <p className="text-sm text-[#6B5E4E]">No gallery photos yet</p>
          <p className="mt-1 text-[13px] text-[#A99686]">
            Upload images to populate the gallery
          </p>
          <button
            type="button"
            onClick={() =>
              document.getElementById("gallery-upload-input")?.click()
            }
            className="mt-4 px-4 py-2 bg-[#1C1C1E] text-white text-[11px] tracking-[0.22em] uppercase font-body transition-colors duration-200 hover:bg-[#C9A84C] hover:text-[#1C1C1E]"
          >
            Upload Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {galleryImages.map((img) => (
            <div
              key={img.public_id}
              className="relative aspect-square bg-[#F2EDE4] overflow-hidden group"
            >
              <img
                src={img.secure_url}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleGalleryDelete(img.public_id)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-3 py-1 bg-red-500 text-white"
              >
                Delete
              </button>
              {formatImageSize(img) && (
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/40 text-white text-[10px] font-body group-hover:opacity-0">
                  {formatImageSize(img)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const CarouselTab = () => (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl text-[#1C1C1E]">
            Carousel Slides
          </h3>
          <p className="mt-1 text-[13px] text-[#A99686] font-body">
            Shown on the homepage hero
          </p>
        </div>

        <div className="font-body text-right">
          <div className="text-sm">
            <span className="text-[#C9A84C] text-lg">
              {carouselCount}
            </span>
            <span className="text-[#A99686] text-sm"> / 8</span>
          </div>
          <p className="text-[11px] text-[#A99686] mt-0.5">Slides</p>
          <div className="mt-2 h-[2px] bg-[#C9A84C]" style={{ width: `${carouselProgress}%` }} />
        </div>
      </div>

      {carouselError && (
        <div className="flex items-center justify-between px-4 py-3 border border-red-200 bg-red-50 font-body text-[13px] text-red-600">
          <span>{carouselError}</span>
          <button
            type="button"
            onClick={() => setCarouselError("")}
            className="ml-4 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {carouselCount >= carouselCapacity ? (
        <div className="px-4 py-3 border border-amber-200 bg-amber-50 font-body text-[13px] text-[#6B5E4E]">
          Carousel is full (8/8). Delete a slide to add new.
        </div>
      ) : (
        <div className="font-body">
          <input
            id="carousel-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleCarouselUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={carouselUploading}
            onClick={() =>
              document.getElementById("carousel-upload-input")?.click()
            }
            className="w-full border border-dashed border-[#E8E0D0] bg-[#FAF7F2] px-8 py-10 text-center transition-colors duration-200 hover:border-[#C9A84C] hover:bg-white"
          >
            <div className="text-2xl mb-2">◫</div>
            <p className="text-sm text-[#1C1C1E]">Add Carousel Slides</p>
            <p className="mt-1 text-[13px] text-[#A99686]">
              {carouselCapacity - carouselCount} slots remaining · JPG, PNG, WebP
            </p>
          </button>
        </div>
      )}

      {carouselUploading && (
        <div className="space-y-2 font-body">
          <div className="h-1 bg-[#C9A84C]/20">
            <div className="h-full w-1/3 bg-[#C9A84C] animate-pulse" />
          </div>
          <p className="text-[13px] text-[#A99686]">Uploading...</p>
        </div>
      )}

      {carouselLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video bg-[#E8E0D0] animate-pulse"
            />
          ))}
        </div>
      ) : carouselImages.length === 0 ? (
        <div className="border border-dashed border-[#E8E0D0] bg-white px-8 py-10 text-center font-body">
          <p className="text-sm text-[#6B5E4E]">No slides yet</p>
          <p className="mt-1 text-[13px] text-[#A99686]">
            Upload images to build the homepage carousel
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {carouselImages.map((img, index) => (
              <div
                key={img.public_id}
                className="relative aspect-video bg-[#F2EDE4] overflow-hidden group"
              >
                <div className="absolute top-1 left-1 px-2 py-0.5 bg-[#1C1C1E]/80 text-white text-[10px] font-body">
                  Slide {index + 1}
                </div>
                <img
                  src={img.secure_url}
                  alt=""
                  className={`w-full h-full object-cover ${
                    carouselUploading ? "animate-pulse" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleCarouselDelete(img.public_id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-3 py-1 bg-red-500 text-white"
                >
                  Remove Slide
                </button>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[12px] italic text-[#A99686] font-body">
            Slides display oldest-first. Delete and re-upload to reorder.
          </p>
        </>
      )}
    </div>
  );

  const EventsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 font-body">
        {[
          { id: "weddings", label: "Weddings" },
          { id: "corporate", label: "Corporate" },
          { id: "private-parties", label: "Private Parties" },
        ].map((cat) => {
          const isActive = eventCategory === cat.id;
          const count = eventImages[cat.id]?.length ?? 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setEventCategory(cat.id);
                fetchEvents(cat.id);
              }}
              className={`px-4 py-2 text-sm border ${
                isActive
                  ? "bg-[#1C1C1E] text-white border-[#1C1C1E]"
                  : "bg-white text-[#6B5E4E] border-[#E8E0D0] hover:border-[#C9A84C]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-2 text-[12px] text-[#A99686]">
                {count} photos
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl text-[#1C1C1E]">
            {eventCategory === "weddings"
              ? "Weddings Photos"
              : eventCategory === "corporate"
              ? "Corporate Photos"
              : "Private Parties Photos"}
          </h3>
          <p className="mt-1 text-[13px] text-[#A99686] font-body">
            {currentEventImages.length} images
          </p>
        </div>

        <div className="font-body">
          <input
            id="events-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleEventUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() =>
              document.getElementById("events-upload-input")?.click()
            }
            className="px-4 py-2 bg-[#1C1C1E] text-white text-[11px] tracking-[0.22em] uppercase font-body transition-colors duration-200 hover:bg-[#C9A84C] hover:text-[#1C1C1E]"
          >
            Upload to{" "}
            {eventCategory === "weddings"
              ? "Weddings"
              : eventCategory === "corporate"
              ? "Corporate"
              : "Private Parties"}
          </button>
        </div>
      </div>

      {eventError && (
        <div className="flex items-center justify-between px-4 py-3 border border-red-200 bg-red-50 font-body text-[13px] text-red-600">
          <span>{eventError}</span>
          <button
            type="button"
            onClick={() => setEventError("")}
            className="ml-4 text-xs"
          >
            ×
          </button>
        </div>
      )}

      {eventUploading && (
        <div className="space-y-2 font-body">
          <div className="h-1 bg-[#C9A84C]/20">
            <div className="h-full w-1/3 bg-[#C9A84C] animate-pulse" />
          </div>
          <p className="text-[13px] text-[#A99686]">Uploading...</p>
        </div>
      )}

      {eventLoading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-[#E8E0D0] animate-pulse" />
          ))}
        </div>
      ) : currentEventImages.length === 0 ? (
        <div className="border border-dashed border-[#E8E0D0] bg-white px-8 py-10 text-center font-body">
          <p className="text-sm text-[#6B5E4E]">
            {eventCategory === "weddings"
              ? "No weddings photos yet"
              : eventCategory === "corporate"
              ? "No corporate photos yet"
              : "No private parties photos yet"}
          </p>
          <p className="mt-1 text-[13px] text-[#A99686]">
            Upload images to populate this category
          </p>
          <button
            type="button"
            onClick={() =>
              document.getElementById("events-upload-input")?.click()
            }
            className="mt-4 px-4 py-2 bg-[#1C1C1E] text-white text-[11px] tracking-[0.22em] uppercase font-body transition-colors duration-200 hover:bg-[#C9A84C] hover:text-[#1C1C1E]"
          >
            Upload Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {currentEventImages.map((img) => (
            <div
              key={img.public_id}
              className="relative aspect-square bg-[#F2EDE4] overflow-hidden group"
            >
              <img
                src={img.secure_url}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleEventDelete(img.public_id)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] px-3 py-1 bg-red-500 text-white"
              >
                Delete
              </button>
              {formatImageSize(img) && (
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/40 text-white text-[10px] font-body group-hover:opacity-0">
                  {formatImageSize(img)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1C1C1E]">
      <aside className="w-60 bg-[#1C1C1E] fixed left-0 top-0 h-screen flex flex-col z-50">
        <div className="px-6 py-8 border-b border-white/10">
          <p className="text-[#C9A84C] text-[9px] tracking-[0.28em] uppercase font-body mb-1">
            Admin Panel
          </p>
          <h1 className="font-heading text-white text-xl leading-tight">
            Basti Ram
            <br />
            Palace
          </h1>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 font-body text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 border-l-2 ${
                activeTab === item.id
                  ? "bg-[#C9A84C]/15 text-[#C9A84C] border-[#C9A84C]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5 border-transparent"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
              {item.id === "carousel" && carouselImages.length > 0 && (
                <span className="ml-auto text-xs bg-[#C9A84C]/20 text-[#C9A84C] px-2 py-0.5">
                  {carouselImages.length}/{carouselCapacity}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors text-sm font-body"
          >
            <span>→</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-60 flex-1 min-h-screen">
        <header className="bg-white border-b border-[#E8E0D0] px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h2 className="font-heading text-2xl text-[#1C1C1E] capitalize">
              {activeTab === "dashboard"
                ? "Dashboard"
                : activeTab === "private-parties"
                ? "Private Parties"
                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-xs text-[#A99686] mt-0.5 font-body">
              {activeTab === "dashboard" &&
                "Overview of your media library"}
              {activeTab === "gallery" && "Manage venue gallery photos"}
              {activeTab === "carousel" &&
                "Manage homepage carousel slides"}
              {activeTab === "events" &&
                "Manage event category photos"}
            </p>
          </div>
          <div className="flex items-center gap-2 font-body">
            <span className="w-2 h-2 bg-green-500 animate-pulse" />
            <span className="text-xs text-[#A99686]">Live</span>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "carousel" && <CarouselTab />}
          {activeTab === "events" && <EventsTab />}
        </div>
      </main>
    </div>
  );
}

