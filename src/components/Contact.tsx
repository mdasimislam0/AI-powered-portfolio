import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Theme, ProfileData, ContactFormData } from '../types';
import { translations } from '../data/portfolioData';

interface ContactProps {
  language: Language;
  theme: Theme;
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({
  language,
  theme,
  profile,
}) => {
  const t = translations[language];
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (!profile.socials.email) return;
    navigator.clipboard.writeText(profile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#E2FF32', '#121212', '#000000', '#ffffff'],
      });

      // Reset form fields
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Clear success message after 8 seconds
      setTimeout(() => setSubmitted(false), 8000);
    }, 800);
  };

  const predefinedSubjects = [
    language === 'en' ? '🚀 Job Opportunity' : '🚀 চাকরির সুযোগ',
    language === 'en' ? '💼 Project Collaboration' : '💼 নতুন প্রজেক্টের কাজ',
    language === 'en' ? '☕ Casual Tech Chat' : '☕ টেক আড্ডা ও পরামর্শ',
  ];

  return (
    <section 
      id="contact" 
      className="py-20 border-b border-[#121212] dark:border-zinc-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-block bg-[#E2FF32] text-black px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-widest border border-black mb-3">
            // {language === 'en' ? 'Get In Touch' : 'যোগাযোগের মাধ্যম'}
          </div>
          <h2 
            id="contact-heading"
            className={`text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#121212]'
            }`}
          >
            {t.contact.heading}
          </h2>
          <div className="w-16 h-[3px] bg-black dark:bg-[#E2FF32] mb-4" />
          <p className={`text-base sm:text-lg leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Instant Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card */}
            <div className={`p-6 border-2 transition-all shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
              theme === 'dark'
                ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                : 'bg-[#FBFBF9] border-black text-[#121212]'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 border-2 border-black bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_#000]">
                  <Mail className="w-4 h-4" />
                </div>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black bg-black text-[#E2FF32] hover:bg-[#E2FF32] hover:text-black transition-all cursor-pointer shadow-[1px_1px_0px_0px_#000]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Copied!' : 'কপি হয়েছে!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                // {t.contact.directEmail}
              </h3>
              <a
                href={`mailto:${profile.socials.email}`}
                className="text-base sm:text-lg font-mono font-bold hover:text-[#E2FF32] transition-colors break-all underline decoration-2 decoration-black dark:decoration-[#E2FF32]"
              >
                {profile.socials.email}
              </a>
            </div>

            {/* WhatsApp / Phone Card */}
            {profile.socials.whatsapp && (
              <div className={`p-6 border-2 transition-all shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
                theme === 'dark'
                  ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                  : 'bg-[#FBFBF9] border-black text-[#121212]'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 border-2 border-black bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_#000]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <a
                    id="whatsapp-direct-link"
                    href={`https://wa.me/${profile.socials.whatsapp}?text=Hi%20${encodeURIComponent(profile.name)},%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider border-2 border-black bg-[#E2FF32] text-black hover:bg-black hover:text-[#E2FF32] transition-all shadow-[1px_1px_0px_0px_#000]"
                  >
                    <span>{t.contact.chatWhatsapp}</span>
                  </a>
                </div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  // {t.contact.phone}
                </h3>
                <p className="text-base sm:text-lg font-mono font-bold">
                  <a 
                    href={`tel:${(profile.socials.phone || profile.socials.whatsapp).replace(/[^0-9+]/g, '')}`}
                    className="hover:underline hover:text-[#121212] dark:hover:text-[#E2FF32] transition-colors"
                  >
                    {profile.socials.phone || `+${profile.socials.whatsapp}`}
                  </a>
                </p>
              </div>
            )}

            {/* Location & Academic Base Card */}
            <div className={`p-6 border-2 transition-all shadow-[5px_5px_0px_0px_#121212] dark:shadow-[5px_5px_0px_0px_#E2FF32] ${
              theme === 'dark'
                ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                : 'bg-[#FBFBF9] border-black text-[#121212]'
            }`}>
              <div className="p-2.5 border-2 border-black bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_#000] w-fit mb-4">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                // {t.contact.location}
              </h3>
              <p className="text-base sm:text-lg font-mono font-bold">
                {language === 'en' ? profile.locationEn : profile.locationBn}
              </p>
              <p className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                {language === 'en' ? profile.universityEn : profile.universityBn}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Send Message Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 border-2 shadow-[6px_6px_0px_0px_#121212] dark:shadow-[6px_6px_0px_0px_#E2FF32] ${
              theme === 'dark'
                ? 'bg-[#181818] border-zinc-700 text-zinc-100'
                : 'bg-[#FBFBF9] border-black text-[#121212]'
            }`}>
              <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E2FF32]" />
                <span>{language === 'en' ? 'Send a Direct Message' : 'সরাসরি বার্তা পাঠান'}</span>
              </h3>

              {submitted ? (
                <div 
                  id="contact-success-notification"
                  className="p-8 border-2 border-black bg-[#E2FF32] text-black flex flex-col items-center text-center space-y-3 shadow-[4px_4px_0px_0px_#000]"
                >
                  <div className="w-12 h-12 border-2 border-black bg-black text-[#E2FF32] flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    {language === 'en' ? 'Message Sent Successfully!' : 'বার্তা সফলভাবে পাঠানো হয়েছে!'}
                  </h4>
                  <p className="text-xs sm:text-sm font-mono font-bold">
                    {t.contact.sentSuccess}
                  </p>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Quick Topics Pills */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
                      // {language === 'en' ? 'Quick Topics' : 'দ্রুত বিষয় নির্বাচন'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {predefinedSubjects.map((sub, idx) => (
                        <button
                          key={idx}
                          type="button"
                          id={`topic-btn-${idx}`}
                          onClick={() => setFormData({ ...formData, subject: sub })}
                          className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 border-2 transition-all cursor-pointer ${
                            formData.subject === sub
                              ? 'border-black bg-[#E2FF32] text-black shadow-[2px_2px_0px_0px_#000]'
                              : 'border-black dark:border-zinc-700 bg-transparent text-current hover:bg-zinc-200 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="contact-name"
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5"
                      >
                        {t.contact.yourName} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'en' ? 'e.g. Alex Rahman' : 'যেমন: আসিম ইসলাম'}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white placeholder:text-zinc-500 focus:outline-none focus:bg-[#E2FF32]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="contact-email"
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5"
                      >
                        {t.contact.yourEmail} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={language === 'en' ? 'alex@example.com' : 'yourname@mail.com'}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white placeholder:text-zinc-500 focus:outline-none focus:bg-[#E2FF32]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-subject"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5"
                    >
                      {t.contact.subject}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={language === 'en' ? 'e.g. Full-Stack Developer Opportunity' : 'বিষয় উল্লেখ করুন'}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white placeholder:text-zinc-500 focus:outline-none focus:bg-[#E2FF32]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-message"
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5"
                    >
                      {t.contact.message} *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === 'en' ? 'Write your message or project requirements here...' : 'আপনার বার্তা বা প্রজেক্ট সম্পর্কিত বিস্তারিত লিখুন...'}
                      className="w-full px-4 py-3 text-xs sm:text-sm font-mono border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[#121212] dark:text-white placeholder:text-zinc-500 focus:outline-none focus:bg-[#E2FF32]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    id="submit-contact-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-black bg-[#E2FF32] text-black font-mono font-bold uppercase tracking-widest text-xs sm:text-sm shadow-[4px_4px_0px_0px_#121212] hover:bg-black hover:text-[#E2FF32] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
