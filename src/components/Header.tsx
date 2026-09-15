import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CategorySlug, ViewState } from '../types';
import { CATEGORIES } from '../data/articles';
import {
  Search,
  Bookmark,
  Sparkles,
  Menu,
  X,
  Rss,
  ArrowUp,
} from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenIntelligence: () => void;
  onOpenRssModal: () => void;
}

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
      setIsScrolled(window.scrollY > 160);
    };
    window.addEventListener('scroll', handleScroll);
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
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full bg-white text-black border-b border-black font-sans-editorial select-none"
      dir="rtl"
    >
      {/* Top Intelligence & Stock Indices Ticker */}
      <div className="w-full bg-black text-white text-[11px] font-sans-editorial py-1 px-4 sm:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-bold tracking-wider text-zinc-300">شاخص‌های راهبردی:</span>
            <span className="text-zinc-300">نفت برنت: <strong className="text-white">۷۸.۴۰ $</strong> (+۰.۸٪)</span>
            <span className="text-zinc-300">طلای جهانی: <strong className="text-white">۲,۶۴۰ $</strong> (-۰.۲٪)</span>
            <span className="text-zinc-300">اوراق قرضه ۱۰ ساله: <strong className="text-white">۴.۲۸٪</strong></span>
            <span className="text-zinc-300 hidden md:inline">شاخص فلزات استراتژیک: <strong className="text-white">۱۸۴.۲</strong> (+۱.۱٪)</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-sans-editorial">
            <button
              onClick={onOpenRssModal}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="خوراک خبرخوان آر‌اس‌اس"
            >
              <Rss className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">خوراک RSS</span>
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={onOpenIntelligence}
              className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors cursor-pointer font-semibold"
              title="واکاوی هوشمند رادار"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
              <span>میز تحلیل هوشمند</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Editorial Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-3">
        {/* Top Dateline & Bureau Row */}
        <div className="flex flex-wrap items-center justify-between text-xs text-zinc-600 border-b border-zinc-200 pb-2 mb-4">
          <div className="font-bold text-black text-[11px] sm:text-xs tracking-tight">
            {getPersianDate()}
          </div>
          <div className="hidden lg:flex items-center gap-3 text-[11px] font-sans-editorial text-zinc-700">
            <span>دفاتر تحریریه:</span>
            <span>تهران</span>
            <span>•</span>
            <span>ریکیاویک</span>
            <span>•</span>
            <span>ژنو</span>
            <span>•</span>
            <span>لندن</span>
            <span>•</span>
            <span>سانتیاگو</span>
            <span>•</span>
            <span>توکیو</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              id="header-saved-btn"
              onClick={onOpenSaved}
              className="flex items-center gap-1.5 text-black hover:opacity-75 transition-opacity font-medium cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>فهرست مطالعه</span>
              {savedCount > 0 && (
                <span className="bg-black text-white text-[10px] font-sans-editorial px-1.5 py-0.2 rounded-xs">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Masthead Branding Centerpiece */}
        <div className="text-center py-2 sm:py-3 space-y-1">
          <h1
            id="brand-masthead"
            onClick={() => onNavigate({ type: 'home' })}
            className="font-display-masthead text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-black cursor-pointer tracking-tight leading-none hover:opacity-95 transition-opacity inline-block font-black"
          >
            رادار
          </h1>
          <div className="text-xs sm:text-sm text-zinc-700 font-sans-editorial max-w-xl mx-auto tracking-normal">
            نشریه مستقل و حقیقت‌محور رویدادهای راهبردی، ژئوپلیتیک و ژورنالیسم تحقیقی
          </div>
        </div>

        {/* Search & Fast Access Bar */}
        <div className="mt-4 pt-2 border-t border-zinc-200 flex items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جست‌وجو در آرشیو گزارش‌ها، اسناد و پرونده‌ها..."
              className="w-full pr-8 pl-3 py-1.5 text-xs font-sans border border-zinc-300 focus:border-black focus:outline-none transition-colors bg-white placeholder:text-zinc-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-black cursor-pointer"
              title="اجرای جست‌وجو"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Desks Indicator */}
          <div className="hidden md:flex items-center gap-4 text-xs font-sans-editorial text-zinc-600">
            <span className="text-[11px] uppercase tracking-wider text-zinc-700">نسخه دیجیتال:</span>
            <span className="font-bold text-black">شماره امروز — چاپ بامدادی</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-black cursor-pointer"
            aria-label="منوی سرویس‌های خبری"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Section Navigation Bar */}
      <nav className="border-t-2 border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="hidden md:flex items-center justify-between text-xs font-sans-editorial py-2 font-bold tracking-tight">
            <li>
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className={`py-1 hover:underline underline-offset-4 cursor-pointer ${
                  currentView.type === 'home' ? 'text-black underline' : 'text-zinc-700 hover:text-black'
                }`}
              >
                صفحه نخست
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => onNavigate({ type: 'category', categorySlug: cat.slug })}
                  className={`py-1 hover:underline underline-offset-4 cursor-pointer ${
                    activeCategory === cat.slug ? 'text-black underline font-black' : 'text-zinc-700 hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-zinc-50 p-4 space-y-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest pb-1 border-b border-zinc-200">
              سرویس‌های تحریریه
            </div>
            <button
              onClick={() => {
                onNavigate({ type: 'home' });
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 text-sm font-bold text-black border-b border-zinc-200"
            >
              صفحه نخست
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  onNavigate({ type: 'category', categorySlug: cat.slug });
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-right py-2 text-sm border-b border-zinc-200 ${
                  activeCategory === cat.slug ? 'font-black text-black' : 'text-zinc-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onOpenIntelligence();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 font-bold text-black"
            >
              <Sparkles className="w-4 h-4" />
              <span>میز تحلیل هوشمند</span>
            </button>
            <button
              onClick={() => {
                onOpenRssModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-zinc-600"
            >
              <Rss className="w-4 h-4" />
              <span>خوراک RSS</span>
            </button>
          </div>
        </div>
      )}

      {/* Sticky Compact Header for Fast Scanning */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-b border-black py-2 px-4 sm:px-8 shadow-xs animate-in fade-in duration-200">
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
                  className="hover:text-black cursor-pointer"
                >
                  صفحه نخست
                </button>
                {CATEGORIES.slice(0, 5).map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => onNavigate({ type: 'category', categorySlug: c.slug })}
                    className="hover:text-black cursor-pointer"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate({ type: 'search' })}
                className="p-1.5 text-zinc-700 hover:text-black cursor-pointer"
                title="جست‌وجو در آرشیو"
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
                className="p-1.5 text-zinc-600 hover:text-black cursor-pointer"
                title="بازگشت به ابتدای صفحه"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
};
