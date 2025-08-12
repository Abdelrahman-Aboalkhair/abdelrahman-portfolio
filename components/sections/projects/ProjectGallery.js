"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";

const ProjectGallery = ({
  gallery,
  selectedImage,
  setSelectedImage,
  onFullscreenOpen,
}) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Main Image Display */}
      <div className="mb-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 overflow-hidden group">
        <div className="relative aspect-video">
          <Image
            src={gallery[selectedImage].image}
            fill
            className="object-cover cursor-pointer transition-transform group-hover:scale-105"
            alt={gallery[selectedImage].title}
            onClick={onFullscreenOpen}
          />
          {/* Fullscreen Button */}
          <button
            onClick={onFullscreenOpen}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="View fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
        {/* Image Info Overlay */}
        <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h4 className="text-white font-semibold text-lg">
            {gallery[selectedImage].title}
          </h4>
          <p className="text-white/80 text-sm">
            {gallery[selectedImage].description}
          </p>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {gallery.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-[#7300FF] ring-2 ring-[#7300FF]/30"
                : "border-white/20 hover:border-white/40"
            }`}
          >
            <Image
              src={item.image}
              fill
              className="object-cover"
              alt={item.title}
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-[#7300FF]/20" />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Info */}
      <div className="text-center mt-2">
        <span className="text-white/60 text-sm">
          {selectedImage + 1} of {gallery.length}
        </span>
      </div>
    </div>
  );
};

export default ProjectGallery;
