import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Languages, 
  FileText, 
  SlidersHorizontal, 
  Send,
  Terminal
} from 'lucide-react';
import { Language, Theme, ProfileData } from '../types';
import { translations } from '../data/portfolioData';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  profile: ProfileData;
  onOpenCustomize: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  profile,
  onOpenCustomize,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled 
          ? theme === 'dark'
            ? 'bg-[#121212]/95 backdrop-blur-md border-b border-zinc-800 py-3'
            : 'bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#121212] py-3'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a 
            id="brand-logo-link"
            href="#" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 bg-[#121212] dark:bg-[#E2FF32] text-[#FBFBF9] dark:text-black flex items-center justify-center font-black text-sm tracking-tighter uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5">
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className={`font-black tracking-tighter uppercase text-base sm:text-lg transition-colors ${
                theme === 'dark' ? 'text-white group-hover:text-[#E2FF32]' : 'text-[#121212] group-hover:opacity-75'
              }`}>
                {profile.name}.
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                <span className="w-2 h-2 bg-[#E2FF32] border border-black inline-block"></span>
                <span>{language === 'en' ? 'Available for work' : 'উপলব্ধ'}</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                id={`nav-link-${link.href.replace('#', '')}`}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-xs font-bold uppercase tracking-widest transition-all py-1 border-b-2 border-transparent hover:border-[#121212] dark:hover:border-[#E2FF32] ${
                  theme === 'dark'
                    ? 'text-zinc-300 hover:text-white'
                    : 'text-zinc-800 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Tools & Toggles */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              id="toggle-language-btn"
              onClick={toggleLanguage}
              title={language === 'en' ? 'বাংলা ভাষায় দেখুন' : 'Switch to English'}
              className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono font-bold uppercase border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-zinc-700 text-zinc-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                  : 'border-[#121212] text-[#121212] hover:bg-[#E2FF32] hover:text-black'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="toggle-theme-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-1.5 border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-zinc-700 text-amber-300 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                  : 'border-[#121212] text-[#121212] hover:bg-[#E2FF32] hover:text-black'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Customizer Button */}
            <button
              id="open-customizer-btn"
              onClick={onOpenCustomize}
              title="Edit and customize your profile info"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500'
                  : 'border-[#121212] text-[#121212] hover:bg-zinc-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.nav.customize}</span>
            </button>

            {/* View CV / Resume */}
            <button
              id="open-resume-btn"
              onClick={onOpenResume}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-zinc-700 text-zinc-200 hover:bg-[#E2FF32] hover:text-black hover:border-black'
                  : 'border-[#121212] text-[#121212] hover:bg-[#E2FF32] hover:text-black'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.nav.resume}</span>
            </button>

            {/* Contact Quick Action */}
            <a
              id="quick-hire-nav-btn"
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-black dark:border-[#E2FF32] bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#E2FF32] dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.nav.hireMe}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              id="mobile-language-toggle"
              onClick={toggleLanguage}
              className={`p-1.5 border text-xs font-mono font-bold uppercase ${
                theme === 'dark' ? 'border-zinc-700 text-zinc-200' : 'border-black text-black'
              }`}
            >
              {language === 'en' ? 'BN' : 'EN'}
            </button>
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              className={`p-1.5 border ${
                theme === 'dark' ? 'border-zinc-700 text-amber-400' : 'border-black text-black'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 border ${
                theme === 'dark'
                  ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                  : 'border-black text-black hover:bg-zinc-100'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-menu"
            className={`mt-3 py-4 px-4 border-2 transition-all md:hidden ${
              theme === 'dark'
                ? 'bg-[#121212] border-zinc-700 shadow-[4px_4px_0px_0px_#E2FF32]'
                : 'bg-[#FBFBF9] border-black shadow-[4px_4px_0px_0px_#121212]'
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`mobile-nav-link-${link.href.replace('#', '')}`}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-widest border-b border-zinc-800/20 transition-colors ${
                    theme === 'dark'
                      ? 'text-zinc-300 hover:bg-[#E2FF32] hover:text-black'
                      : 'text-zinc-800 hover:bg-[#E2FF32] hover:text-black'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-1 border-t-2 border-black dark:border-zinc-800 flex flex-col gap-2">
                <button
                  id="mobile-open-customize-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCustomize();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-black dark:border-zinc-700 hover:bg-[#E2FF32] hover:text-black"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{t.nav.customize}</span>
                </button>
                <button
                  id="mobile-open-resume-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider border border-black dark:border-zinc-700 hover:bg-[#E2FF32] hover:text-black"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.nav.resume}</span>
                </button>
                <a
                  id="mobile-hire-me-btn"
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-black uppercase tracking-widest border-2 border-black bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.nav.hireMe}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
