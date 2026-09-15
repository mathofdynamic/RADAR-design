import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Article } from '../types';

interface AnalysisAndOpinionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const AnalysisAndOpinion: React.FC<AnalysisAndOpinionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const opinionArticles = articles.filter((a) => a.isOpinion || a.category === 'opinion');
  const primaryEssay = opinionArticles[0] || articles[0];
  const secondaryEssays = articles
    .filter((a) => (a.category === 'opinion' || a.category === 'culture') && a.id !== primaryEssay.id)
    .slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-7 my-4 border-t-2 border-b border-black font-sans-editorial"
      dir="rtl"
    >
      <div className="space-y-6">
        <div className="relative pb-2">
          <div className="flex items-baseline justify-between pb-2">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-baseline gap-3"
            >
              <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
                دیدگاه‌ها، جستارها و نقد اندیشه
              </h3>
              <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
                تحلیل‌های راهبردی، فلسفه سیاسی و نقد ساختار قدرت
              </span>
            </motion.div>
            <span className="text-[11px] font-sans-editorial uppercase tracking-wider text-zinc-500">
              میز اندیشه رادار
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Opinion Essay (col-span-7) with Text-Focused Stagger */}
          <motion.article
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="flex items-center gap-3.5">
              {primaryEssay.author.avatarUrl && (
                <img
                  src={primaryEssay.author.avatarUrl}
                  alt={primaryEssay.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-black/20 editorial-img-contrast"
                />
              )}
              <div>
                <div className="font-headline font-bold text-sm text-black">
                  {primaryEssay.author.name}
                </div>
                <div className="text-[11px] text-zinc-500 font-sans-editorial">
                  {primaryEssay.author.role}
                  {primaryEssay.author.location ? ` — ${primaryEssay.author.location}` : ''}
                </div>
              </div>
            </div>

            <h4
              onClick={() => onSelectArticle(primaryEssay.slug)}
              className="font-headline font-black text-2xl sm:text-3xl text-black leading-snug cursor-pointer hover:underline underline-offset-4"
            >
              «{primaryEssay.title}»
            </h4>

            <p className="font-article-body text-base text-zinc-800 leading-relaxed">
              {primaryEssay.standfirst}
            </p>

            {primaryEssay.pullQuote && (
              <blockquote className="border-r-2 border-black pr-4 py-1 font-article-body text-zinc-900 text-sm italic">
                «{primaryEssay.pullQuote}»
              </blockquote>
            )}

            <div className="pt-2">
              <button
                onClick={() => onSelectArticle(primaryEssay.slug)}
                className="text-xs font-bold text-black uppercase tracking-wider hover:underline cursor-pointer"
              >
                مطالعه متن کامل یادداشت تحلیلی ←
              </button>
            </div>
          </motion.article>

          {/* Secondary Essays (col-span-5) with RTL hairline separator */}
          <div className="lg:col-span-5 lg:hairline-r lg:pr-8 space-y-6 divide-y divide-zinc-200">
            {secondaryEssays.map((essay, idx) => (
              <motion.article
                key={essay.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.08,
                  ease: 'easeOut',
                }}
                className={`${idx > 0 ? 'pt-5' : ''} space-y-2 group`}
              >
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{essay.author.name}</span>
                  <span>•</span>
                  <span>{essay.readTime}</span>
                </div>

                <h5
                  onClick={() => onSelectArticle(essay.slug)}
                  className="font-headline font-bold text-base text-black group-hover:underline cursor-pointer leading-snug"
                >
                  {essay.title}
                </h5>

                <p className="font-article-body text-xs text-zinc-700 leading-relaxed line-clamp-2">
                  {essay.standfirst}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
