import React from 'react';
import { motion } from 'motion/react';

interface BreakingNewsItem {
  id: string;
  headline: string;
  timestamp: string;
  articleSlug: string;
}

interface BreakingBarProps {
  news: BreakingNewsItem;
  onSelectArticle: (slug: string) => void;
}

export const BreakingBar: React.FC<BreakingBarProps> = ({ news, onSelectArticle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full bg-white border-b border-zinc-300 text-black py-1.5 px-4 sm:px-8 font-sans-editorial"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Subtle text badge */}
          <span className="font-bold text-black text-[11px] uppercase tracking-wider shrink-0 underline decoration-2 underline-offset-4">
            خبر فوری
          </span>

          <span className="text-[11px] text-zinc-400 font-sans-editorial shrink-0 hidden sm:inline">
            [{news.timestamp}]
          </span>

          <p
            onClick={() => onSelectArticle(news.articleSlug)}
            className="font-headline font-bold text-xs sm:text-sm text-zinc-900 truncate hover:text-black hover:underline cursor-pointer tracking-tight"
          >
            {news.headline}
          </p>
        </div>

        <button
          onClick={() => onSelectArticle(news.articleSlug)}
          className="shrink-0 text-[11px] font-bold text-zinc-600 hover:text-black hover:underline cursor-pointer transition-colors"
        >
          مشروح گزارش ←
        </button>
      </div>
    </motion.div>
  );
};
