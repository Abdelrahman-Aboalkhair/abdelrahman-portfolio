"use client";

import { ExternalLink } from "lucide-react";

const ProjectVideo = ({ videoUrl, title }) => {
  if (!videoUrl) return null;

  // Convert YouTube URL to embed format
  const embedUrl = videoUrl
    .replace("youtu.be/", "youtube.com/embed/")
    .replace("watch?v=", "embed/");

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-[#7300FF]" />
        <h3 className="text-xl font-semibold text-white">Live Demo Video</h3>
      </div>
      <div className="relative aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 overflow-hidden">
        <iframe
          src={embedUrl}
          title={`${title} Demo Video`}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ProjectVideo;
