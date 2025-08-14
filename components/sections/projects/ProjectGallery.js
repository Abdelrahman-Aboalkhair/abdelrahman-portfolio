"use client";

import Image from "next/image";
import { Maximize2, Loader2 } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";

const ProjectGallery = memo(
  ({ gallery, selectedImage, setSelectedImage, onFullscreenOpen }) => {
    const [loadedImages, setLoadedImages] = useState(new Set([0])); // Pre-load first image
    const [loadingStates, setLoadingStates] = useState({});

    if (!gallery || gallery.length === 0) return null;

    const handleImageLoad = useCallback((index) => {
      setLoadedImages((prev) => new Set([...prev, index]));
      setLoadingStates((prev) => ({ ...prev, [index]: false }));
    }, []);

    const handleImageLoadStart = useCallback((index) => {
      setLoadingStates((prev) => ({ ...prev, [index]: true }));
    }, []);

    const handleThumbnailClick = useCallback(
      (index) => {
        setSelectedImage(index);
        // Pre-load adjacent images
        const adjacentIndices = [index - 1, index + 1].filter(
          (i) => i >= 0 && i < gallery.length
        );
        setLoadedImages((prev) => new Set([...prev, ...adjacentIndices]));
      },
      [gallery.length, setSelectedImage]
    );

    return (
      <div className="mb-8">
        {/* Main Image Display */}
        <div className="mb-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 overflow-hidden group">
          <div className="relative aspect-video">
            {loadingStates[selectedImage] && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                <Loader2 className="w-8 h-8 text-[#7300FF] animate-spin" />
              </div>
            )}

            <Image
              src={gallery[selectedImage].image}
              fill
              className={`object-cover cursor-pointer transition-all duration-300 ${
                loadedImages.has(selectedImage)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              } group-hover:scale-105`}
              alt={gallery[selectedImage].title}
              onClick={onFullscreenOpen}
              priority={selectedImage === 0}
              loading={selectedImage === 0 ? "eager" : "lazy"}
              onLoad={() => handleImageLoad(selectedImage)}
              onLoadStart={() => handleImageLoadStart(selectedImage)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />

            {/* Fullscreen Button */}
            <motion.button
              onClick={onFullscreenOpen}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
              title="View fullscreen"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Image Info Overlay */}
          <motion.div
            className="p-4 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-white font-semibold text-lg">
              {gallery[selectedImage].title}
            </h4>
            <p className="text-white/80 text-sm">
              {gallery[selectedImage].description}
            </p>
          </motion.div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {gallery.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-[#7300FF] ring-2 ring-[#7300FF]/30"
                  : "border-white/20 hover:border-white/40"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loadingStates[index] && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <Loader2 className="w-4 h-4 text-[#7300FF] animate-spin" />
                </div>
              )}

              <Image
                src={item.image}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                alt={item.title}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onLoadStart={() => handleImageLoadStart(index)}
                sizes="80px"
              />

              {selectedImage === index && (
                <motion.div
                  className="absolute inset-0 bg-[#7300FF]/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Navigation Info */}
        <motion.div
          className="text-center mt-2"
          key={selectedImage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white/60 text-sm">
            {selectedImage + 1} of {gallery.length}
          </span>
        </motion.div>
      </div>
    );
  }
);

ProjectGallery.displayName = "ProjectGallery";

export default ProjectGallery;
