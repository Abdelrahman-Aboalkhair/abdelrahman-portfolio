"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const FullscreenViewer = ({
  isOpen,
  onClose,
  gallery,
  selectedImage,
  setSelectedImage,
}) => {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !gallery) return;

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          setSelectedImage(
            (prev) => (prev > 0 ? prev - 1 : gallery.length - 1) // if the current image is the first image, go to the last image
          );
          break;
        case "ArrowRight":
          setSelectedImage(
            (prev) => (prev < gallery.length - 1 ? prev + 1 : 0) // if the current image is the last image, go to the first image
          );
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gallery, setSelectedImage, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !gallery) return null;

  const navigatePrev = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const navigateNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Buttons */}
      {gallery.length > 1 && (
        <>
          <button
            onClick={navigatePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={navigateNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Fullscreen Image */}
      <div
        className="relative max-w-[95vw] max-h-[95vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={gallery[selectedImage].image}
          fill
          className="object-contain"
          alt={gallery[selectedImage].title}
          priority
        />
      </div>

      {/* Image Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-white p-4 rounded-lg max-w-md text-center">
        <h4 className="font-semibold text-lg mb-1">
          {gallery[selectedImage].title}
        </h4>
        <p className="text-white/80 text-sm mb-2">
          {gallery[selectedImage].description}
        </p>
        <span className="text-white/60 text-xs">
          {selectedImage + 1} of {gallery.length}
        </span>
      </div>

      {/* Keyboard Hints */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white p-3 rounded-lg text-xs">
        <div>ESC: Close</div>
        {gallery.length > 1 && <div>← →: Navigate</div>}
      </div>
    </motion.div>
  );
};

export default FullscreenViewer;
