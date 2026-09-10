import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Code2, 
  Terminal, 
  Sparkles, 
  MapPin, 
  GraduationCap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Language, Theme, ProfileData } from '../types';
import { translations } from '../data/portfolioData';

interface HeroProps {
  language: Language;
  theme: Theme;
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenCustomize: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  theme,
  profile,
  onOpenResume,
  onOpenCustomize,
}) => {
  const t = translations[language];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#121212] dark:border-zinc-800"
    >
      {/* Background subtle architectural grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(#121212 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Persona & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div 
              id="hero-status-pill"
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-widest border mb-6 transition-all ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                  : 'bg-black text-white border-black'
              }`}
            >
              <span className="w-2 h-2 bg-[#E2FF32] border border-black inline-block"></span>
              <span>{language === 'en' ? profile.statusEn : profile.statusBn}</span>
            </div>

            {/* Kicker */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-zinc-600 dark:text-zinc-400">
              — {t.hero.greeting} // {language === 'en' ? profile.titleEn : profile.titleBn}
            </p>

            {/* Headline */}
            <h1 
              id="hero-name-heading"
              className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-[#121212]'
              }`}
            >
              {profile.name}.
            </h1>

            <h2 
              id="hero-role-heading"
              className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-800 dark:text-[#E2FF32] mb-4"
            >
              Crafting High-Performance Digital Flow.
            </h2>

            {/* Subtitle & Mission */}
            <p 
              className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-6 ${
                theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              {language === 'en' ? profile.subtitleEn : profile.subtitleBn}
            </p>

            {/* Divider line & Location marker */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-black dark:bg-[#E2FF32]" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                {language === 'en' ? profile.locationEn : profile.locationBn} • {language === 'en' ? profile.universityEn : profile.universityBn}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                onClick={(e) => handleScrollTo(e, '#projects')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-widest border-2 border-black dark:border-[#E2FF32] bg-[#E2FF32] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#E2FF32] dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
              >
                <span>{t.hero.exploreProjects}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="hero-download-cv-btn"
                onClick={onOpenResume}
                className={`inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                    : 'border-black bg-transparent text-[#121212] hover:bg-[#E2FF32] hover:text-black'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{t.hero.downloadCv}</span>
              </button>

              <a
                id="hero-contact-btn"
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className={`inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                    : 'border-black text-[#121212] hover:bg-zinc-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{t.hero.contactMe}</span>
              </a>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-zinc-500">
                Connect:
              </span>
              <div className="flex items-center gap-2">
                {profile.socials.github && (
                  <a
                    id="hero-social-github"
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 border transition-all ${
                      theme === 'dark'
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                        : 'border-black bg-white text-black hover:bg-[#E2FF32]'
                    }`}
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.socials.linkedin && (
                  <a
                    id="hero-social-linkedin"
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 border transition-all ${
                      theme === 'dark'
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                        : 'border-black bg-white text-black hover:bg-[#E2FF32]'
                    }`}
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.socials.twitter && (
                  <a
                    id="hero-social-twitter"
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-2.5 border transition-all ${
                      theme === 'dark'
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                        : 'border-black bg-white text-black hover:bg-[#E2FF32]'
                    }`}
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profile.socials.email && (
                  <a
                    id="hero-social-email"
                    href={`mailto:${profile.socials.email}`}
                    className={`p-2.5 border transition-all ${
                      theme === 'dark'
                        ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                        : 'border-black bg-white text-black hover:bg-[#E2FF32]'
                    }`}
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal & Live Profile Snapshot */}
          <div className="lg:col-span-5 relative">
            <div 
              id="hero-terminal-card"
              className={`border-2 transition-all shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#E2FF32] overflow-hidden ${
                theme === 'dark'
                  ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                  : 'bg-[#FBFBF9] border-black text-[#121212]'
              }`}
            >
              {/* Terminal Window Header */}
              <div className={`px-4 py-3 border-b-2 flex items-center justify-between ${
                theme === 'dark' ? 'bg-[#121212] border-zinc-700 text-white' : 'bg-black border-black text-white'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#E2FF32] border border-black" />
                  <div className="w-2.5 h-2.5 bg-white border border-black" />
                  <div className="w-2.5 h-2.5 bg-zinc-500 border border-black" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-[#E2FF32]" />
                  <span>system_profile.ts</span>
                </div>
                <div className="text-[10px] font-mono bg-[#E2FF32] text-black px-2 py-0.5 font-bold uppercase tracking-widest border border-black">
                  ONLINE
                </div>
              </div>

              {/* Terminal Body with Code Snippet */}
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
                <div className="text-zinc-500 mb-2">
                  <span className="text-[#E2FF32] font-bold dark:text-[#E2FF32]">$</span> cat developer_profile.ts
                </div>

                <div className="space-y-1">
                  <p>
                    <span className="font-bold text-zinc-600 dark:text-zinc-400">export const</span>{' '}
                    <span className="font-bold text-[#121212] dark:text-[#E2FF32]">engineer</span>:{' '}
                    <span className="italic">DeveloperProfile</span> = {'{'}
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">name:</span>{' '}
                    <span className="text-[#121212] dark:text-zinc-200 font-semibold">'{profile.name}'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">institution:</span>{' '}
                    <span className="text-[#121212] dark:text-zinc-200">'{profile.universityEn}'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">location:</span>{' '}
                    <span className="text-[#121212] dark:text-zinc-200">'{profile.locationEn}'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">coreStack:</span> [
                    <span className="bg-[#E2FF32] text-black font-bold px-1 mx-0.5 border border-black text-[11px]">React</span>,{' '}
                    <span className="bg-[#E2FF32] text-black font-bold px-1 mx-0.5 border border-black text-[11px]">TypeScript</span>,{' '}
                    <span className="bg-[#E2FF32] text-black font-bold px-1 mx-0.5 border border-black text-[11px]">Node.js</span>,{' '}
                    <span className="bg-[#E2FF32] text-black font-bold px-1 mx-0.5 border border-black text-[11px]">PostgreSQL</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-zinc-500">status:</span>{' '}
                    <span className="bg-black text-[#E2FF32] dark:bg-[#E2FF32] dark:text-black font-bold px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                      'Available for Projects'
                    </span>
                  </p>
                  <p>{'}'};</p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-300 dark:border-zinc-800 text-zinc-500 space-y-1">
                  <p>
                    <span className="font-bold text-[#121212] dark:text-[#E2FF32]">$</span> system_check --status
                  </p>
                  <p className="text-black dark:text-[#E2FF32] font-bold flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Passing: 100% test coverage • WCAG AA standard</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Floating Quick Stats Pill */}
            <div 
              id="hero-floating-stat-badge"
              className={`absolute -bottom-5 -left-3 sm:left-4 p-3 border-2 shadow-[3px_3px_0px_0px_#121212] dark:shadow-[3px_3px_0px_0px_#E2FF32] flex items-center gap-3 transition-transform hover:translate-x-0.5 hover:translate-y-0.5 ${
                theme === 'dark'
                  ? 'bg-[#121212] border-zinc-700 text-white'
                  : 'bg-[#FBFBF9] border-black text-black'
              }`}
            >
              <div className="w-8 h-8 bg-[#E2FF32] text-black border border-black flex items-center justify-center font-black">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Code Architecture</p>
                <p className="text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <span>Production Ready</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
