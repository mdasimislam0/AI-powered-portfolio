import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { Language, Theme, SkillItem } from '../types';
import { translations } from '../data/portfolioData';

interface SkillsProps {
  language: Language;
  theme: Theme;
  skills: SkillItem[];
}

export const Skills: React.FC<SkillsProps> = ({
  language,
  theme,
  skills,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const t = translations[language];

  const categories = [
    { id: 'all', label: t.skills.all },
    { id: 'frontend', label: t.skills.frontend },
    { id: 'backend', label: t.skills.backend },
    { id: 'database', label: t.skills.database },
    { id: 'devops', label: t.skills.devops },
    { id: 'languages', label: t.skills.languages },
  ];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [skills, activeCategory, searchQuery]);

  return (
    <section 
      id="skills"
      className="py-20 border-b border-[#121212] dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-block bg-[#E2FF32] text-black px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-black mb-3">
            // {language === 'en' ? 'Core Stack & Toolkit' : 'প্রযুক্তিগত দক্ষতা'}
          </div>
          <h2 
            id="skills-heading"
            className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}
          >
            {t.skills.heading}
          </h2>
          <div className="w-16 h-[3px] bg-black dark:bg-[#E2FF32] mb-4" />
          <p className={`text-base sm:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.skills.subheading}
          </p>
        </div>

        {/* Controls: Search and Category Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`skill-cat-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all cursor-pointer ${
                  activeCategory === cat.id
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

          {/* Live Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="skill-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.skills.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 text-xs font-mono border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white placeholder:text-zinc-500 focus:outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
            />
            {searchQuery && (
              <button
                id="clear-skill-search-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-zinc-500 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-zinc-400">
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-wider">
              {language === 'en' ? '// No technologies found matching your query' : '// অনুসন্ধানের সাথে মিল পাওয়া যায়নি'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                id={`skill-card-${idx}`}
                className={`p-5 border-2 flex flex-col justify-between transition-all shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#E2FF32] ${
                  theme === 'dark'
                    ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                    : 'bg-[#FBFBF9] border-black text-[#121212]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-black uppercase tracking-tight">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {skill.featured && (
                        <span className="text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 bg-black text-[#E2FF32] border border-black flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {language === 'en' ? 'Core' : 'মূল'}
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-black dark:text-[#E2FF32]">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3 uppercase tracking-wider">
                    <span>
                      // {skill.category}
                    </span>
                    <span className="font-bold text-current">
                      {skill.level >= 90
                        ? language === 'en' ? 'Advanced' : 'উচ্চতর'
                        : skill.level >= 80
                          ? language === 'en' ? 'Proficient' : 'দক্ষ'
                          : language === 'en' ? 'Intermediate' : 'মধ্যম'}
                    </span>
                  </div>
                </div>

                {/* Visual Proficiency Bar */}
                <div className="w-full h-2.5 border border-black dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-black dark:bg-[#E2FF32] transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
