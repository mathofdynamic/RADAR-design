import React from 'react';
import { motion } from 'motion/react';
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
  const investigations = articles.filter((a) => a.category === 'investigations');
  const businessArticles = articles.filter((a) => a.category === 'business');
  const techAndScience = articles.filter((a) => a.category === 'technology' || a.category === 'science');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-12 font-sans-editorial"
      dir="rtl"
    >
      {/* SECTION 1: Deep Investigations & Confidential Dossiers (Icon-free, clean editorial framing) */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between border-b-2 border-black pb-2">
          <div className="flex items-baseline gap-3">
            <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
              پرونده‌های تحقیقی و اسناد افشاگری
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              کاوش در قراردادهای پنهان، فسادهای ساختاری و سوءاستفاده‌های فرامرزی
            </span>
          </div>
          <button
            onClick={() => onSelectCategory('investigations')}
            className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
          >
            آرشیو پرونده‌ها ←
          </button>
        </div>

        {investigations.map((item) => (
          <div
            key={item.id}
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

              {/* Verified Sources & Documents Attached (Clean typographic rule, no box) */}
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
                  className="flex items-center gap-1 text-zinc-600 hover:text-black cursor-pointer"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(item.id) ? 'fill-black text-black' : 'text-zinc-400'
                    }`}
                  />
                  <span>{isSaved(item.id) ? 'ذخیره‌شده' : 'ذخیره در فهرست'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 lg:hairline-r lg:pr-8 flex flex-col justify-between space-y-4">
              {item.imageUrl && (
                <figure
                  onClick={() => onSelectArticle(item.slug)}
                  className="cursor-pointer group overflow-hidden border border-black/10"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-52 object-cover editorial-img-contrast transition-all duration-200"
                  />
                  {item.imageCaption && (
                    <figcaption className="p-2 text-[11px] text-zinc-600 font-sans-editorial border-t border-zinc-200">
                      {item.imageCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              <div className="pt-3 border-t border-zinc-200 text-xs font-sans-editorial space-y-1">
                <div className="font-bold text-black text-[11px]">سنجش اصالت اسناد:</div>
                <p className="text-zinc-600 text-[11px] leading-relaxed">
                  داده‌های مالیاتی و ممیزی‌های این پرونده با پایگاه‌های داده بازرگانی بین‌المللی مطابقت داده شده است.
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 2: Sovereign Finance & Strategic Energy Markets */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between border-b-2 border-black pb-2">
          <div className="flex items-baseline gap-3">
            <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
              اقتصاد و بازارهای راهبردی
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              معماری نرخ بهره، بدهی‌های حاکمیتی و دگرگونی‌های ساختار انرژی
            </span>
          </div>
          <button
            onClick={() => onSelectCategory('business')}
            className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
          >
            سرویس اقتصاد ←
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {businessArticles.slice(0, 3).map((art) => (
            <article key={art.id} className="space-y-3 flex flex-col justify-between border-t border-black pt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial">
                  <span className="font-bold text-black">{art.subcategory}</span>
                  <span>{art.readTime}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(art.slug)}
                  className="font-headline font-bold text-lg sm:text-xl text-black leading-snug cursor-pointer hover:underline underline-offset-2"
                >
                  {art.title}
                </h4>

                <p className="font-article-body text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-3">
                  {art.standfirst}
                </p>

                {art.metrics && art.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 my-2.5 py-2 border-y border-zinc-200">
                    {art.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[10px] text-zinc-500 font-sans-editorial">{m.label}</div>
                        <div className="font-headline font-bold text-sm text-black">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 text-[11px] text-zinc-500 font-sans-editorial border-t border-zinc-100 flex items-center justify-between">
                <span>به قلم {art.author.name}</span>
                <button
                  onClick={() => onToggleSave(art.id)}
                  className="hover:text-black cursor-pointer"
                  title="ذخیره"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(art.id) ? 'fill-black text-black' : 'text-zinc-400'
                    }`}
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: Deep Technology & Frontiers of Infrastructure */}
      <section className="space-y-5">
        <div className="flex items-baseline justify-between border-b-2 border-black pb-2">
          <div className="flex items-baseline gap-3">
            <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black">
              فناوری، محاسبات و مرزهای دانش
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              نیمه‌هادی‌ها، بستر اقیانوس‌ها، ژئوپلیتیک هوش مصنوعی و امنیت زیرساخت
            </span>
          </div>
          <button
            onClick={() => onSelectCategory('technology')}
            className="text-xs font-sans-editorial font-bold uppercase tracking-wider text-black hover:underline cursor-pointer"
          >
            سرویس فناوری ←
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techAndScience.slice(0, 2).map((item) => (
            <article
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 border-t border-black pt-4"
            >
              <div className="sm:col-span-7 space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-sans-editorial flex items-center gap-2">
                  <span className="font-bold text-black">{item.subcategory}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(item.slug)}
                  className="font-headline font-bold text-lg sm:text-xl text-black leading-snug cursor-pointer hover:underline underline-offset-2"
                >
                  {item.title}
                </h4>

                <p className="font-article-body text-xs sm:text-sm text-zinc-700 leading-relaxed line-clamp-3">
                  {item.standfirst}
                </p>

                <div className="text-[11px] text-zinc-500 font-sans-editorial pt-1">
                  به قلم {item.author.name} — {item.author.location || 'دفتر پژوهش'}
                </div>
              </div>

              <div className="sm:col-span-5">
                {item.imageUrl && (
                  <div
                    onClick={() => onSelectArticle(item.slug)}
                    className="cursor-pointer overflow-hidden border border-black/10 h-36 bg-zinc-100"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover editorial-img-contrast transition-all duration-200"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
