import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Article } from '../types';

interface MostReadSectionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const MostReadSection: React.FC<MostReadSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ranked = articles
    .filter((a) => a.ranking !== undefined)
    .sort((a, b) => (a.ranking || 0) - (b.ranking || 0))
    .slice(0, 5);

  const persianNumerals = ['۰۱', '۰۲', '۰۳', '۰۴', '۰۵'];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 font-sans-editorial"
      dir="rtl"
    >
      <div className="relative pb-2 mb-5">
        <div className="flex items-baseline justify-between pb-2">
          <motion.h3
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black flex items-center gap-2"
          >
            <span>پربازدیدترین گزارش‌ها</span>
            <span className="text-xs font-sans-editorial text-zinc-500 font-normal hidden sm:inline">
              — پایش مراجعات ۴۸ ساعت گذشته تحریریه
            </span>
          </motion.h3>
          <span className="text-[11px] font-sans-editorial uppercase tracking-wider text-zinc-500">
            رتبه‌بندی ۰۱ تا ۰۵
          </span>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-[2px] bg-black origin-right w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 sm:gap-7">
        {ranked.map((item, index) => {
          const rankNum = persianNumerals[index] || `۰${index + 1}`;
          return (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: index * 0.07,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => onSelectArticle(item.slug)}
              className="flex flex-col justify-between group cursor-pointer border-t border-zinc-300 pt-3 hover:border-black transition-colors"
            >
              <div>
                {/* Large Editorial Rank Number with subtle sequential scale/opacity reveal */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.07,
                    ease: 'easeOut',
                  }}
                  className="font-headline font-black text-4xl sm:text-5xl text-zinc-300 group-hover:text-black transition-colors leading-none mb-2 select-none"
                >
                  {rankNum}
                </motion.div>

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
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
};
