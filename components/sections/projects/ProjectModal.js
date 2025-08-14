"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback, memo } from "react";
import ProjectGallery from "./ProjectGallery";
import FullscreenViewer from "./FullscreenViewer";
import ProjectVideo from "./ProjectVideo";
import ProjectDetails from "./ProjectDetails";

const ProjectModal = memo(({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImage(0);
    setIsLoading(true);
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
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

  const handleClose = useCallback(() => {
    setIsFullscreen(false);
    onClose();
  }, [onClose]);

  const handleFullscreenOpen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  if (!project) return null;

  const modalVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
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
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20 rounded-md">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-[#7300FF] animate-spin mx-auto mb-4" />
                  <p className="text-white/80 text-sm">Loading project...</p>
                </div>
              </div>
            )}

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>

            {/* Modal Content */}
            <motion.div className="p-8" variants={contentVariants}>
              {/* Header */}
              <motion.h2
                className="text-2xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.title}
              </motion.h2>

              {/* Project Image Gallery */}
              {project.gallery && project.gallery.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ProjectGallery
                    gallery={project.gallery}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    onFullscreenOpen={handleFullscreenOpen}
                  />
                </motion.div>
              ) : (
                /* Fallback Single Image */
                <motion.div
                  className="mb-8 flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Image
                    src={project.image}
                    width={500}
                    height={200}
                    alt={`${project.title} project preview`}
                    className="rounded-lg"
                    priority
                  />
                </motion.div>
              )}

              {/* Demo Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ProjectVideo
                  videoUrl={project.videoUrl}
                  title={project.title}
                />
              </motion.div>

              {/* Project Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ProjectDetails project={project} />
              </motion.div>
            </motion.div>
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
});

ProjectModal.displayName = "ProjectModal";

export default ProjectModal;
