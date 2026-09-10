import React, { useState } from 'react';
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { ExperienceItem, Language, Theme } from '../types';
import { translations } from '../data/portfolioData';

interface ExperienceProps {
  language: Language;
  theme: Theme;
  experiences: ExperienceItem[];
}

export const Experience: React.FC<ExperienceProps> = ({
  language,
  theme,
  experiences,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'work' | 'education' | 'achievement'>('all');
  const t = translations[language];

  const filterOptions = [
    { id: 'all', label: t.experience.all },
    { id: 'work', label: t.experience.work },
    { id: 'education', label: t.experience.education },
    { id: 'achievement', label: t.experience.achievement },
  ];

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    return exp.type === activeFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-4 h-4 text-black" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-black" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-black" />;
      default:
        return <Briefcase className="w-4 h-4 text-black" />;
    }
  };

  return (
    <section 
      id="experience" 
      className="py-20 border-b border-[#121212] dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-block bg-[#E2FF32] text-black px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-black mb-3">
            // {language === 'en' ? 'Journey & Milestones' : 'অভিজ্ঞতা ও অর্জন'}
          </div>
          <h2 
            id="experience-heading"
            className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}
          >
            {t.experience.heading}
          </h2>
          <div className="w-16 h-[3px] bg-black dark:bg-[#E2FF32] mb-4" />
          <p className={`text-base sm:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.experience.subheading}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              id={`exp-filter-${opt.id}`}
              onClick={() => setActiveFilter(opt.id as any)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                activeFilter === opt.id
                  ? 'border-black dark:border-[#E2FF32] bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : theme === 'dark'
                    ? 'border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800'
                    : 'border-black bg-transparent text-[#121212] hover:bg-zinc-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l-2 border-black dark:border-zinc-700 ml-4 sm:ml-32 md:ml-40 space-y-10">
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Dot with Icon */}
              <div className="absolute -left-[19px] top-1.5 w-9 h-9 border-2 border-black bg-[#E2FF32] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {getTypeIcon(exp.type)}
              </div>

              {/* Date Tag for Desktop (Left floating) */}
              <div className="hidden sm:block absolute -left-36 md:-left-44 top-3 text-right w-28 md:w-36">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  {language === 'en' ? exp.periodEn : exp.periodBn}
                </span>
              </div>

              {/* Experience Card */}
              <div 
                id={`exp-card-${exp.id}`}
                className={`p-6 border-2 transition-all shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
                  theme === 'dark'
                    ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                    : 'bg-[#FBFBF9] border-black text-[#121212]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">
                      {language === 'en' ? exp.roleEn : exp.roleBn}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono font-bold mt-1 uppercase tracking-wider">
                      <span className="text-black dark:text-[#E2FF32]">
                        {language === 'en' ? exp.organizationEn : exp.organizationBn}
                      </span>
                      <span className="text-zinc-400">•</span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <MapPin className="w-3 h-3" />
                        <span>{language === 'en' ? exp.locationEn : exp.locationBn}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {exp.badgeEn && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-black text-[#E2FF32] border border-black">
                        {language === 'en' ? exp.badgeEn : exp.badgeBn}
                      </span>
                    )}
                    {/* Mobile Period */}
                    <span className="sm:hidden text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{language === 'en' ? exp.periodEn : exp.periodBn}</span>
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2 mt-4 text-xs sm:text-sm font-sans leading-relaxed">
                  {(language === 'en' ? exp.descriptionEn : exp.descriptionBn).map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#E2FF32] border border-black mt-2 shrink-0"></span>
                      <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
