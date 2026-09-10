import React, { useState, useEffect } from 'react';
import { initialProfileData } from './data/portfolioData';
import { ProfileData, Language, Theme, Project } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { CustomizeModal } from './components/CustomizeModal';
import { Footer } from './components/Footer';

const PROFILE_STORAGE_KEY = 'developer_portfolio_profile_v1';
const THEME_STORAGE_KEY = 'developer_portfolio_theme_v1';
const LANG_STORAGE_KEY = 'developer_portfolio_lang_v1';

export default function App() {
  // Load profile from localStorage or fallback to initial data
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        let modified = false;
        if (parsed.name && (parsed.name.includes('Tanvir') || parsed.name.includes('তানভীর'))) {
          parsed.name = 'Md. Asim Islam';
          modified = true;
        }
        if (parsed.socials) {
          if (!parsed.socials.phone || parsed.socials.phone.includes('1700')) {
            parsed.socials.phone = '01750883553';
            modified = true;
          }
          if (!parsed.socials.whatsapp || parsed.socials.whatsapp.includes('1700')) {
            parsed.socials.whatsapp = '8801750883553';
            modified = true;
          }
        }
        if (modified) {
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Failed to load profile from storage:', err);
    }
    return initialProfileData;
  });

  // Language state (support EN and BN)
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (saved === 'en' || saved === 'bn') return saved;
    } catch (e) {}
    return 'en';
  });

  // Theme state (dark / light)
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return 'dark';
  });

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Sync theme to root class and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.className = 'bg-[#121212] text-[#FBFBF9] antialiased selection:bg-[#E2FF32] selection:text-black';
      } else {
        document.documentElement.classList.remove('dark');
        document.body.className = 'bg-[#FBFBF9] text-[#121212] antialiased selection:bg-[#E2FF32] selection:text-black';
      }
    } catch (e) {}
  }, [theme]);

  // Sync language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch (e) {}
  }, [language]);

  // Handle saving customized profile
  const handleSaveProfile = (updatedProfile: ProfileData) => {
    setProfile(updatedProfile);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  };

  // Handle reset to default profile
  const handleResetProfile = () => {
    setProfile(initialProfileData);
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#121212] text-[#FBFBF9]' : 'bg-[#FBFBF9] text-[#121212]'
    }`}>
      {/* Sticky Header Navigation */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        profile={profile}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          language={language}
          theme={theme}
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        <About
          language={language}
          theme={theme}
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <Skills
          language={language}
          theme={theme}
          skills={profile.skills}
        />

        <Projects
          language={language}
          theme={theme}
          projects={profile.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <Experience
          language={language}
          theme={theme}
          experiences={profile.experiences}
        />

        <Contact
          language={language}
          theme={theme}
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        language={language}
        theme={theme}
      />

      {/* Project Case Study / Architecture Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          language={language}
          theme={theme}
        />
      )}

      {/* Printable / Downloadable Resume Modal */}
      {isResumeOpen && (
        <ResumeModal
          profile={profile}
          language={language}
          theme={theme}
          onClose={() => setIsResumeOpen(false)}
        />
      )}

      {/* Live Profile Customizer Modal */}
      {isCustomizeOpen && (
        <CustomizeModal
          profile={profile}
          onSave={handleSaveProfile}
          onReset={handleResetProfile}
          onClose={() => setIsCustomizeOpen(false)}
          language={language}
          theme={theme}
        />
      )}
    </div>
  );
}
