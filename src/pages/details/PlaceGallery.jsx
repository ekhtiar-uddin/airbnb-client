import { ChevronLeft, ChevronRight, Grip, X } from "lucide-react";
import { useEffect, useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

// Utility: flatten photoCategories for modal navigation
function flattenPhotos(categories) {
  let flat = [];
  let catIndex = 0;
  let globalIndex = 0;
  for (const cat of categories) {
    for (let i = 0; i < cat.photos.length; i++) {
      flat.push({
        url: cat.photos[i],
        catKey: cat.key,
        catLabel: cat.label,
        indexInCat: i,
        globalIndex,
        catIndex,
      });
      globalIndex++;
    }
    catIndex++;
  }
  return flat;
}

// Hook: persist modal state in hash
function useModalHash({ flatPhotos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [singleOpen, setSingleOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // On mount: check hash, restore state
  useEffect(() => {
    if (window.location.hash.startsWith("#photo-tour")) {
      setModalOpen(true);
      setSingleOpen(false);
    }
    if (window.location.hash.startsWith("#modal-photo-")) {
      const idx = parseInt(
        window.location.hash.replace("#modal-photo-", ""),
        10
      );
      if (!isNaN(idx) && idx >= 0 && idx < flatPhotos.length) {
        setActivePhotoIndex(idx);
        setSingleOpen(true);
        setModalOpen(false);
      }
    }
    // eslint-disable-next-line
  }, []);

  // On state change: update hash
  useEffect(() => {
    if (singleOpen) {
      window.location.hash = `modal-photo-${activePhotoIndex}`;
    } else if (modalOpen) {
      window.location.hash = "photo-tour";
    } else {
      window.location.hash = "";
    }
  }, [modalOpen, singleOpen, activePhotoIndex]);

  return {
    modalOpen,
    setModalOpen,
    singleOpen,
    setSingleOpen,
    activePhotoIndex,
    setActivePhotoIndex,
  };
}

// Helper: only render images that load
function SafeImage({ src, alt, className, style, onClick }) {
  const [loaded, setLoaded] = useState(true);
  if (!src || !loaded) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setLoaded(false)}
      onClick={onClick}
      draggable={false}
    />
  );
}

const PlaceGallery = ({ place }) => {
  const categories = place.photoCategories;
  const flatPhotos = flattenPhotos(categories);

  // --- Modal state with URL persistence ---
  const {
    modalOpen,
    setModalOpen,
    singleOpen,
    setSingleOpen,
    activePhotoIndex,
    setActivePhotoIndex,
  } = useModalHash({ flatPhotos });

  const [scrollTargetKey, setScrollTargetKey] = useState(null);

  // Prepare initial grid images: 1 large, 4 small
  const galleryImages = flatPhotos.slice(0, 5);

  function handleGalleryOpen() {
    setModalOpen(true);
    setSingleOpen(false);
    setScrollTargetKey(null);
  }
  function handleGalleryImageClick() {
    handleGalleryOpen();
  }

  useEffect(() => {
    if (modalOpen && scrollTargetKey) {
      setTimeout(() => {
        const el = document.getElementById(`photo-cat-${scrollTargetKey}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setScrollTargetKey(null);
      }, 100);
    }
  }, [modalOpen, scrollTargetKey]);

  useEffect(() => {
    if (modalOpen || singleOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [modalOpen, singleOpen]);

  function handleModalImageClick(globalIndex) {
    setActivePhotoIndex(globalIndex);
    setSingleOpen(true);
    setModalOpen(false);
  }
  function handleSingleClose() {
    setSingleOpen(false);
    setModalOpen(true);
  }
  function handleSingleNext() {
    setActivePhotoIndex((i) => (i + 1) % flatPhotos.length);
  }
  function handleSinglePrev() {
    setActivePhotoIndex((i) => (i - 1 + flatPhotos.length) % flatPhotos.length);
  }

  // ----------- RENDER ----------

  // Details page gallery (unchanged)
  if (!modalOpen && !singleOpen) {
    return (
      <div className="relative w-full z-10 ">
        <div className="grid grid-cols-4 grid-rows-2 gap-2  overflow-hidden aspect-[2/1] bg-gray-100 min-h-[400px]">
          {/* Large left */}
          <div
            className="col-span-2 row-span-2 relative group cursor-pointer rounded-tl-[20px] rounded-bl-[20px] overflow-hidden"
            onClick={handleGalleryImageClick}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
            {galleryImages[0]?.url && (
              <SafeImage
                src={galleryImages[0].url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300  aspect-square rounded-tl-[20px] rounded-bl-[20px]"
              />
            )}
          </div>
          {/* 4 right images */}
          {galleryImages.slice(1, 5).map((img, idx) => (
            <div
              className={`col-span-1 row-span-1 relative group cursor-pointer overflow-hidden ${
                idx === 1 ? "rounded-tr-[20px]" : ""
              } ${idx === 3 ? "rounded-br-[20px]" : ""}`}
              key={idx}
              onClick={handleGalleryImageClick}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10"></div>
              {img?.url && (
                <SafeImage
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleGalleryOpen}
          className="absolute bottom-4 right-4 z-10 flex items-center px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition text-base font-medium"
        >
          <Grip />
          Show all photos
        </button>
      </div>
    );
  }

  // PHOTO TOUR MODAL (Airbnb style, two-column grid)
  if (modalOpen) {
    return (
      <div
        className="fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col items-center"
        style={{ padding: "32px 0" }}
      >
        {/* Modal Header + Photo Tour Nav */}
        <div className="w-full flex justify-between items-center px-10">
          <button
            className="text-3xl p-0 m-0 bg-none border-none cursor-pointer"
            style={{ color: "#222", background: "none" }}
            onClick={() => setModalOpen(false)}
            aria-label="Close"
          >
            <ChevronLeft />
          </button>
          <div className="flex gap-6 items-center">
            <span className="text-gray-900">Share</span>
            <span className="text-gray-900">Save</span>
          </div>
        </div>
        {/* Photo Tour Nav */}
        <div className=" customDetailsWidth  mx-auto  mt-4">
          <div className="text-2xl font-medium mb-3">Photo tour</div>
          <div className="flex gap-4">
            {categories.map((cat) => (
              <AnchorLink
                key={cat.key}
                href={`#photo-cat-${cat.key}`}
                offset="80"
                className="flex flex-col items-center cursor-pointer group"
                style={{ minWidth: 130 }}
                onClick={() => setScrollTargetKey(cat.key)}
              >
                <div className="w-[146px] h-[96px]  overflow-hidden border border-gray-200 shadow-sm group-hover:border-black transition">
                  <SafeImage
                    src={cat.photos[0]}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-black text-sm mt-1">{cat.label}</span>
              </AnchorLink>
            ))}
          </div>
        </div>
        {/* Photos by category - two column layout */}
        <div className=" customDetailsWidth mx-auto px-10 pb-12 pt-6">
          {categories.map((cat) => (
            <div
              key={cat.key}
              id={`photo-cat-${cat.key}`}
              className="mb-16 flex"
            >
              {/* Left: Category label */}
              <div style={{ width: 250 }}>
                <div className="font-semibold text-xl text-black mb-2">
                  {cat.label}
                </div>
                {cat.description && (
                  <div className="text-black text-sm mb-2">
                    {cat.description}
                  </div>
                )}
              </div>
              {/* Gallery layout: first image large, rest in two columns */}
              <div className="flex-1">
                {/* First image: full width */}
                {cat.photos[0] && (
                  <div
                    className="mb-4 overflow-hidden cursor-pointer group"
                    style={{
                      boxShadow: "0 2px 8px 0 rgba(60,60,60,0.06)",
                      background: "transparent",
                    }}
                    onClick={() => handleModalImageClick(0)}
                  >
                    <SafeImage
                      src={cat.photos[0]}
                      alt=""
                      className="w-full block object-cover transition-transform duration-300"
                      style={{
                        display: "block",
                        width: "100%",
                        aspectRatio: "4/3",
                        marginBottom: 0,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}

                {/* Remaining images: grid 2 columns */}
                <div className="grid grid-cols-2 gap-4">
                  {cat.photos.slice(1).map((url, i) => {
                    // globalIdx needs to be offset by +1 since you sliced
                    const globalIdx = flatPhotos.findIndex(
                      (p) =>
                        p.url === url &&
                        p.catKey === cat.key &&
                        p.indexInCat === i + 1
                    );
                    return (
                      <div
                        key={i + 1}
                        className="overflow-hidden cursor-pointer group"
                        style={{
                          boxShadow: "0 2px 8px 0 rgba(60,60,60,0.06)",
                          background: "transparent",
                        }}
                        onClick={() => handleModalImageClick(globalIdx)}
                      >
                        <SafeImage
                          src={url}
                          alt=""
                          className="w-full block object-cover transition-transform duration-300"
                          style={{
                            display: "block",
                            width: "100%",
                            aspectRatio: "4/3",
                            marginBottom: 0,
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // SINGLE IMAGE MODAL (3rd layer)
  if (singleOpen) {
    const curPhoto = flatPhotos[activePhotoIndex];
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center">
        {/* Modal Header */}
        <div className="w-full flex items-center justify-between px-10 pt-6 pb-2">
          <button
            className="text-white hover:bg-[#4a4a4a]
             font-semibold flex items-center text-sm gap-1 px-3 py-1.5 cursor-pointer  rounded-md"
            onClick={handleSingleClose}
          >
            <X className="w-[20px]" />
            Close
          </button>
          <span className="text-white text-lg">
            {activePhotoIndex + 1} / {flatPhotos.length}
          </span>
        </div>
        {/* Main Photo */}
        <div className="flex-1 flex items-center justify-center w-full">
          <SafeImage
            src={curPhoto.url}
            alt=""
            className="max-h-[70vh] max-w-[60vw] object-contain  shadow-2xl"
            style={{
              background: "#fff",
            }}
          />
        </div>
        {/* Navigation */}
        <button
          className="cursor-pointer hover:bg-[#4a4a4a] text-white border-2  absolute top-1/2 left-12 -translate-y-1/2  bg-opacity-10 hover:bg-opacity-30 rounded-full p-3"
          onClick={handleSinglePrev}
        >
          <ChevronLeft />
        </button>
        <button
          className="cursor-pointer hover:bg-[#4a4a4a] text-white border-2 absolute top-1/2 right-12 -translate-y-1/2  bg-opacity-10 hover:bg-opacity-30 rounded-full p-3"
          onClick={handleSingleNext}
        >
          <ChevronRight />
        </button>
      </div>
    );
  }
};

export default PlaceGallery;
