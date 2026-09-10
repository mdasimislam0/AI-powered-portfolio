import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Layers, Info } from 'lucide-react';
import { Project, Language, Theme } from '../types';
import { translations } from '../data/portfolioData';

interface ProjectsProps {
  language: Language;
  theme: Theme;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  language,
  theme,
  projects,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[language];

  const categories = [
    { id: 'all', label: t.projects.allCategories },
    { id: 'Full Stack', label: 'Full Stack' },
    { id: 'Backend / AI', label: 'Backend & AI' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Mobile & Tools', label: 'Tools & Utilities' },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <section 
      id="projects" 
      className="py-20 border-b border-[#121212] dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-block bg-[#E2FF32] text-black px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-black mb-3">
            // {language === 'en' ? 'Selected Works' : 'নির্বাচিত প্রজেক্টসমূহ'}
          </div>
          <h2 
            id="projects-heading"
            className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}
          >
            {t.projects.heading}
          </h2>
          <div className="w-16 h-[3px] bg-black dark:bg-[#E2FF32] mb-4" />
          <p className={`text-base sm:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.projects.subheading}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`proj-filter-${cat.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'border-black dark:border-[#E2FF32] bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : theme === 'dark'
                    ? 'border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800'
                    : 'border-black bg-transparent text-[#121212] hover:bg-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className={`border-2 flex flex-col justify-between transition-all shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
                theme === 'dark'
                  ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                  : 'bg-[#FBFBF9] border-black text-[#121212]'
              }`}
            >
              {/* Card Thumbnail */}
              <div>
                <div className="relative h-52 w-full overflow-hidden border-b-2 border-black dark:border-zinc-700 bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-black text-[#E2FF32] border border-black">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#E2FF32] text-black border border-black flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {t.projects.featuredBadge}
                      </span>
                    )}
                  </div>

                  {project.metrics && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-black text-white border border-zinc-700">
                        ⚡ {project.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    id={`project-title-${project.id}`}
                    className="text-xl font-black uppercase tracking-tight mb-2 hover:text-[#E2FF32] transition-colors"
                  >
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    {language === 'en' ? project.taglineEn : project.taglineBn}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-black dark:border-zinc-700 bg-transparent text-current"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 border-t-2 border-black dark:border-zinc-700 flex items-center justify-between gap-2">
                {/* Case study trigger button */}
                <button
                  id={`view-details-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest hover:text-[#E2FF32] transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{t.projects.caseStudy}</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      id={`github-link-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 border transition-all ${
                        theme === 'dark'
                          ? 'border-zinc-700 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                          : 'border-black text-[#121212] hover:bg-[#E2FF32] hover:text-black'
                      }`}
                      title={t.projects.viewCode}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      id={`live-link-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] transition-all shadow-[1px_1px_0px_0px_#000]"
                      title={t.projects.liveDemo}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
