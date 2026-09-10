export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  facebook?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  leetcode?: string;
  codeforces?: string;
}

export interface StatItem {
  id: string;
  value: string;
  labelEn: string;
  labelBn: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'languages';
  icon?: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  category: 'Full Stack' | 'Frontend' | 'Backend / AI' | 'Mobile & Tools';
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
  highlightsEn: string[];
  highlightsBn: string[];
}

export interface ExperienceItem {
  id: string;
  roleEn: string;
  roleBn: string;
  organizationEn: string;
  organizationBn: string;
  periodEn: string;
  periodBn: string;
  locationEn: string;
  locationBn: string;
  type: 'work' | 'education' | 'achievement';
  descriptionEn: string[];
  descriptionBn: string[];
  badgeEn?: string;
  badgeBn?: string;
}

export interface ProfileData {
  name: string;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  locationEn: string;
  locationBn: string;
  universityEn: string;
  universityBn: string;
  degreeEn: string;
  degreeBn: string;
  statusEn: string;
  statusBn: string;
  bioEn: string;
  bioBn: string;
  avatarUrl: string;
  socials: SocialLinks;
  stats: StatItem[];
  skills: SkillItem[];
  projects: Project[];
  experiences: ExperienceItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
