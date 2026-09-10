import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ProfileData, Language, Theme } from '../types';
import { translations } from '../data/portfolioData';

interface ResumeModalProps {
  profile: ProfileData;
  language: Language;
  theme: Theme;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  profile,
  language,
  theme,
  onClose,
}) => {
  const t = translations[language];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="resume-modal-card"
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto border-2 shadow-[8px_8px_0px_0px_#121212] dark:shadow-[8px_8px_0px_0px_#E2FF32] transition-all my-6 ${
          theme === 'dark' 
            ? 'bg-[#181818] border-zinc-700 text-zinc-100' 
            : 'bg-[#FBFBF9] border-black text-[#121212]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden in print) */}
        <div className={`no-print sticky top-0 z-20 px-6 py-4 border-b-2 flex items-center justify-between backdrop-blur-md ${
          theme === 'dark' ? 'bg-[#181818]/95 border-zinc-700' : 'bg-[#FBFBF9]/95 border-black'
        }`}>
          <div className="flex items-center gap-2">
            <h3 className="font-black text-lg uppercase tracking-tight">{t.resume.title}</h3>
            <span className="text-xs font-mono px-2 py-0.5 border border-black bg-[#E2FF32] text-black font-bold uppercase tracking-wider">
              PDF Ready
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="print-resume-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.resume.downloadPdf}</span>
            </button>

            <button
              id="close-resume-btn"
              onClick={onClose}
              className="p-2 border-2 border-black dark:border-zinc-700 bg-transparent hover:bg-[#E2FF32] hover:text-black hover:border-black transition-colors cursor-pointer"
              aria-label="Close CV"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Paper Resume Container */}
        <div className="p-8 sm:p-12 space-y-8 bg-inherit font-sans">
          {/* Resume Header */}
          <div className="border-b-2 pb-6 border-black dark:border-zinc-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight">{profile.name}</h1>
                <p className="text-base font-mono font-bold text-zinc-600 dark:text-[#E2FF32] mt-0.5 uppercase tracking-wider">
                  // {language === 'en' ? profile.titleEn : profile.titleBn}
                </p>
                <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">
                  {language === 'en' ? profile.subtitleEn : profile.subtitleBn}
                </p>
              </div>

              {/* Contact Grid */}
              <div className="text-xs font-mono space-y-1 sm:text-right text-zinc-500 uppercase tracking-wider">
                <p className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3 h-3 text-[#E2FF32]" />
                  <span>{profile.socials.email}</span>
                </p>
                {profile.socials.phone && (
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Phone className="w-3 h-3 text-[#E2FF32]" />
                    <a href={`tel:${profile.socials.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
                      {profile.socials.phone}
                    </a>
                  </p>
                )}
                <p className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3 h-3 text-[#E2FF32]" />
                  <span>{language === 'en' ? profile.locationEn : profile.locationBn}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-black dark:text-[#E2FF32] mb-2 border-b-2 border-black dark:border-zinc-700 pb-1">
              // {t.resume.profileSummary}
            </h2>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {language === 'en' ? profile.bioEn : profile.bioBn}
            </p>
          </div>

          {/* Technical Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-black dark:text-[#E2FF32] mb-3 border-b-2 border-black dark:border-zinc-700 pb-1">
              // {t.resume.technicalCompetencies}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black">
                <span className="font-bold uppercase tracking-wider text-black dark:text-white">Frontend: </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {profile.skills.filter(s => s.category === 'frontend').map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-3 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black">
                <span className="font-bold uppercase tracking-wider text-black dark:text-white">Backend & API: </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {profile.skills.filter(s => s.category === 'backend').map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-3 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black">
                <span className="font-bold uppercase tracking-wider text-black dark:text-white">Databases: </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {profile.skills.filter(s => s.category === 'database').map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-3 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black">
                <span className="font-bold uppercase tracking-wider text-black dark:text-white">DevOps & Languages: </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {profile.skills.filter(s => s.category === 'devops' || s.category === 'languages').map(s => s.name).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-black dark:text-[#E2FF32] mb-3 border-b-2 border-black dark:border-zinc-700 pb-1">
              // {t.resume.educationSection}
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-start text-sm">
                <div>
                  <h3 className="font-black uppercase tracking-tight">{language === 'en' ? profile.degreeEn : profile.degreeBn}</h3>
                  <p className="text-zinc-600 dark:text-[#E2FF32] text-xs font-mono font-bold uppercase tracking-wider">
                    {language === 'en' ? profile.universityEn : profile.universityBn}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500">2022 — Present</span>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-black dark:text-[#E2FF32] mb-3 border-b-2 border-black dark:border-zinc-700 pb-1">
              // {t.resume.experienceSection}
            </h2>
            <div className="space-y-4">
              {profile.experiences.map((exp) => (
                <div key={exp.id} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-black uppercase tracking-tight">
                      {language === 'en' ? exp.roleEn : exp.roleBn}
                    </h3>
                    <span className="font-mono text-zinc-500">
                      {language === 'en' ? exp.periodEn : exp.periodBn}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-[#E2FF32] font-mono font-bold uppercase tracking-wider">
                    {language === 'en' ? exp.organizationEn : exp.organizationBn} — {language === 'en' ? exp.locationEn : exp.locationBn}
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-700 dark:text-zinc-300 pt-1">
                    {(language === 'en' ? exp.descriptionEn : exp.descriptionBn).map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-black dark:text-[#E2FF32] mb-3 border-b-2 border-black dark:border-zinc-700 pb-1">
              // {t.resume.selectedProjects}
            </h2>
            <div className="space-y-3 text-xs">
              {profile.projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-black uppercase tracking-tight text-sm">{proj.title}</span>
                    <span className="font-mono text-xs font-bold text-black dark:text-[#E2FF32]">// {proj.category}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {language === 'en' ? proj.taglineEn : proj.taglineBn}
                  </p>
                  <p className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                    Tech: {proj.tags.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
