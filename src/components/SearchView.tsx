import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Article, CategorySlug } from '../types';
import { Search, Bookmark, Clock, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface SearchViewProps {
  articles: Article[];
  initialQuery?: string;
  onSelectArticle: (slug: string) => void;
  onBack: () => void;
  onToggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const SearchView: React.FC<SearchViewProps> = ({
  articles,
  initialQuery = '',
  onSelectArticle,
  onBack,
  onToggleSave,
  isSaved,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'relevance'>('recent');

  const filteredArticles = useMemo(() => {
    const q = query.toLowerCase().trim();
    return articles
      .filter((article) => {
        const matchesCategory =
          selectedCategory === 'all' || article.category === selectedCategory;
        if (!matchesCategory) return false;

        if (!q) return true;
        const inTitle = article.title.toLowerCase().includes(q);
        const inStandfirst = article.standfirst.toLowerCase().includes(q);
        const inAuthor = article.author.name.toLowerCase().includes(q);
        const inBody = article.body.some((p) => p.toLowerCase().includes(q));
        return inTitle || inStandfirst || inAuthor || inBody;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        if (!q) return 0;
        const scoreA = (a.title.toLowerCase().includes(q) ? 3 : 0) + (a.standfirst.toLowerCase().includes(q) ? 1 : 0);
        const scoreB = (b.title.toLowerCase().includes(q) ? 3 : 0) + (b.standfirst.toLowerCase().includes(q) ? 1 : 0);
        return scoreB - scoreA;
      });
  }, [articles, query, selectedCategory, sortBy]);

  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={i} className="bg-black text-white px-1 font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

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
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-8 font-sans-editorial"
      dir="rtl"
    >
      {/* Header and Back navigation */}
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs uppercase font-bold text-zinc-600 hover:text-black cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>بازگشت به نشریه</span>
        </button>

        <h1 className="font-headline font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
          جست‌وجو در بایگانی و اسناد رادار
        </h1>
        <p className="font-article-body text-sm text-zinc-600">
          کاوش در آرشیو گزارش‌ها، پرونده‌های تحقیقی، پیمان‌های بین‌المللی و اسناد ثبتی.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="border-b-2 border-black pb-4 space-y-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute right-3 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="عبارت، نام کشور، مؤلف یا موضوع مورد نظر را جست‌وجو کنید..."
            className="w-full pr-11 pl-16 py-3 text-base sm:text-lg border border-black focus:outline-none bg-white font-sans text-right"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-3 text-xs text-zinc-500 hover:text-black font-semibold cursor-pointer"
            >
              پاک‌کردن
            </button>
          )}
        </div>

        {/* Filters and sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 font-semibold ml-1">فیلتر سرویس:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 border text-xs cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-black text-white border-black font-bold'
                  : 'border-zinc-300 text-zinc-700 hover:border-black'
              }`}
            >
              همه بخش‌ها
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-2.5 py-1 border text-xs cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-black text-white border-black font-bold'
                    : 'border-zinc-300 text-zinc-700 hover:border-black'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-semibold">ترتیب نمایش:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'relevance')}
              className="border border-zinc-300 px-2.5 py-1 text-xs font-sans focus:outline-none bg-white cursor-pointer"
            >
              <option value="recent">تازه‌ترین‌ها</option>
              <option value="relevance">بیشترین تطابق مضمونی</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results summary counter */}
      <div className="text-xs text-zinc-500 flex justify-between items-center">
        <span>
          تعداد <strong className="text-black">{filteredArticles.length}</strong> رکورد مطابقت‌یافته
          {query ? ` برای «${query}»` : ''}
        </span>
        <span className="text-[11px] font-sans-editorial">شاخص آرشیو تایید شد</span>
      </div>

      {/* Results List */}
      <div className="divide-y divide-zinc-200">
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <h3 className="font-headline font-bold text-xl text-black">
              هیچ رکوردی منطبق با این عبارت یافت نشد.
            </h3>
            <p className="font-article-body text-sm text-zinc-600">
              کلیدواژه‌های خود را تغییر داده یا فیلترهای سرویس را بردارید.
            </p>
          </div>
        ) : (
          filteredArticles.map((item) => (
            <article key={item.id} className="py-5 space-y-1.5 group">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-black">{item.category}</span>
                  <span>/</span>
                  <span>{item.subcategory}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    {item.readTime}
                  </span>
                  <button
                    onClick={() => onToggleSave(item.id)}
                    className="hover:text-black cursor-pointer"
                  >
                    <Bookmark
                      className={`w-3 h-3 ${isSaved(item.id) ? 'fill-black text-black' : 'text-zinc-600'}`}
                    />
                  </button>
                </div>
              </div>

              <h2
                onClick={() => onSelectArticle(item.slug)}
                className="font-headline font-bold text-xl sm:text-2xl text-black cursor-pointer group-hover:underline leading-snug"
              >
                {highlightMatch(item.title, query)}
              </h2>

              <p className="font-article-body text-sm text-zinc-700 leading-relaxed line-clamp-2">
                {highlightMatch(item.standfirst, query)}
              </p>

              <div className="text-xs text-zinc-500 pt-1">
                نویسنده: {highlightMatch(item.author.name, query)} — {formatDate(item.publishedAt)}
              </div>
            </article>
          ))
        )}
      </div>
    </motion.div>
  );
};
