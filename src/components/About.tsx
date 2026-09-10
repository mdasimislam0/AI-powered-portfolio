import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Layers, 
  Cpu, 
  Palette, 
  Check, 
  Clock, 
  FolderGit2, 
  Code2, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Language, Theme, ProfileData } from '../types';
import { translations } from '../data/portfolioData';

interface AboutProps {
  language: Language;
  theme: Theme;
  profile: ProfileData;
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({
  language,
  theme,
  profile,
  onOpenResume,
}) => {
  const t = translations[language];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'FolderGit2':
        return <FolderGit2 className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const focusCards = [
    {
      title: t.about.focus1Title,
      desc: t.about.focus1Desc,
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'REST & GraphQL'],
    },
    {
      title: t.about.focus2Title,
      desc: t.about.focus2Desc,
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      tags: ['Data Structures', 'Algorithms', 'Redis', 'High Concurrency', 'FastAPI'],
    },
    {
      title: t.about.focus3Title,
      desc: t.about.focus3Desc,
      icon: <Palette className="w-6 h-6 text-purple-400" />,
      tags: ['Tailwind CSS', 'Responsive Layouts', 'Micro-interactions', 'WCAG AA'],
    },
  ];

  return (
    <section 
      id="about" 
      className="py-20 border-b border-[#121212] dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-block bg-[#E2FF32] text-black px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-black mb-3">
            // {language === 'en' ? 'Biography & Ethos' : 'জীবনবৃত্তান্ত ও দর্শন'}
          </div>
          <h2 
            id="about-heading"
            className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}
          >
            {t.about.heading}
          </h2>
          <div className="w-16 h-[3px] bg-black dark:bg-[#E2FF32] mb-4" />
          <p className={`text-base sm:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.about.subheading}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {profile.stats.map((stat) => (
            <div
              key={stat.id}
              id={`stat-card-${stat.id}`}
              className={`p-5 border-2 transition-all flex flex-col items-start shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#E2FF32] ${
                theme === 'dark'
                  ? 'bg-[#181818] border-zinc-700'
                  : 'bg-[#FBFBF9] border-black'
              }`}
            >
              <div className="w-8 h-8 bg-[#E2FF32] text-black border border-black flex items-center justify-center mb-3">
                {getStatIcon(stat.iconName)}
              </div>
              <span className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {stat.value}
              </span>
              <span className="text-xs font-bold font-mono uppercase tracking-wider mt-1 text-zinc-500 dark:text-zinc-400">
                {language === 'en' ? stat.labelEn : stat.labelBn}
              </span>
            </div>
          ))}
        </div>

        {/* Main Narrative & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h3 className={`text-2xl font-black uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#121212]'}`}>
              {language === 'en' 
                ? 'Engineering with purpose, precision, and architectural balance.' 
                : 'উদ্দেশ্যপূর্ণ, সুষম ও নির্ভরযোগ্য সফটওয়্যার নির্মাণ।'}
            </h3>
            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {language === 'en' ? profile.bioEn : profile.bioBn}
            </p>
            <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {language === 'en'
                ? 'Currently enrolled at Southeast University pursuing my Bachelor of Science in Computer Science & Engineering. Outside of academic commitments, I actively build full-stack web platforms, participate in competitive programming on LeetCode/Codeforces, and explore emerging cloud-native tooling.'
                : 'বর্তমানে সাউথইস্ট ইউনিভার্সিটিতে কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং বিভাগে অধ্যয়নরত। প্রাতিষ্ঠানিক পড়াশোনার পাশাপাশি আমি ফুল-স্ট্যাক প্রজেক্ট তৈরি, লিটকোড/কোডফোর্সেসে অ্যালগরিদম প্র্যাকটিস এবং ওপেন সোর্স প্রজেক্ট নিয়ে কাজ করতে ভালোবাসি।'}
            </p>

            {/* Key Bullet Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {[
                language === 'en' ? 'Clean & Modular Code Architecture' : 'ক্লিন ও মডুলার কোড আর্কিটেকচার',
                language === 'en' ? 'Strong Algorithmic Foundation' : 'দৃঢ় অ্যালগরিদম ও ডেটা স্ট্রাকচার ভিত',
                language === 'en' ? 'RESTful & GraphQL API Design' : 'RESTful ও GraphQL এপিআই ডিজাইন',
                language === 'en' ? 'Database Indexing & Caching' : 'ডেটাবেস ইনডেক্সিং ও ক্যাশিং অপ্টিমাইজেশন',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                  <div className="w-4 h-4 bg-[#E2FF32] text-black border border-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className={theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic & Quick Profile Highlights */}
          <div className="lg:col-span-5">
            <div className={`p-6 border-2 shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
              theme === 'dark' 
                ? 'bg-[#181818] border-zinc-700' 
                : 'bg-[#FBFBF9] border-black'
            }`}>
              <h4 className={`text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 border-b-2 pb-3 ${
                theme === 'dark' ? 'border-zinc-800 text-white' : 'border-black text-black'
              }`}>
                <GraduationCap className="w-4 h-4 text-[#E2FF32] bg-black p-0.5" />
                <span>{language === 'en' ? 'Education & Metrics' : 'শিক্ষা ও সংক্ষিপ্ত তথ্য'}</span>
              </h4>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <p className="uppercase text-zinc-500 font-bold">{t.about.education}</p>
                  <p className={`font-bold text-sm uppercase mt-0.5 ${theme === 'dark' ? 'text-zinc-200' : 'text-black'}`}>
                    {language === 'en' ? profile.degreeEn : profile.degreeBn}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {language === 'en' ? profile.universityEn : profile.universityBn}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="uppercase text-zinc-500 font-bold">{t.about.location}</p>
                  <p className={`font-bold text-sm uppercase mt-0.5 flex items-center gap-1.5 ${theme === 'dark' ? 'text-zinc-200' : 'text-black'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? profile.locationEn : profile.locationBn}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="uppercase text-zinc-500 font-bold">{t.about.status}</p>
                  <p className={`font-bold text-xs uppercase mt-1 flex items-center gap-1.5 ${theme === 'dark' ? 'text-[#E2FF32]' : 'text-black'}`}>
                    <span className="w-2 h-2 bg-[#E2FF32] border border-black inline-block"></span>
                    <span>{language === 'en' ? profile.statusEn : profile.statusBn}</span>
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    id="about-view-resume-btn"
                    onClick={onOpenResume}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-widest border-2 border-black dark:border-[#E2FF32] bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span>{language === 'en' ? 'Open Detailed Resume' : 'পূর্ণাঙ্গ রিজিউমে দেখুন'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas / Value Pillars Cards */}
        <div>
          <h3 className={`text-2xl font-black uppercase tracking-tight mb-8 text-left ${theme === 'dark' ? 'text-white' : 'text-[#121212]'}`}>
            // {t.about.focusTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusCards.map((card, idx) => (
              <div
                key={idx}
                id={`focus-card-${idx}`}
                className={`p-6 border-2 transition-all shadow-[4px_4px_0px_0px_#121212] dark:shadow-[4px_4px_0px_0px_#E2FF32] ${
                  theme === 'dark'
                    ? 'bg-[#181818] border-zinc-700'
                    : 'bg-[#FBFBF9] border-black'
                }`}
              >
                <div className="w-10 h-10 bg-[#E2FF32] text-black border border-black flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h4 className={`text-lg font-black uppercase tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#121212]'}`}>
                  {card.title}
                </h4>
                <p className={`text-sm leading-relaxed mb-5 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {card.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  {card.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 font-mono font-bold uppercase border border-black dark:border-zinc-700 bg-transparent text-current"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
