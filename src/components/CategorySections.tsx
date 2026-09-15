import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Article, CategorySlug } from '../types';
import { Bookmark } from 'lucide-react';

interface CategorySectionsProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onSelectCategory: (category: CategorySlug) => void;
  onToggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const CategorySections: React.FC<CategorySectionsProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
  onToggleSave,
  isSaved,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const investigations = articles.filter((a) => a.category === 'investigations');
  const businessArticles = articles.filter((a) => a.category === 'business');
  const techAndScience = articles.filter((a) => a.category === 'technology' || a.category === 'science');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12 font-sans-editorial" dir="rtl">
      {/* SECTION 1: Deep Investigations & Confidential Dossiers (Slow reveal with rule expansion and image reveal) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
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
                پرونده‌های تحقیقی و اسناد افشاگری
              </h3>
              <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
                کاوش در قراردادهای پنهان، فسادهای ساختاری و سوءاستفاده‌های فرامرزی
              </span>
            </motion.div>
            <button
              onClick={() => onSelectCategory('investigations')}
              className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
            >
              آرشیو پرونده‌ها ←
            </button>
          </div>

          {/* Expanding Rule */}
          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-[2px] bg-black origin-right w-full"
          />
        </div>

        {investigations.map((item) => (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b-2 border-black pb-8 pt-2"
          >
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-500 font-sans-editorial">
                <span className="font-black text-black">
                  گزارش تحقیقی اختصاصی
                </span>
                <span>•</span>
                <span>{item.readTime}</span>
                <span>•</span>
                <span>{item.author.location || 'دفتر پژوهش'}</span>
              </div>

              <h4
                onClick={() => onSelectArticle(item.slug)}
                className="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-tight cursor-pointer hover:underline underline-offset-4"
              >
                {item.title}
              </h4>

              <p className="font-article-body text-base text-zinc-800 leading-relaxed">
                {item.standfirst}
              </p>

              {/* Verified Sources & Documents Attached */}
              {item.sourcesAndDocuments && (
                <div className="my-4 border-r-2 border-black pr-4 py-1 text-xs font-sans-editorial text-zinc-700 space-y-1">
                  <div className="font-bold text-black text-[11px]">
                    اسناد و شواهد قانونی ضمیمه‌شده به این پرونده:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px] text-zinc-600">
                    {item.sourcesAndDocuments.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex items-center gap-4 text-xs font-sans-editorial">
                <button
                  onClick={() => onSelectArticle(item.slug)}
                  className="px-4 py-1.5 bg-black text-white text-xs uppercase font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  مطالعه پرونده و اسناد
                </button>
                <button
                  onClick={() => onToggleSave(item.id)}
                  className="hover:text-black cursor-pointer flex items-center gap-1.5"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(item.id) ? 'fill-black text-black' : 'text-zinc-500'
                    }`}
                  />
                  <span>{isSaved(item.id) ? 'ذخیره‌شده' : 'ذخیره در فهرست'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4">
              {item.imageUrl && (
                <figure
                  onClick={() => onSelectArticle(item.slug)}
                  className="cursor-pointer group space-y-2"
                >
                  <div className="overflow-hidden bg-zinc-100 border border-black/10 aspect-[16/11]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover editorial-img-contrast"
                      loading="lazy"
                    />
                  </div>
                  {item.imageCaption && (
                    <figcaption className="text-xs text-zinc-500 font-sans-editorial leading-normal">
                      {item.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* SECTION 2: Sovereign Capital & Macroeconomics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
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
                اقتصاد کلان و سرمایه حاکمیتی
              </h3>
              <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
                اوراق بدهی، نرخ بهره بانک‌های مرکزی، بازارهای انرژی و زنجیره‌های تأمین
              </span>
            </motion.div>
            <button
              onClick={() => onSelectCategory('business')}
              className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
            >
              دیدن همه گزارش‌های اقتصادی ←
            </button>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-[2px] bg-black origin-right w-full"
          />
        </div>

        {/* Stories in 3-column editorial grid with 80ms child stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessArticles.slice(0, 3).map((item, idx) => (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{item.subcategory}</span>
                  <span>{item.readTime}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(item.slug)}
                  className="font-headline font-bold text-lg sm:text-xl text-black cursor-pointer group-hover:underline underline-offset-2 leading-snug"
                >
                  {item.title}
                </h4>

                <p className="font-article-body text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-3">
                  {item.standfirst}
                </p>
              </div>

              {item.imageUrl && (
                <div
                  onClick={() => onSelectArticle(item.slug)}
                  className="overflow-hidden bg-zinc-100 border border-black/10 cursor-pointer aspect-[16/10] mt-2"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover editorial-img-contrast"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-zinc-500 font-sans-editorial pt-2 border-t border-zinc-100">
                <span>به قلم {item.author.name}</span>
                <button
                  onClick={() => onToggleSave(item.id)}
                  className="hover:text-black cursor-pointer"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(item.id) ? 'fill-black text-black' : 'text-zinc-400'
                    }`}
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* SECTION 3: Strategic Tech & Scientific Frontiers */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 pt-4 border-t border-zinc-200"
      >
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
                فناوری‌های راهبردی، کابل‌های زیردریایی و مرزهای دانش
              </h3>
              <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
                زیرساخت‌های محاسباتی، ژئوپلیتیک نیمه‌رساناها و کاوش‌های ژرفاقیانوسی
              </span>
            </motion.div>
            <button
              onClick={() => onSelectCategory('technology')}
              className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
            >
              آرشیو دانش و فناوری ←
            </button>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="h-[2px] bg-black origin-right w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techAndScience.slice(0, 2).map((item, idx) => (
            <motion.article
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-5 group"
            >
              <div className="sm:col-span-7 space-y-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{item.category}</span>
                  <span>/</span>
                  <span>{item.subcategory}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(item.slug)}
                  className="font-headline font-bold text-lg text-black cursor-pointer group-hover:underline leading-snug"
                >
                  {item.title}
                </h4>

                <p className="font-article-body text-xs text-zinc-700 leading-relaxed line-clamp-3">
                  {item.standfirst}
                </p>

                <div className="text-[11px] text-zinc-500 font-sans-editorial pt-1">
                  به قلم {item.author.name} • {item.readTime}
                </div>
              </div>

              <div className="sm:col-span-5">
                {item.imageUrl && (
                  <div
                    onClick={() => onSelectArticle(item.slug)}
                    className="overflow-hidden bg-zinc-100 border border-black/10 cursor-pointer aspect-[16/11]"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover editorial-img-contrast"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
