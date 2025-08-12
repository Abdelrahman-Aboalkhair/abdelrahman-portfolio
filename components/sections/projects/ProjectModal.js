"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  Calendar,
  Code,
  Lightbulb,
} from "lucide-react";

const ProjectModal = ({ project, isOpen, onClose }) => {
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

  // Parse tech stack into array
  const techStack = project.tech.split(" - ");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
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

              {/* Project Image */}
              <div className="mb-8 h-64 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-white/60 text-3xl font-handwritten">
                  {project.title} Preview
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Description */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-[#7300FF]" />
                      <h3 className="text-xl font-semibold text-white">
                        About This Project
                      </h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {project.desc.replace(" Learn more >", "")}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-[#7300FF]" />
                      <h3 className="text-xl font-semibold text-white">
                        Key Features
                      </h3>
                    </div>
                    <ul className="text-white/80 space-y-2">
                      {project.title === "E-Commerce" ? (
                        <>
                          <li>• Real-time chat functionality</li>
                          <li>• Advanced analytics dashboard</li>
                          <li>• Inventory management system</li>
                          <li>• Secure payment processing</li>
                          <li>• Responsive design</li>
                        </>
                      ) : (
                        <>
                          <li>• Real-time messaging with Socket.io</li>
                          <li>• Multiple chat rooms</li>
                          <li>• User authentication system</li>
                          <li>• Message history persistence</li>
                          <li>• Modern responsive UI</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-[#7300FF]" />
                      <h3 className="text-xl font-semibold text-white">
                        Project Timeline
                      </h3>
                    </div>
                    <p className="text-white/80">
                      Development Period:{" "}
                      {project.title === "E-Commerce" ? "6 months" : "3 months"}
                    </p>
                    <p className="text-white/80">Status: Completed</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Technical Highlights
                    </h3>
                    <ul className="text-white/80 space-y-2">
                      {project.title === "E-Commerce" ? (
                        <>
                          <li>• TypeScript for type safety</li>
                          <li>• Prisma ORM with PostgreSQL</li>
                          <li>• Server-side rendering with Next.js</li>
                          <li>• RESTful API design</li>
                        </>
                      ) : (
                        <>
                          <li>• Real-time bi-directional communication</li>
                          <li>• MongoDB for flexible data storage</li>
                          <li>• JWT authentication</li>
                          <li>• Component-based architecture</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7300FF] hover:bg-[#5a00cc] text-white rounded-lg transition-colors">
                      <Github className="w-5 h-5" />
                      View Code
                    </button>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
