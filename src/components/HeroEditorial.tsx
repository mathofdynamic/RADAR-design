import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';
import { Bookmark } from 'lucide-react';

interface HeroEditorialProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onToggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const HeroEditorial: React.FC<HeroEditorialProps> = ({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
  onToggleSave,
  isSaved,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 sm:py-7"
      dir="rtl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Dominant Lead Story (8 cols) */}
        <article className="lg:col-span-8 space-y-4">
          {/* Metadata & Desk Label (No decorative clock icon) */}
          <div className="flex items-center justify-between text-xs text-zinc-600 font-sans-editorial border-b border-zinc-200 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-black uppercase tracking-wider text-black">
                {leadArticle.category}
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-zinc-600">{leadArticle.subcategory}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">{leadArticle.readTime}</span>
              <button
                onClick={() => onToggleSave(leadArticle.id)}
                className="hover:text-black transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
                title="ذخیره در فهرست مطالعه"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isSaved(leadArticle.id) ? 'fill-black text-black' : 'text-zinc-400'
                  }`}
                />
                <span className="hidden sm:inline">
                  {isSaved(leadArticle.id) ? 'ذخیره‌شده' : 'ذخیره'}
                </span>
              </button>
            </div>
          </div>

          {/* Monumental Lead Headline */}
          <h2
            onClick={() => onSelectArticle(leadArticle.slug)}
            className="font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] text-black leading-[1.12] tracking-tight cursor-pointer hover:underline underline-offset-4 decoration-2"
          >
            {leadArticle.title}
          </h2>

          {/* Standfirst / Summary */}
          <p className="font-article-body text-base sm:text-lg text-zinc-800 leading-relaxed font-normal">
            {leadArticle.standfirst}
          </p>

          {/* Author Byline */}
          <div className="text-xs font-sans-editorial text-zinc-600 pt-0.5">
            <span>به قلم </span>
            <strong className="text-black font-bold">{leadArticle.author.name}</strong>
            <span className="text-zinc-500"> — {leadArticle.author.role}</span>
            {leadArticle.author.location && (
              <span className="text-zinc-500 font-normal"> ({leadArticle.author.location})</span>
            )}
          </div>

          {/* Dominant Editorial Photography (Black-and-White art direction, revealing natural color on hover) */}
          {leadArticle.imageUrl && (
            <figure
              onClick={() => onSelectArticle(leadArticle.slug)}
              className="pt-2 cursor-pointer group"
            >
              <div className="overflow-hidden bg-zinc-100 border border-black/10">
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  className="w-full h-auto aspect-[16/9] object-cover editorial-lead-img transition-all duration-200"
                  loading="eager"
                />
              </div>
              {leadArticle.imageCaption && (
                <figcaption className="mt-2 text-xs text-zinc-600 font-sans-editorial flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 leading-normal">
                  <span>{leadArticle.imageCaption}</span>
                  {leadArticle.imageCredit && (
                    <span className="shrink-0 text-zinc-500 text-[10px] tracking-wider uppercase font-sans-editorial">
                      {leadArticle.imageCredit}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          )}

          {/* Key Executive Findings Callout (Clean right rule, no heavy background box) */}
          {leadArticle.keyTakeaways && leadArticle.keyTakeaways.length > 0 && (
            <div className="my-5 border-r-2 border-black pr-4 py-1 space-y-1.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-black">
                محورهای کلیدی راهبردی:
              </div>
              <ul className="space-y-1 text-xs font-sans-editorial text-zinc-800 list-disc list-inside">
                {leadArticle.keyTakeaways.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="text-zinc-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Secondary Editorial Column (4 cols) with RTL divider hairline-r */}
        <aside className="lg:col-span-4 lg:hairline-r lg:pr-8 space-y-5">
          <div className="border-b-2 border-black pb-1 mb-3 flex items-baseline justify-between">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-black">
              گزارش‌های اصلی و تحلیل‌های تکمیلی
            </h3>
            <span className="text-[10px] font-sans-editorial uppercase text-zinc-500">
              ویژه تحریریه
            </span>
          </div>

          <div className="space-y-5 divide-y divide-zinc-200">
            {secondaryArticles.map((article, idx) => (
              <article
                key={article.id}
                className={`${idx > 0 ? 'pt-5' : ''} space-y-2 group`}
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{article.category}</span>
                  <div className="flex items-center gap-2">
                    <span>{article.readTime}</span>
                    <button
                      onClick={() => onToggleSave(article.id)}
                      className="hover:text-black cursor-pointer"
                      title="ذخیره در فهرست"
                    >
                      <Bookmark
                        className={`w-3 h-3 ${
                          isSaved(article.id) ? 'fill-black text-black' : 'text-zinc-400'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h4
                  onClick={() => onSelectArticle(article.slug)}
                  className="font-headline font-bold text-lg text-black leading-snug cursor-pointer group-hover:underline underline-offset-2"
                >
                  {article.title}
                </h4>

                <p className="font-article-body text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-3">
                  {article.standfirst}
                </p>

                {article.imageUrl && (
                  <div
                    onClick={() => onSelectArticle(article.slug)}
                    className="pt-1 cursor-pointer overflow-hidden border border-black/10"
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-28 object-cover editorial-img-contrast transition-all duration-200"
                    />
                  </div>
                )}

                <div className="text-[11px] text-zinc-500 font-sans-editorial pt-0.5">
                  به قلم {article.author.name}
                  {article.author.location ? ` — ${article.author.location}` : ''}
                </div>
              </article>
            ))}
          </div>

          {/* Editorial Integrity Statement (Clean typographic rule, no gray box) */}
          <div className="pt-4 border-t border-zinc-200 text-xs font-sans-editorial space-y-1">
            <div className="font-bold text-black uppercase tracking-wider text-[10px]">
              اصول تحریریه رادار
            </div>
            <p className="text-zinc-600 leading-relaxed text-[11px]">
              کلیه گزارش‌های «رادار» بر پایه اسناد ثبتی، مصاحبه‌های مستقیم با منابع دست‌اول و انطباق با منشور بی‌طرفی ژورنالیسم تحقیقی منتشر می‌گردد.
            </p>
          </div>
        </aside>
      </div>
    </motion.section>
  );
};
