export type Locale = 'en' | 'fa';

type Dict = Record<string, string>;

const en: Dict = {
  brand: 'NeuroMeshLab',
  tagline: 'Decoding the neural mesh of cognition.',
  home: 'Home',
  about: 'About',
  projects: 'Projects',
  team: 'Team',
  researches: 'Researches',
  services: 'Services',
  contact: 'Contact',
  learnMore: 'Learn more',
  getInTouch: 'Get in touch',
  sidebar: 'Quick Access',
  featuredProjects: 'Featured Projects',
  publications: 'Publications',
  samplePublication: 'Sample publication title on neural connectivity',
  madeWith: 'Made with science and care',
  language: 'EN',
  heroSub: 'We analyze fMRI, MRI, DTI, EEG, and Eye-tracking to design cognitive tasks for humans and non-human primates.',
  details: 'Details',
  close: 'Close'
};

const fa: Dict = {
  brand: 'NeuroMeshLab',
  tagline: 'رمزگشایی شبکهٔ عصبی شناخت.',
  home: 'خانه',
  about: 'درباره',
  projects: 'پروژه‌ها',
  team: 'تیم',
  researches: 'پژوهش‌ها',
  services: 'خدمات',
  contact: 'تماس',
  learnMore: 'بیشتر بدانید',
  getInTouch: 'در تماس باشید',
  sidebar: 'دسترسی سریع',
  featuredProjects: 'پروژه‌های منتخب',
  publications: 'انتشارات',
  samplePublication: 'عنوان نمونه برای انتشار دربارهٔ اتصال‌پذیری عصبی',
  madeWith: 'ساخته‌شده با علم و دقت',
  language: 'فا',
  heroSub: 'ما fMRI، MRI، DTI، EEG و رهگیری چشم را تحلیل می‌کنیم و وظایف شناختی برای انسان و نخستی‌های غیرانسانی طراحی می‌کنیم.',
  details: 'جزییات',
  close: 'بستن'
};

export interface I18n {
  t: (key: keyof typeof en) => string;
  locale: () => Locale;
  toggle: () => void;
  onChange: (cb: (l: Locale) => void) => () => void;
}

export function createI18n(): I18n {
  let current: Locale = (localStorage.getItem('locale') as Locale) || 'en';
  const listeners = new Set<(l: Locale) => void>();

  const getDict = () => (current === 'fa' ? fa : en);

  const applyDir = () => {
    document.documentElement.lang = current === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = current === 'fa' ? 'rtl' : 'ltr';
  };
  applyDir();

  return {
    t(key) { return getDict()[key]; },
    locale() { return current; },
    toggle() {
      current = current === 'fa' ? 'en' : 'fa';
      localStorage.setItem('locale', current);
      applyDir();
      listeners.forEach((l) => l(current));
    },
    onChange(cb) { listeners.add(cb); return () => listeners.delete(cb); }
  };
}


