import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Article } from '../types';
import { Bookmark, Share2, Printer, ArrowRight, Check } from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onBack: () => void;
  onToggleSave: (id: string) => void;
  isSaved: boolean;
  onOpenIntelligenceForArticle: (article: Article) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  relatedArticles,
  onSelectArticle,
  onBack,
  onToggleSave,
  isSaved,
  onOpenIntelligenceForArticle,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const fontClass =
    fontSize === 'huge'
      ? 'text-xl sm:text-2xl leading-[2.2]'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-[2]'
      : 'text-base sm:text-lg leading-[1.9]';

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full bg-white text-black py-5 sm:py-8 font-sans-editorial"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-7">
        {/* Navigation & Utilities Row (Clean, subtle dividers) */}
        <div className="flex items-center justify-between hairline-b pb-2.5 text-xs">
          <button
            id="article-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-zinc-600 hover:text-black font-semibold cursor-pointer transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>بازگشت به صفحه نخست</span>
          </button>

          <div className="flex items-center gap-4">
            {/* Font size adjuster */}
            <div className="flex items-center gap-1 border border-zinc-200 px-2 py-0.5 text-[11px]">
              <span className="text-zinc-500 ml-1">اندازه متن:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1 cursor-pointer ${
                  fontSize === 'normal' ? 'font-bold text-black underline' : 'text-zinc-500'
                }`}
              >
                پایه
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1 cursor-pointer ${
                  fontSize === 'large' ? 'font-bold text-black underline' : 'text-zinc-500'
                }`}
              >
                متوسط
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-1 cursor-pointer ${
                  fontSize === 'huge' ? 'font-bold text-black underline' : 'text-zinc-500'
                }`}
              >
                بزرگ
              </button>
            </div>

            {/* Save Bookmark */}
            <button
              id="article-save-btn"
              onClick={() => onToggleSave(article.id)}
              className="flex items-center gap-1 text-zinc-700 hover:text-black cursor-pointer transition-colors"
              title={isSaved ? 'حذف از فهرست مطالعه' : 'ذخیره در فهرست مطالعه'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black text-black' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'ذخیره‌شده' : 'ذخیره'}</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-zinc-700 hover:text-black cursor-pointer transition-colors"
              title="اشتراک‌گذاری"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'کپی شد' : 'اشتراک'}</span>
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1 text-zinc-700 hover:text-black cursor-pointer transition-colors"
              title="چاپ نسخه کاغذی"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>چاپ</span>
            </button>

            {/* Intelligence Bureau Analysis (Text-only, no sparkle icon) */}
            <button
              onClick={() => onOpenIntelligenceForArticle(article)}
              className="bg-black text-white hover:bg-zinc-800 px-2.5 py-1 text-[11px] font-semibold cursor-pointer transition-colors"
              title="میز واکاوی تحلیلی هوشمند"
            >
              تحلیل هوشمند
            </button>
          </div>
        </div>

        {/* Category & Section */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
          <span className="font-bold text-black">{article.category}</span>
          <span>/</span>
          <span>{article.subcategory}</span>
        </div>

        {/* Monumental Editorial Headline */}
        <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-black leading-[1.14] tracking-tight">
          {article.title}
        </h1>

        {/* Standfirst / Summary with RTL border-r */}
        <div className="font-article-body text-lg sm:text-xl text-zinc-800 leading-relaxed border-r-2 border-black pr-4 py-1">
          {article.standfirst}
        </div>

        {/* Byline & Metadata Block (Icon-free, clean typography) */}
        <div className="hairline-t hairline-b py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-3">
            {article.author.avatarUrl && (
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-black/20 editorial-img-contrast transition-all duration-200"
              />
            )}
            <div>
              <div className="font-bold text-black text-sm">{article.author.name}</div>
              <div className="text-zinc-500 text-[11px]">
                {article.author.role} {article.author.location ? `— ${article.author.location}` : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Hero Documentary Media (Black & White art direction, subtle natural hover) */}
        {article.imageUrl && (
          <figure className="space-y-2">
            <div className="overflow-hidden bg-zinc-100 border border-black/10">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto aspect-[16/10] object-cover editorial-lead-img transition-all duration-200"
                loading="eager"
              />
            </div>
            {article.imageCaption && (
              <figcaption className="text-xs text-zinc-600 flex justify-between gap-4 leading-relaxed pt-1">
                <span>{article.imageCaption}</span>
                {article.imageCredit && (
                  <span className="shrink-0 text-zinc-500 text-[10px] font-sans-editorial uppercase tracking-wider">
                    {article.imageCredit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Key Takeaways Callout (Editorial rule, no heavy box) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="my-5 border-r-2 border-black pr-4 py-1 space-y-2">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-black">
              یافته‌های کلیدی و نتایج راهبردی:
            </h3>
            <ul className="space-y-1 text-xs text-zinc-800 list-disc list-inside">
              {article.keyTakeaways.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-black font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Primary Article Body */}
        <div className={`space-y-6 font-article-body text-zinc-900 ${fontClass}`}>
          {article.body.map((para, index) => (
            <p
              key={index}
              className={index === 0 ? 'editorial-lead-dropcap' : ''}
            >
              {para}
            </p>
          ))}

          {/* Pull Quote */}
          {article.pullQuote && (
            <div className="my-8 py-4 border-t-2 border-b-2 border-black">
              <blockquote className="font-headline font-black text-2xl sm:text-3xl text-black leading-snug text-center px-4 sm:px-8">
                «{article.pullQuote}»
              </blockquote>
              {article.pullQuoteSpeaker && (
                <div className="text-center text-xs uppercase tracking-wider text-zinc-600 mt-2 font-sans-editorial">
                  — {article.pullQuoteSpeaker}
                </div>
              )}
            </div>
          )}

          {/* Subsections */}
          {article.subsections &&
            article.subsections.map((sub, sIdx) => (
              <div key={sIdx} className="space-y-3 pt-3">
                <h2 className="font-headline font-bold text-2xl text-black tracking-tight">
                  {sub.heading}
                </h2>
                {sub.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            ))}
        </div>

        {/* Timeline Events if present (Clean editorial vertical list) */}
        {article.timeline && article.timeline.length > 0 && (
          <div className="my-6 border-r-2 border-black pr-4 py-2 space-y-3">
            <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-black">
              گاه‌شمار رویدادها
            </h3>
            <div className="space-y-3 divide-y divide-zinc-200">
              {article.timeline.map((evt, idx) => (
                <div key={idx} className={`${idx > 0 ? 'pt-2.5' : ''} flex gap-4`}>
                  <div className="w-24 shrink-0 font-sans-editorial text-xs font-bold text-black">
                    {evt.timeOrDate}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-black">{evt.title}</h4>
                    <p className="text-xs text-zinc-600 mt-0.5">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attached Sources & Referenced Documents */}
        {article.sourcesAndDocuments && article.sourcesAndDocuments.length > 0 && (
          <div className="hairline-t pt-5 space-y-1.5 text-xs text-zinc-600">
            <div className="font-bold text-[11px] text-black">
              اسناد، معاهدات و مراجع قانونی استنادشده در این گزارش:
            </div>
            <ul className="space-y-0.5 pr-4 list-disc text-zinc-700">
              {article.sourcesAndDocuments.map((doc, idx) => (
                <li key={idx} className="leading-normal">{doc}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Deep Intelligence Callout (Clean double rules, no gray SaaS card) */}
        <div className="border-t-2 border-b-2 border-black py-5 my-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-headline font-bold text-base text-black">
              میز واکاوی تحلیلی و سناریوسازی رادار
            </h4>
            <p className="text-xs text-zinc-700">
              استعلام سناریوها و سنجش پیامدهای ژئوپلیتیک و مالی این گزارش توسط موتور تحلیلی تحریریه.
            </p>
          </div>
          <button
            onClick={() => onOpenIntelligenceForArticle(article)}
            className="px-4 py-2 bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-colors"
          >
            آغاز واکاوی تحلیلی
          </button>
        </div>

        {/* Related Stories */}
        {relatedArticles.length > 0 && (
          <div className="hairline-t pt-8 space-y-5">
            <h3 className="font-headline font-bold text-xl uppercase tracking-wider text-black">
              گزارش‌ها و تحلیل‌های مرتبط
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel.slug)}
                  className="space-y-2 group cursor-pointer border-t border-zinc-200 pt-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                    {rel.category} • {rel.readTime}
                  </div>
                  <h4 className="font-headline font-bold text-sm text-black group-hover:underline underline-offset-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="font-article-body text-xs text-zinc-600 line-clamp-2">
                    {rel.standfirst}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
};
