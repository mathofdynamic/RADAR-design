import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CategorySlug, ViewState } from '../types';
import { CATEGORIES } from '../data/articles';
import { Search, Bookmark, Menu, X, ArrowUp } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenIntelligence: () => void;
  onOpenRssModal: () => void;
}

const STRATEGIC_TICKER_ITEMS = [
  { label: 'نفت خام برنت', value: '۷۸.۴۰ $', change: '+۰.۸٪', positive: true },
  { label: 'طلای جهانی انس', value: '۲,۶۴۰ $', change: '-۰.۲٪', positive: false },
  { label: 'اوراق قرضه ۱۰ ساله', value: '۴.۲۸٪', change: '+۰.۰۳', positive: true },
  { label: 'فلزات استراتژیک و لیتیوم', value: '۱۸۴.۲', change: '+۱.۱٪', positive: true },
  { label: 'گاز طبیعی TTF اروپا', value: '۳۶.۵۰ €', change: '+۱.۵٪', positive: true },
  { label: 'شاخص کانتینری شانگهای', value: '۲,۳۸۰', change: '-۰.۴٪', positive: false },
  { label: 'تنگه هرمز و دریای سرخ', value: 'وضعیت تردد امنیتی', change: 'سطح ۳', positive: false },
  { label: 'نرخ تنزیل فدرال', value: '۵.۲۵٪', change: 'تثبیت', positive: true },
];

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenSaved,
  onOpenIntelligence,
  onOpenRssModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for compact sticky masthead
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate({ type: 'search', initialQuery: searchQuery.trim() });
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const getPersianDate = () => {
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return 'دوشنبه، ۲۴ شهریور ۱۴۰۵';
    }
  };

  const activeCategory =
    currentView.type === 'category' ? currentView.categorySlug : null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full bg-white text-black font-sans-editorial select-none"
      dir="rtl"
    >
      {/* Top Strategic Indices & Infinite Continuous Wire Ticker (Bloomberg/FT Style) */}
      <div className="w-full bg-black text-white text-[11px] font-sans-editorial py-1.5 px-4 sm:px-8 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Static Title Badge */}
          <div className="shrink-0 flex items-center gap-2 pl-3 border-l border-zinc-800 text-zinc-300">
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-pulse"></span>
            <span className="font-bold tracking-wider text-[10px] uppercase text-zinc-300 whitespace-nowrap">
              شاخص‌های راهبردی:
            </span>
          </div>

          {/* Continuous Running Ticker Track (GPU transform, seamless infinite loop) */}
          <div className="flex-1 overflow-hidden relative mask-fade" dir="ltr">
            <div className="animate-ticker items-center gap-8 py-0.5 whitespace-nowrap" tabIndex={0}>
              {/* Render items list twice for seamless jump-free loop */}
              {[...STRATEGIC_TICKER_ITEMS, ...STRATEGIC_TICKER_ITEMS].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 text-zinc-300 text-[11px] px-2"
                  dir="rtl"
                >
                  <span className="text-zinc-400">{item.label}:</span>
                  <strong className="text-white font-medium">{item.value}</strong>
                  <span
                    className={`text-[10px] font-mono-editorial ${
                      item.positive ? 'text-zinc-300' : 'text-zinc-400'
                    }`}
                  >
                    ({item.change})
                  </span>
                  <span className="text-zinc-700 mr-2">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Utility Desks */}
          <div className="shrink-0 hidden sm:flex items-center gap-3 text-xs font-sans-editorial pr-3 border-r border-zinc-800">
            <button
              onClick={onOpenRssModal}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-[11px]"
              title="خوراک خبرخوان آر‌اس‌اس"
            >
              خوراک RSS
            </button>
            <span className="text-zinc-700">/</span>
            <button
              onClick={onOpenIntelligence}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px] font-semibold"
              title="میز واکاوی تحلیلی و استراتژیک رادار"
            >
              میز تحلیل هوشمند
            </button>
          </div>
        </div>
      </div>

      {/* Main Authentic Editorial Masthead (Balanced, compact, authoritative) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="grid grid-cols-2 md:grid-cols-12 items-center gap-4">
          {/* Right Column: Dateline & Edition Info */}
          <div className="hidden md:flex md:col-span-4 flex-col justify-center text-xs text-zinc-600 space-y-0.5">
            <span className="font-bold text-black text-xs tracking-tight">
              {getPersianDate()}
            </span>
            <div className="text-[11px] text-zinc-500 flex items-center gap-2">
              <span>نسخه دیجیتال</span>
              <span>•</span>
              <span>شماره بامدادی</span>
              <span>•</span>
              <span className="text-zinc-700 font-medium">تهران / ریکیاویک / ژنو</span>
            </div>
          </div>

          {/* Center Column: Unmistakable Editorial "رادار" Wordmark */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-center justify-center">
            <h1
              id="brand-masthead"
              onClick={() => onNavigate({ type: 'home' })}
              className="font-display-masthead text-4xl sm:text-5xl md:text-[3.25rem] font-black text-black cursor-pointer tracking-tight leading-none hover:opacity-85 transition-opacity select-none"
            >
              رادار
            </h1>
            <span className="text-[10px] text-zinc-500 font-sans-editorial tracking-tight hidden sm:block mt-0.5">
              نشریه مستقل رویدادهای راهبردی و ژئوپلیتیک
            </span>
          </div>

          {/* Left Column: Minimal Search & Reading List */}
          <div className="col-span-1 md:col-span-4 flex items-center justify-end gap-3">
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-full max-w-[200px] lg:max-w-[230px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جست‌وجو در آرشیو..."
                className="w-full pr-7 pl-2.5 py-1 text-xs font-sans border-b border-zinc-400 focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-zinc-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black cursor-pointer"
                title="جست‌وجو"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              id="header-saved-btn"
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 text-xs text-black hover:opacity-75 transition-opacity font-medium cursor-pointer shrink-0"
              title="فهرست گزارش‌های ذخیره‌شده"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">فهرست مطالعه</span>
              {savedCount > 0 && (
                <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded-xs font-sans-editorial">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-black cursor-pointer"
              aria-label="منوی سرویس‌ها"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Section Navigation Bar (Crisp double rule) */}
      <nav className="border-t-2 border-b border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="hidden md:flex items-center justify-between text-xs font-sans-editorial py-2 font-bold tracking-tight">
            <li>
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className={`py-0.5 transition-colors cursor-pointer editorial-link-hover ${
                  currentView.type === 'home'
                    ? 'text-black font-black border-b-2 border-black'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                صفحه نخست
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => onNavigate({ type: 'category', categorySlug: cat.slug })}
                  className={`py-0.5 transition-colors cursor-pointer editorial-link-hover ${
                    activeCategory === cat.slug
                      ? 'text-black font-black border-b-2 border-black'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden md:hidden border-b-2 border-black bg-white p-4 space-y-3"
          >
            <form onSubmit={handleSearchSubmit} className="relative pb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جست‌وجو در آرشیو گزارش‌ها..."
                className="w-full pr-8 pl-3 py-2 text-xs border border-zinc-300 focus:border-black focus:outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute right-2.5 top-2.5" />
            </form>

            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigate({ type: 'home' });
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right py-1.5 text-xs font-bold text-black border-b border-zinc-100"
              >
                صفحه نخست
              </button>
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.slug}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.025, duration: 0.2 }}
                  onClick={() => {
                    onNavigate({ type: 'category', categorySlug: cat.slug });
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-right py-1.5 text-xs border-b border-zinc-100 ${
                    activeCategory === cat.slug ? 'font-black text-black' : 'text-zinc-600'
                  }`}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-600">
              <button
                onClick={() => {
                  onOpenIntelligence();
                  setMobileMenuOpen(false);
                }}
                className="font-bold text-black"
              >
                میز تحلیل هوشمند
              </button>
              <button
                onClick={() => {
                  onOpenRssModal();
                  setMobileMenuOpen(false);
                }}
              >
                خوراک RSS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Compact Header for Fast Scanning with Smooth Motion Entrance */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-b border-black py-2 px-4 sm:px-8 shadow-xs"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <span
                  onClick={() => onNavigate({ type: 'home' })}
                  className="font-display-masthead font-black text-2xl tracking-tight text-black cursor-pointer hover:opacity-80"
                >
                  رادار
                </span>
                <div className="hidden sm:flex items-center gap-4 text-xs font-sans-editorial text-zinc-600">
                  <button
                    onClick={() => onNavigate({ type: 'home' })}
                    className="hover:text-black cursor-pointer editorial-link-hover"
                  >
                    صفحه نخست
                  </button>
                  {CATEGORIES.slice(0, 5).map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => onNavigate({ type: 'category', categorySlug: c.slug })}
                      className="hover:text-black cursor-pointer editorial-link-hover"
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate({ type: 'search' })}
                  className="p-1 text-zinc-600 hover:text-black cursor-pointer"
                  title="جست‌وجو"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenSaved}
                  className="flex items-center gap-1 text-xs font-bold text-black hover:opacity-80 cursor-pointer"
                >
                  <Bookmark className="w-4 h-4" />
                  {savedCount > 0 && (
                    <span className="bg-black text-white text-[10px] px-1.5 py-0.2 rounded-xs">
                      {savedCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="p-1 text-zinc-500 hover:text-black cursor-pointer"
                  title="بازگشت به بالا"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
