import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

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
      className="w-full bg-zinc-100 border-b border-black text-black py-2 px-4 sm:px-8 font-sans-editorial"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Breaking badge */}
          <span className="bg-black text-white px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider shrink-0">
            خبر فوری
          </span>

          <span className="text-[11px] text-zinc-600 font-sans-editorial shrink-0 hidden sm:inline">
            [{news.timestamp}]
          </span>

          <p
            onClick={() => onSelectArticle(news.articleSlug)}
            className="font-headline font-bold text-sm truncate hover:underline cursor-pointer tracking-tight"
          >
            {news.headline}
          </p>
        </div>

        <button
          onClick={() => onSelectArticle(news.articleSlug)}
          className="shrink-0 flex items-center gap-1 text-[11px] uppercase font-bold text-zinc-700 hover:text-black hover:underline cursor-pointer"
        >
          <span>مشروح گزارش</span>
          <ArrowLeft className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};
