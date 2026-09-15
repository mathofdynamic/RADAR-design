import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Article } from '../types';
import { Bookmark } from 'lucide-react';

interface HeroEditorialProps {
  leadArticle: Article;
  leadArticles?: Article[];
  secondaryArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onToggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  leadArticle,
  leadArticles,
  secondaryArticles,
  onSelectArticle,
  onToggleSave,
  isSaved,
}) => {
  // Use up to 3 major lead stories
  const stories =
    leadArticles && leadArticles.length > 0
      ? leadArticles.slice(0, 3)
      : [leadArticle, secondaryArticles[0], secondaryArticles[1]].filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const AUTOPLAY_INTERVAL = 8000; // 8 seconds

  // Reset timer on manual navigation or index change
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (shouldReduceMotion || isHovered || !isTabActive) return;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, AUTOPLAY_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, isHovered, isTabActive, shouldReduceMotion, stories.length]);

  // Pause when browser tab is inactive
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const goToStory = (idx: number) => {
    setActiveIndex(idx);
  };

  const nextStory = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    // In RTL, swipe left (diff > 45) advances to next, swipe right (diff < -45) goes to prev
    if (diff > 45) {
      nextStory();
    } else if (diff < -45) {
      prevStory();
    }
    touchStartX.current = null;
  };

  const currentLead = stories[activeIndex] || leadArticle;
  const persianNumerals = ['۰۱', '۰۲', '۰۳'];

  // Other secondary stories to show in the side column
  const asideStories = secondaryArticles.filter((a) => a.id !== currentLead.id);

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-7 font-sans-editorial select-none"
      dir="rtl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Dominant Lead Story Column (8 cols) - Stationary Grid */}
        <article className="lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Top Bar: Desk Metadata + Minimal Typographic Indicators (۰۱ — ۰۲ — ۰۳) */}
            <div className="flex items-center justify-between text-xs text-zinc-600 font-sans-editorial border-b border-zinc-200 pb-2 mb-3">
              {/* Category & Section */}
              <div className="flex items-center gap-2">
                <span className="font-black uppercase tracking-wider text-black">
                  {currentLead.category}
                </span>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-600">{currentLead.subcategory}</span>
                <span className="text-zinc-400 hidden sm:inline">•</span>
                <span className="text-zinc-500 hidden sm:inline">{currentLead.readTime}</span>
              </div>

              {/* Editorial Typographic Rotation Indicators (01 — 02 — 03) & Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-sans-editorial">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToStory(idx)}
                      className={`cursor-pointer transition-all duration-200 px-1 py-0.5 ${
                        activeIndex === idx
                          ? 'text-black font-black border-b-2 border-black scale-105'
                          : 'text-zinc-400 font-medium hover:text-black'
                      }`}
                      title={`گزارش شماره ${persianNumerals[idx]}`}
                    >
                      {persianNumerals[idx]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                  <button
                    onClick={prevStory}
                    className="hover:text-black cursor-pointer px-1 py-0.5 transition-colors"
                    title="گزارش قبلی"
                  >
                    ←
                  </button>
                  <span className="text-zinc-300">/</span>
                  <button
                    onClick={nextStory}
                    className="hover:text-black cursor-pointer px-1 py-0.5 transition-colors"
                    title="گزارش بعدی"
                  >
                    →
                  </button>
                </div>

                {/* Bookmark action */}
                <button
                  onClick={() => onToggleSave(currentLead.id)}
                  className="hover:text-black transition-colors cursor-pointer flex items-center gap-1 text-[11px] mr-2"
                  title="ذخیره در فهرست مطالعه"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(currentLead.id) ? 'fill-black text-black' : 'text-zinc-400'
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {isSaved(currentLead.id) ? 'ذخیره‌شده' : 'ذخیره'}
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Content Transitions (Stationary Layout, Animated Content) */}
            <div className="relative min-h-[160px] sm:min-h-[190px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentLead.id}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="space-y-3"
                >
                  {/* Monumental Lead Headline */}
                  <h2
                    onClick={() => onSelectArticle(currentLead.slug)}
                    className="font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-black leading-[1.12] tracking-tight cursor-pointer hover:underline underline-offset-4 decoration-2"
                  >
                    {currentLead.title}
                  </h2>

                  {/* Standfirst / Executive Summary */}
                  <motion.p
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-article-body text-base sm:text-lg text-zinc-800 leading-relaxed font-normal"
                  >
                    {currentLead.standfirst}
                  </motion.p>

                  {/* Author Byline */}
                  <div className="text-xs font-sans-editorial text-zinc-600 pt-0.5">
                    <span>به قلم </span>
                    <strong className="text-black font-bold">{currentLead.author.name}</strong>
                    <span className="text-zinc-500"> — {currentLead.author.role}</span>
                    {currentLead.author.location && (
                      <span className="text-zinc-500 font-normal"> ({currentLead.author.location})</span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dominant Editorial Photography with Smooth Crossfade & Scale Settle */}
            {currentLead.imageUrl && (
              <figure
                onClick={() => onSelectArticle(currentLead.slug)}
                className="pt-3 cursor-pointer group"
              >
                <div className="overflow-hidden bg-zinc-100 border border-black/10 relative aspect-[16/9]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`img-${currentLead.id}`}
                      src={currentLead.imageUrl}
                      alt={currentLead.title}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 1.015 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-full h-full object-cover editorial-lead-img"
                      loading="eager"
                    />
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {currentLead.imageCaption && (
                    <motion.figcaption
                      key={`cap-${currentLead.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-xs text-zinc-600 font-sans-editorial flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 leading-normal"
                    >
                      <span>{currentLead.imageCaption}</span>
                      {currentLead.imageCredit && (
                        <span className="shrink-0 text-zinc-500 text-[10px] tracking-wider uppercase font-sans-editorial">
                          {currentLead.imageCredit}
                        </span>
                      )}
                    </motion.figcaption>
                  )}
                </AnimatePresence>
              </figure>
            )}

            {/* Key Executive Findings Callout */}
            <AnimatePresence mode="wait">
              {currentLead.keyTakeaways && currentLead.keyTakeaways.length > 0 && (
                <motion.div
                  key={`takeaways-${currentLead.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="my-5 border-r-2 border-black pr-4 py-1 space-y-1.5"
                >
                  <div className="text-[11px] font-black uppercase tracking-wider text-black">
                    محورهای کلیدی راهبردی:
                  </div>
                  <ul className="space-y-1 text-xs font-sans-editorial text-zinc-800 list-disc list-inside">
                    {currentLead.keyTakeaways.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        <span className="text-zinc-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>

        {/* Secondary Editorial Column (4 cols) with Subtle Entrance Stagger */}
        <aside className="lg:col-span-4 lg:hairline-r lg:pr-8 space-y-5">
          <div className="border-b-2 border-black pb-1 mb-3 flex items-baseline justify-between">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-black">
              تحلیل‌ها و گزارش‌های هم‌پیوند
            </h3>
            <span className="text-[10px] uppercase font-sans-editorial text-zinc-500">
              سرویس‌های تخصصی
            </span>
          </div>

          <div className="space-y-6 divide-y divide-zinc-200">
            {asideStories.slice(0, 3).map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: 'easeOut' }}
                className={`${idx > 0 ? 'pt-5' : ''} space-y-2 group`}
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(article.slug)}
                  className="font-headline font-bold text-base sm:text-lg text-black cursor-pointer group-hover:underline leading-snug"
                >
                  {article.title}
                </h4>

                <p className="font-article-body text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-3">
                  {article.standfirst}
                </p>

                {article.imageUrl && (
                  <div
                    onClick={() => onSelectArticle(article.slug)}
                    className="overflow-hidden bg-zinc-100 border border-black/10 mt-2 cursor-pointer aspect-[16/10]"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover editorial-img-contrast"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between text-xs text-zinc-500 font-sans-editorial">
                  <span>به قلم {article.author.name}</span>
                  <button
                    onClick={() => onToggleSave(article.id)}
                    className="hover:text-black cursor-pointer p-0.5"
                    title="ذخیره"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        isSaved(article.id) ? 'fill-black text-black' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};
