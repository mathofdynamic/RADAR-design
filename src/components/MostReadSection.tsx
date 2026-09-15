import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';

interface MostReadSectionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const MostReadSection: React.FC<MostReadSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const ranked = articles
    .filter((a) => a.ranking !== undefined)
    .sort((a, b) => (a.ranking || 0) - (b.ranking || 0))
    .slice(0, 5);

  const persianNumerals = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 font-sans-editorial"
      dir="rtl"
    >
      <div className="border-b-2 border-black pb-2 mb-5 flex items-baseline justify-between">
        <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black flex items-center gap-2">
          <span>پربازدیدترین گزارش‌ها</span>
          <span className="text-xs font-sans-editorial text-zinc-500 font-normal hidden sm:inline">
            — پایش مراجعات ۴۸ ساعت گذشته تحریریه
          </span>
        </h3>
        <span className="text-[11px] font-sans-editorial uppercase tracking-wider text-zinc-500">
          رتبه‌بندی ۰۱ تا ۰۵
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-7">
        {ranked.map((item, index) => {
          const rankNum = persianNumerals[index] || `۰${index + 1}`;
          return (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item.slug)}
              className="flex flex-col justify-between group cursor-pointer border-t border-zinc-300 pt-3 hover:border-black transition-colors"
            >
              <div>
                {/* Large Editorial Rank Number */}
                <div className="font-headline font-black text-4xl sm:text-5xl text-zinc-300 group-hover:text-black transition-colors leading-none mb-2 select-none">
                  {rankNum}
                </div>

                <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-sans-editorial mb-1">
                  {item.category}
                </div>

                <h4 className="font-headline font-bold text-sm sm:text-base text-black group-hover:underline underline-offset-2 leading-snug">
                  {item.title}
                </h4>
              </div>

              <div className="mt-3 text-[11px] text-zinc-500 font-sans-editorial pt-2 border-t border-zinc-100">
                <span>{item.readTime}</span>
              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
};
