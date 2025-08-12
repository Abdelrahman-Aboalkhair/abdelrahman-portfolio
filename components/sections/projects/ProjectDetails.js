"use client";

import { Lightbulb, Code, Calendar, Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectDetails = ({ project }) => {
  const { t } = useTranslation();
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Project Description */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[#7300FF]" />
            <h3 className="text-xl font-semibold text-white">
              {t("projects.aboutProject")}
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
              {t("projects.keyFeatures")}
            </h3>
          </div>
          <ul className="text-white/80 space-y-2 max-h-48 overflow-y-auto">
            {project.features ? (
              project.features.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))
            ) : (
              <>
                <li>• Real-time messaging capabilities</li>
                <li>• Modern responsive design</li>
                <li>• User authentication system</li>
                <li>• Database integration</li>
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
              {t("projects.timeline")}
            </h3>
          </div>
          <p className="text-white/80">
            {t("projects.developmentPeriod")}:{" "}
            {project.timeline || t("projects.defaultTimeline")}
          </p>
          <p className="text-white/80">
            {t("projects.status")}: {project.status || t("projects.completed")}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            {t("projects.technicalHighlights")}
          </h3>
          <ul className="text-white/80 space-y-2 max-h-48 overflow-y-auto">
            {project.techHighlights ? (
              project.techHighlights.map((highlight, index) => (
                <li key={index}>• {highlight}</li>
              ))
            ) : (
              <>
                <li>• Modern web technologies</li>
                <li>• Responsive design principles</li>
                <li>• Best practices implementation</li>
                <li>• Performance optimization</li>
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7300FF] hover:bg-[#5a00cc] text-white rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              {t("projects.viewCode")}
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              {t("projects.liveDemo")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
