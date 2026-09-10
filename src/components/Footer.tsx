import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Terminal } from 'lucide-react';
import { ProfileData, Language, Theme } from '../types';
import { translations } from '../data/portfolioData';

interface FooterProps {
  profile: ProfileData;
  language: Language;
  theme: Theme;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  language,
  theme,
}) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className={`no-print py-12 border-t-2 transition-colors ${
        theme === 'dark'
          ? 'bg-[#121212] border-zinc-800 text-zinc-400'
          : 'bg-[#FBFBF9] border-black text-[#121212]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/20 dark:border-zinc-800">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 border-2 border-black bg-[#E2FF32] flex items-center justify-center text-black font-black text-xs shadow-[1px_1px_0px_0px_#000]">
                {profile.name.charAt(0)}
              </div>
              <span className="font-black text-base uppercase tracking-tight">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">
              {language === 'en' ? profile.titleEn : profile.titleBn} // {language === 'en' ? profile.universityEn : profile.universityBn}
            </p>
          </div>

          {/* Quote */}
          <p className="text-xs font-mono text-zinc-500 text-center max-w-md uppercase tracking-wider">
            "{t.footer.quote}"
          </p>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            {profile.socials.github && (
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black dark:border-zinc-700 bg-transparent hover:bg-[#E2FF32] hover:text-black hover:border-black transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.socials.linkedin && (
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black dark:border-zinc-700 bg-transparent hover:bg-[#E2FF32] hover:text-black hover:border-black transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.socials.email && (
              <a
                href={`mailto:${profile.socials.email}`}
                className="p-2 border-2 border-black dark:border-zinc-700 bg-transparent hover:bg-[#E2FF32] hover:text-black hover:border-black transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] transition-colors flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-[2px_2px_0px_0px_#000]"
              title={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">{t.footer.backToTop}</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-2 uppercase tracking-wider">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t.footer.allRights}
          </p>
          <p className="flex items-center gap-1">
            <span>Built with React, TypeScript & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
