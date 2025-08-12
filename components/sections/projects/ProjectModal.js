"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProjectGallery from "./ProjectGallery";
import FullscreenViewer from "./FullscreenViewer";
import ProjectVideo from "./ProjectVideo";
import ProjectDetails from "./ProjectDetails";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImage(0);
  }, [project]);

  // Prevent body scroll when modal is open
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

  if (!project) return null;

  const modalVariants = {
    hidden: { y: 100 },
    visible: {
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      y: 100,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={project.id + "modal"}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Header */}
              <h2 className="text-2xl font-bold text-white mb-6">
                {project.title}
              </h2>

              {/* Project Image Gallery */}
              {project.gallery && project.gallery.length > 0 ? (
                <ProjectGallery
                  gallery={project.gallery}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  onFullscreenOpen={() => setIsFullscreen(true)}
                />
              ) : (
                /* Fallback Single Image */
                <div className="mb-8 flex items-center justify-center">
                  <Image
                    src={project.image}
                    width={500}
                    height={200}
                    alt={`${project.title} project preview`}
                  />
                </div>
              )}

              {/* Demo Video Section */}
              <ProjectVideo videoUrl={project.videoUrl} title={project.title} />

              {/* Project Details */}
              <ProjectDetails project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen Image Viewer */}
      <FullscreenViewer
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        gallery={project.gallery}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </AnimatePresence>
  );
};

export default ProjectModal;
