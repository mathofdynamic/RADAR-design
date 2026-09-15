import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';

interface AnalysisAndOpinionProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const AnalysisAndOpinion: React.FC<AnalysisAndOpinionProps> = ({
  articles,
  onSelectArticle,
}) => {
  const opinionArticles = articles.filter((a) => a.isOpinion || a.category === 'opinion');
  const primaryEssay = opinionArticles[0] || articles[0];
  const secondaryEssays = articles.filter(
    (a) => (a.category === 'opinion' || a.category === 'culture') && a.id !== primaryEssay.id
  ).slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-7 my-4 border-t-2 border-b border-black font-sans-editorial"
      dir="rtl"
    >
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-black pb-2">
          <div className="flex items-baseline gap-3">
            <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
              دیدگاه‌ها، جستارها و نقد اندیشه
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              تحلیل‌های راهبردی، فلسفه سیاسی و نقد ساختار قدرت
            </span>
          </div>
          <span className="text-[11px] font-sans-editorial uppercase tracking-wider text-zinc-500">
            میز اندیشه رادار
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Opinion Essay (col-span-7) */}
          <article className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3.5">
              {primaryEssay.author.avatarUrl && (
                <img
                  src={primaryEssay.author.avatarUrl}
                  alt={primaryEssay.author.name}
                  className="w-12 h-12 rounded-full object-cover border border-black/20 editorial-img-contrast transition-all duration-200"
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

            <div className="pt-1">
              <button
                onClick={() => onSelectArticle(primaryEssay.slug)}
                className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
              >
                مطالعه متن کامل جستار ({primaryEssay.readTime}) ←
              </button>
            </div>
          </article>

          {/* Secondary Opinion Pieces (col-span-5) with RTL divider hairline-r */}
          <div className="lg:col-span-5 lg:hairline-r lg:pr-8 space-y-5">
            <div className="text-[11px] uppercase tracking-wider font-bold text-zinc-500 border-b border-zinc-200 pb-1">
              ستون یادداشت‌ها و بررسی‌های انتقادی
            </div>

            <div className="space-y-4 divide-y divide-zinc-200">
              {secondaryEssays.map((essay, i) => (
                <article
                  key={essay.id}
                  className={`${i > 0 ? 'pt-4' : ''} space-y-1.5`}
                >
                  <div className="flex items-center gap-2 text-xs font-sans-editorial text-zinc-500">
                    <span className="font-bold text-black">{essay.author.name}</span>
                    <span>•</span>
                    <span className="uppercase text-[10px] tracking-wider">{essay.category}</span>
                  </div>

                  <h5
                    onClick={() => onSelectArticle(essay.slug)}
                    className="font-headline font-bold text-base leading-snug text-black cursor-pointer hover:underline underline-offset-2"
                  >
                    {essay.title}
                  </h5>

                  <p className="font-article-body text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {essay.standfirst}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
