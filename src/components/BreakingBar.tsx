import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export interface BreakingNewsItem {
  id: string;
  headline: string;
  timestamp: string;
  articleSlug: string;
}

interface BreakingBarProps {
  news: BreakingNewsItem;
  items?: BreakingNewsItem[];
  onSelectArticle: (slug: string) => void;
}

const DEFAULT_BREAKING_ITEMS: BreakingNewsItem[] = [
  {
    id: 'brk-01',
    headline: 'اجلاس ریکیاویک بدون توافق به پایان رسید؛ هفت کشور قطبی خواستار لغو فوری عوارض اجباری روسیه بر آبراهه شمالی شدند',
    timestamp: 'لحظاتی پیش • ۰۸:۳۰',
    articleSlug: 'arctic-transit-corridor-diplomatic-impasse-reykjavik',
  },
  {
    id: 'brk-02',
    headline: 'آماده‌باش گارد ساحلی فنلاند در پی اختلال در شبکه کابل‌های زیردریایی و حسگرهای فشار بستر بالتیک',
    timestamp: '۰۷:۴۵',
    articleSlug: 'helsinki-baltic-security-advisory-maritime-alert',
  },
  {
    id: 'brk-03',
    headline: 'تأخیر در راه‌اندازی فاز دوم تأسیسات فوتولیتوگرافی درسدن به دلیل کسری تجهیزات لیتوگرافی فرابنفش عمیق',
    timestamp: '۰۶:۱۰',
    articleSlug: 'sovereign-silicon-foundries-european-chip-autonomy',
  },
  {
    id: 'brk-04',
    headline: 'دادستانی شیلی حساب‌های بانکی سه شرکت کاغذی واسطه در واگذاری امتیازنامه‌های معادن آتاکاما را مسدود کرد',
    timestamp: '۰۴:۴۰',
    articleSlug: 'confidential-forensic-audit-lithium-concessions-andes',
  },
];

export const BreakingBar: React.FC<BreakingBarProps> = ({ news, items, onSelectArticle }) => {
  const breakingList = items && items.length > 0 ? items : [news, ...DEFAULT_BREAKING_ITEMS.slice(1)];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<number | null>(null);

  const DURATION = 6000; // 6 seconds per breaking headline

  useEffect(() => {
    if (shouldReduceMotion || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingList.length);
    }, DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [breakingList.length, isHovered, shouldReduceMotion]);

  const currentItem = breakingList[currentIndex] || news;
  const persianNumerals = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵'];

  return (
    <div
      className="w-full bg-white border-b border-zinc-300 text-black py-1.5 px-4 sm:px-8 font-sans-editorial relative select-none"
      dir="rtl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs min-h-[26px]">
        {/* Title & Live Badge */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 bg-black inline-block animate-pulse"></span>
            <span className="font-bold text-black text-[11px] uppercase tracking-wider underline decoration-2 underline-offset-4">
              خبر فوری
            </span>
          </div>

          {/* Rotating Headline with Vertical Transition */}
          <div className="relative flex-1 overflow-hidden h-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center gap-2.5 truncate w-full"
              >
                <span className="text-[11px] text-zinc-400 font-sans-editorial shrink-0 hidden sm:inline">
                  [{currentItem.timestamp}]
                </span>

                <p
                  onClick={() => onSelectArticle(currentItem.articleSlug)}
                  className="font-headline font-bold text-xs sm:text-sm text-zinc-900 truncate hover:text-black cursor-pointer tracking-tight editorial-link-hover"
                  title={currentItem.headline}
                >
                  {currentItem.headline}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Controls & Read Link */}
        <div className="flex items-center gap-3 shrink-0 text-[11px] font-sans-editorial">
          {/* Index indicator */}
          <span className="text-zinc-400 text-[10px] hidden md:inline">
            {persianNumerals[currentIndex] || `۰${currentIndex + 1}`} / {persianNumerals[breakingList.length - 1] || `۰${breakingList.length}`}
          </span>

          <button
            onClick={() => onSelectArticle(currentItem.articleSlug)}
            className="font-bold text-zinc-600 hover:text-black cursor-pointer transition-colors"
          >
            مشروح گزارش ←
          </button>
        </div>
      </div>

      {/* Subtle 1px progress line under the breaking bar */}
      {!shouldReduceMotion && !isHovered && (
        <motion.div
          key={`progress-${currentIndex}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DURATION / 1000, ease: 'linear' }}
          className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-zinc-400 origin-right"
        />
      )}
    </div>
  );
};
