import React from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';
import { Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';

interface SavedArticlesViewProps {
  savedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveSave: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
}

export const SavedArticlesView: React.FC<SavedArticlesViewProps> = ({
  savedArticles,
  onSelectArticle,
  onRemoveSave,
  onClearAll,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans-editorial"
      dir="rtl"
    >
      <div className="space-y-4 border-b-2 border-black pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold uppercase text-zinc-600 hover:text-black cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>بازگشت به صفحه نخست</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
            فهرست مطالعه شخصی
          </h1>

          {savedArticles.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs tracking-wider text-zinc-500 hover:text-black underline cursor-pointer"
            >
              پاکسازی کل فهرست
            </button>
          )}
        </div>

        <p className="font-article-body text-sm text-zinc-600">
          گزارش‌ها و پرونده‌های نشانک‌گذاری‌شده برای مطالعه عمیق یا ارجاع در پژوهش‌های آتی.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <Bookmark className="w-8 h-8 mx-auto text-zinc-300" />
          <h3 className="font-headline font-bold text-xl text-black">
            فهرست مطالعه شما خالی است.
          </h3>
          <p className="font-article-body text-sm text-zinc-600 max-w-sm mx-auto">
            با کلیک روی نشانک هر گزارش، تحلیل یا پرونده تحقیقی، آن را به این بخش اضافه کنید.
          </p>
          <div className="pt-4">
            <button
              onClick={onBack}
              className="px-6 py-2 bg-black text-white text-xs uppercase font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              مرور صفحه نخست امروز
            </button>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200">
          {savedArticles.map((article) => (
            <div
              key={article.id}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group"
            >
              <div className="flex-1 space-y-1.5">
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                  {article.category} • {article.subcategory}
                </div>
                <h2
                  onClick={() => onSelectArticle(article.slug)}
                  className="font-headline font-bold text-xl sm:text-2xl text-black group-hover:underline cursor-pointer leading-snug"
                >
                  {article.title}
                </h2>
                <p className="font-article-body text-xs sm:text-sm text-zinc-700 line-clamp-2">
                  {article.standfirst}
                </p>
                <div className="text-xs text-zinc-500 pt-1">
                  به قلم {article.author.name} • {article.readTime}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => onSelectArticle(article.slug)}
                  className="px-4 py-1.5 border border-black text-xs uppercase font-bold hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  مطالعه
                </button>
                <button
                  onClick={() => onRemoveSave(article.id)}
                  className="p-1.5 text-zinc-400 hover:text-black transition-colors cursor-pointer"
                  title="حذف از فهرست"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
