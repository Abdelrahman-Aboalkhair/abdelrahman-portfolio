"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback, memo } from "react";

const FullscreenViewer = memo(
  ({ isOpen, onClose, gallery, selectedImage, setSelectedImage }) => {
    const [loadedImages, setLoadedImages] = useState(new Set([selectedImage]));
    const [loadingStates, setLoadingStates] = useState({});

    // Reset loaded images when modal opens
    useEffect(() => {
      if (isOpen) {
        setLoadedImages(new Set([selectedImage]));
        setLoadingStates({});
      }
    }, [isOpen, selectedImage]);

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen || !gallery) return;

      const handleKeyDown = useCallback(
        (e) => {
          switch (e.key) {
            case "Escape":
              onClose();
              break;
            case "ArrowLeft":
              setSelectedImage((prev) =>
                prev > 0 ? prev - 1 : gallery.length - 1
              );
              break;
            case "ArrowRight":
              setSelectedImage((prev) =>
                prev < gallery.length - 1 ? prev + 1 : 0
              );
              break;
          }
        },
        [gallery, setSelectedImage, onClose]
      );

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

    const handleImageLoad = useCallback((index) => {
      setLoadedImages((prev) => new Set([...prev, index]));
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }, []);

    const handleImageLoadStart = useCallback((index) => {
      setLoadingStates((prev) => ({ ...prev, [index]: true }));
    }, []);

    const navigatePrev = useCallback(
      (e) => {
        e.stopPropagation();
        const newIndex =
          selectedImage > 0 ? selectedImage - 1 : gallery.length - 1;
        setSelectedImage(newIndex);
        // Pre-load adjacent images
        const adjacentIndices = [newIndex - 1, newIndex + 1].filter(
          (i) => i >= 0 && i < gallery.length
        );
        setLoadedImages((prev) => new Set([...prev, ...adjacentIndices]));
      },
      [selectedImage, gallery.length, setSelectedImage]
    );

    const navigateNext = useCallback(
      (e) => {
        e.stopPropagation();
        const newIndex =
          selectedImage < gallery.length - 1 ? selectedImage + 1 : 0;
        setSelectedImage(newIndex);
        // Pre-load adjacent images
        const adjacentIndices = [newIndex - 1, newIndex + 1].filter(
          (i) => i >= 0 && i < gallery.length
        );
        setLoadedImages((prev) => new Set([...prev, ...adjacentIndices]));
      },
      [selectedImage, gallery.length, setSelectedImage]
    );

    if (!isOpen || !gallery) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Navigation Buttons */}
          {gallery.length > 1 && (
            <>
              <motion.button
                onClick={navigatePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={navigateNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {/* Fullscreen Image */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {loadingStates[selectedImage] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-[#7300FF] animate-spin mx-auto mb-4" />
                  <p className="text-white/80 text-sm">Loading image...</p>
                </div>
              </div>
            )}

            <Image
              src={gallery[selectedImage].image}
              fill
              className={`object-contain transition-opacity duration-300 ${
                loadedImages.has(selectedImage) ? "opacity-100" : "opacity-0"
              }`}
              alt={gallery[selectedImage].title}
              priority
              onLoad={() => handleImageLoad(selectedImage)}
              onLoadStart={() => handleImageLoadStart(selectedImage)}
              sizes="95vw"
            />
          </div>

          {/* Image Info */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-white p-4 rounded-lg max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-1">
              {gallery[selectedImage].title}
            </h4>
            <p className="text-white/80 text-sm mb-2">
              {gallery[selectedImage].description}
            </p>
            <span className="text-white/60 text-xs">
              {selectedImage + 1} of {gallery.length}
            </span>
          </motion.div>

          {/* Keyboard Hints */}
          <motion.div
            className="absolute top-4 left-4 bg-black/80 backdrop-blur text-white p-3 rounded-lg text-xs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div>ESC: Close</div>
            {gallery.length > 1 && <div>← →: Navigate</div>}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
);

FullscreenViewer.displayName = "FullscreenViewer";

export default FullscreenViewer;
