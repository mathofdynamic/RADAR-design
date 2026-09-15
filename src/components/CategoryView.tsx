import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Article, CategoryInfo } from '../types';
import { Bookmark, Clock, ArrowRight } from 'lucide-react';

interface CategoryViewProps {
  category: CategoryInfo;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onBack: () => void;
  onToggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  articles,
  onSelectArticle,
  onBack,
  onToggleSave,
  isSaved,
}) => {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const dominantStory = articles[0];
  const secondaryStories = articles.slice(1, 3);
  const feedStories = articles.slice(3);

  const displayedFeed = feedStories.slice(0, page * pageSize);
  const hasMore = displayedFeed.length < feedStories.length;

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 font-sans-editorial"
      dir="rtl"
    >
      {/* Category Header */}
      <div className="border-b-4 border-black pb-4 space-y-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs uppercase font-bold text-zinc-600 hover:text-black cursor-pointer mb-2"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>بازگشت به صفحه نخست</span>
        </button>

        <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-black">
          {category.name}
        </h1>
        <p className="font-article-body text-base sm:text-lg text-zinc-700 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Dominant Story in Section (Full Authentic Colors) */}
      {dominantStory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 hairline-b pb-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-500">
              <span className="font-bold text-black">{dominantStory.subcategory}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                {dominantStory.readTime}
              </span>
            </div>

            <h2
              onClick={() => onSelectArticle(dominantStory.slug)}
              className="font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-black cursor-pointer hover:underline underline-offset-4 leading-tight"
            >
              {dominantStory.title}
            </h2>

            <p className="font-article-body text-base sm:text-lg text-zinc-800 leading-relaxed">
              {dominantStory.standfirst}
            </p>

            <div className="text-xs text-zinc-600">
              به قلم {dominantStory.author.name} — {dominantStory.author.location || 'تحریریه رادار'}
            </div>
          </div>

          <div className="lg:col-span-5">
            {dominantStory.imageUrl && (
              <figure
                onClick={() => onSelectArticle(dominantStory.slug)}
                className="cursor-pointer group"
              >
                <div className="overflow-hidden bg-zinc-100 border border-black/10">
                  <img
                    src={dominantStory.imageUrl}
                    alt={dominantStory.title}
                    className="w-full h-auto aspect-[16/10] object-cover editorial-img-contrast transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </div>
                {dominantStory.imageCaption && (
                  <figcaption className="mt-2 text-xs text-zinc-600">
                    {dominantStory.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}
          </div>
        </div>
      )}

      {/* Secondary split stories */}
      {secondaryStories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 hairline-b pb-10">
          {secondaryStories.map((story) => (
            <article key={story.id} className="space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-600">
                <span className="font-bold text-black">{story.subcategory}</span>
                <span>{story.readTime}</span>
              </div>
              <h3
                onClick={() => onSelectArticle(story.slug)}
                className="font-headline font-bold text-2xl text-black cursor-pointer hover:underline underline-offset-2 leading-snug"
              >
                {story.title}
              </h3>
              <p className="font-article-body text-sm text-zinc-700 leading-relaxed line-clamp-3">
                {story.standfirst}
              </p>
              <div className="text-xs text-zinc-600">
                نویسنده: {story.author.name}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Chronological Section Feed */}
      <div className="space-y-4">
        <h3 className="font-headline font-bold text-lg uppercase tracking-wider text-black border-b border-black pb-1">
          بایگانی و مخابره‌های تکمیلی سرویس {category.name}
        </h3>

        <div className="divide-y divide-zinc-200">
          {displayedFeed.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col sm:flex-row justify-between items-baseline gap-4 group"
            >
              <div className="flex-1 space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                  {item.subcategory} • {formatDate(item.publishedAt)}
                </div>
                <h4
                  onClick={() => onSelectArticle(item.slug)}
                  className="font-headline font-bold text-lg text-black group-hover:underline cursor-pointer"
                >
                  {item.title}
                </h4>
                <p className="font-article-body text-xs text-zinc-600 line-clamp-2">
                  {item.standfirst}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs">
                <span className="text-zinc-500">{item.readTime}</span>
                <button
                  onClick={() => onToggleSave(item.id)}
                  className="hover:text-black cursor-pointer"
                  title="ذخیره"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isSaved(item.id) ? 'fill-black text-black' : 'text-zinc-600'}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center pt-6">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-2.5 border border-black text-xs uppercase font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              بارگذاری گزارش‌های بیشتر
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
