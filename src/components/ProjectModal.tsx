import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu, Award } from 'lucide-react';
import { Project, Language, Theme } from '../types';
import { translations } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  language: Language;
  theme: Theme;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  language,
  theme,
}) => {
  if (!project) return null;
  const t = translations[language];

  return (
    <div 
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="project-detail-modal-container"
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 transition-all shadow-[8px_8px_0px_0px_#121212] dark:shadow-[8px_8px_0px_0px_#E2FF32] my-8 ${
          theme === 'dark' 
            ? 'bg-[#181818] border-zinc-700 text-zinc-100' 
            : 'bg-[#FBFBF9] border-black text-[#121212]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] transition-all cursor-pointer shadow-[2px_2px_0px_0px_#000]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Cover Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden border-b-2 border-black dark:border-zinc-700 bg-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-[#E2FF32] text-black border border-black shadow-[1px_1px_0px_0px_#000]">
              {project.category}
            </span>
            {project.metrics && (
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-black text-white border border-zinc-700">
                ⚡ {project.metrics}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3 
              id="project-modal-title"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2"
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base font-mono font-bold text-zinc-600 dark:text-[#E2FF32]">
              // {language === 'en' ? project.taglineEn : project.taglineBn}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-2 font-bold text-zinc-500">
              // {language === 'en' ? 'Overview' : 'সংক্ষিপ্ত বিবরণ'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
              {language === 'en' ? project.descriptionEn : project.descriptionBn}
            </p>
          </div>

          {/* Key Highlights / Outcomes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-3 font-bold text-zinc-500 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E2FF32]" />
              <span>// {t.projects.keyHighlights}</span>
            </h4>
            <div className="space-y-2.5">
              {(language === 'en' ? project.highlightsEn : project.highlightsBn).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-2 h-2 bg-[#E2FF32] border border-black mt-1.5 shrink-0" />
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest mb-3 font-bold text-zinc-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E2FF32]" />
              <span>// {t.projects.techStack}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono font-bold uppercase px-3 py-1 border border-black dark:border-zinc-700 bg-transparent text-current"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t-2 border-black dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  id="modal-project-live-btn"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] transition-all shadow-[2px_2px_0px_0px_#000]"
                >
                  <span>{t.projects.visitSite}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  id="modal-project-code-btn"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black dark:border-zinc-700 bg-transparent text-current hover:bg-[#E2FF32] hover:text-black hover:border-black transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{t.projects.viewCode}</span>
                </a>
              )}
            </div>

            <button
              id="modal-project-close-btn"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black dark:border-zinc-700 bg-transparent text-current hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {t.projects.closeModal}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
