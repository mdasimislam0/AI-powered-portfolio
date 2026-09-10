import React, { useState } from 'react';
import { X, Save, RotateCcw, User, Globe, Share2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData, Language, Theme } from '../types';
import { translations, initialProfileData } from '../data/portfolioData';

interface CustomizeModalProps {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
  onReset: () => void;
  onClose: () => void;
  language: Language;
  theme: Theme;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  profile,
  onSave,
  onReset,
  onClose,
  language,
  theme,
}) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [activeTab, setActiveTab] = useState<'personal' | 'socials'>('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const t = translations[language];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#06b6d4', '#3b82f6', '#10b981'],
    });

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm(language === 'en' ? 'Reset all fields to default Southeast University developer profile?' : 'ডিফল্ট তথ্যে ফিরিয়ে নিতে চান?')) {
      setFormData({ ...initialProfileData });
      onReset();
    }
  };

  return (
    <div 
      id="customizer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="customizer-modal-card"
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto border-2 shadow-[8px_8px_0px_0px_#121212] dark:shadow-[8px_8px_0px_0px_#E2FF32] transition-all my-6 ${
          theme === 'dark' 
            ? 'bg-[#181818] border-zinc-700 text-zinc-100' 
            : 'bg-[#FBFBF9] border-black text-[#121212]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 px-6 py-4 border-b-2 flex items-center justify-between backdrop-blur-md ${
          theme === 'dark' ? 'bg-[#181818]/95 border-zinc-700' : 'bg-[#FBFBF9]/95 border-black'
        }`}>
          <div>
            <h3 className="font-black text-lg uppercase tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 bg-[#E2FF32] border border-black inline-block" />
              <span>{t.customizer.modalTitle}</span>
            </h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              // {t.customizer.modalSubtitle}
            </p>
          </div>

          <button
            id="close-customizer-btn"
            onClick={onClose}
            className="p-2 border-2 border-black dark:border-zinc-700 bg-transparent hover:bg-[#E2FF32] hover:text-black hover:border-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b-2 border-black dark:border-zinc-700 px-6 pt-3 gap-4 font-mono text-xs font-bold uppercase tracking-wider">
          <button
            id="tab-personal-info"
            onClick={() => setActiveTab('personal')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'personal'
                ? 'border-black dark:border-[#E2FF32] text-black dark:text-[#E2FF32]'
                : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.customizer.personalTab}</span>
          </button>
          <button
            id="tab-social-links"
            onClick={() => setActiveTab('socials')}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'socials'
                ? 'border-black dark:border-[#E2FF32] text-black dark:text-[#E2FF32]'
                : 'border-transparent text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>{t.customizer.socialsTab}</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4 font-sans">
          {savedSuccess && (
            <div className="p-3 border-2 border-black bg-[#E2FF32] text-black font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-[2px_2px_0px_0px_#000]">
              <Check className="w-4 h-4" />
              <span>// {t.customizer.savedToast}</span>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.nameLabel}
                </label>
                <input
                  id="custom-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-zinc-500 mb-1">
                    // {t.customizer.titleEnLabel}
                  </label>
                  <input
                    id="custom-title-en"
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-zinc-500 mb-1">
                    // {t.customizer.titleBnLabel}
                  </label>
                  <input
                    id="custom-title-bn"
                    type="text"
                    required
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-bold text-zinc-500 mb-1">
                    // {t.customizer.universityLabel}
                  </label>
                  <input
                    id="custom-university"
                    type="text"
                    value={formData.universityEn}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      universityEn: e.target.value,
                      universityBn: e.target.value 
                    })}
                    className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>

                <div>
                  <label className="block uppercase font-bold text-zinc-500 mb-1">
                    // {t.customizer.degreeLabel}
                  </label>
                  <input
                    id="custom-degree"
                    type="text"
                    value={formData.degreeEn}
                    onChange={(e) => setFormData({ ...formData, degreeEn: e.target.value })}
                    className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.locationLabel}
                </label>
                <input
                  id="custom-location"
                  type="text"
                  value={formData.locationEn}
                  onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.bioEnLabel}
                </label>
                <textarea
                  id="custom-bio-en"
                  rows={3}
                  value={formData.bioEn}
                  onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all resize-none shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.emailLabel}
                </label>
                <input
                  id="custom-email"
                  type="email"
                  required
                  value={formData.socials.email}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, email: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.githubLabel}
                </label>
                <input
                  id="custom-github"
                  type="url"
                  value={formData.socials.github}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, github: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.linkedinLabel}
                </label>
                <input
                  id="custom-linkedin"
                  type="url"
                  value={formData.socials.linkedin}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, linkedin: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {language === 'en' ? 'Phone Number' : 'ফোন নম্বর'}
                </label>
                <input
                  id="custom-phone"
                  type="text"
                  placeholder="e.g. 01750883553"
                  value={formData.socials.phone || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, phone: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-zinc-500 mb-1">
                  // {t.customizer.whatsappLabel}
                </label>
                <input
                  id="custom-whatsapp"
                  type="text"
                  placeholder="e.g. 8801750883553"
                  value={formData.socials.whatsapp || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, whatsapp: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2 border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white outline-none focus:bg-[#E2FF32]/10 transition-all shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-black dark:border-zinc-700 flex items-center justify-between gap-3 font-mono">
            <button
              type="button"
              id="reset-defaults-btn"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black dark:border-zinc-700 bg-transparent text-current hover:bg-rose-500 hover:text-white hover:border-black transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.customizer.resetDefaults}</span>
            </button>

            <button
              type="submit"
              id="save-profile-btn"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{t.customizer.saveChanges}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
