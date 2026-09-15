import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Brain, Check, AlertCircle } from 'lucide-react';
import { Article } from '../types';

interface EditorialIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentArticle?: Article;
}

export const EditorialIntelligenceModal: React.FC<EditorialIntelligenceModalProps> = ({
  isOpen,
  onClose,
  currentArticle,
}) => {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<'investigative' | 'macroeconomic' | 'geopolitical'>('geopolitical');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.1-pro-preview');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const defaultSuggestions = [
    'تحلیل پیامدهای ثانویه اقتصادی در صورت یک‌جانبه ماندن عوارض گذرگاه قطب شمال',
    'ارزیابی ریسک‌های نکول حاکمیتی در چرخه سررسید بدهی‌های ۷.۲ تریلیون دلاری',
    'نقشه‌برداری از گلوگاه‌های ژئوپلیتیک اتصال کابل‌های دریای سرخ به قطب‌های پردازش ابری',
    'بررسی رویه‌های حقوقی حاکمیت زیست‌محیطی تحت ماده ۲۳۴ کنوانسیون حقوق دریاها',
  ];

  const handleGenerate = async (queryToRun?: string) => {
    const activeQuery = queryToRun || query;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/editorial-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: activeQuery,
          articleContext: currentArticle
            ? `عنوان گزارش: ${currentArticle.title}\nچکیده: ${currentArticle.standfirst}\nبخش‌هایی از متن: ${currentArticle.body.slice(0, 2).join('\n')}`
            : undefined,
          scope,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'خطا در برقراری ارتباط با موتور تحلیلی');
      }

      setResult(data.synthesis);
      if (data.model) {
        setModelUsed(data.model);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'خطایی در جریان واکاوی تحلیلی رخ داد.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="bg-white border-2 border-black w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl font-sans-editorial"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-black text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-zinc-300" />
            <div>
              <h3 className="font-headline font-bold text-lg sm:text-xl text-white tracking-tight">
                رادار — میز واکاوی تحلیلی و استراتژیک
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans-editorial">
                سنتز عمیق تحریریه • موتور: gemini-3.1-pro-preview (با استدلال تحلیلی عمیق)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 cursor-pointer transition-colors"
            title="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-black">
          {currentArticle && (
            <div className="p-3 bg-zinc-100 border-r-2 border-black text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-zinc-500">
                زمینه پژوهشی فعال:
              </span>
              <div className="font-headline font-bold text-black text-sm truncate">
                {currentArticle.title}
              </div>
            </div>
          )}

          {/* Prompt input & suggested templates */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-black">
              پرسش تحلیلی یا فرضیه استراتژیک:
            </label>
            <div className="flex gap-2">
              <textarea
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="پرسش تحلیلی خود را وارد کنید (مثلاً: «سناریوهای محتمل تنش نظامی در آبراهه شمالی و مقایسه هزینه حمل با مسیر سوئز را بررسی کن»)..."
                className="w-full p-3 text-xs sm:text-sm border border-black focus:outline-none bg-white font-sans resize-none text-right"
              />
            </div>

            {/* Scope selection */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 font-bold uppercase text-[10px]">افق بررسی:</span>
                {(
                  [
                    { id: 'geopolitical', label: 'ژئوپلیتیک و امنیت بین‌الملل' },
                    { id: 'macroeconomic', label: 'اقتصاد کلان و سرمایه حاکمیتی' },
                    { id: 'investigative', label: 'ژورنالیسم تحقیقی و راستی‌آزمایی' },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScope(s.id)}
                    className={`px-2.5 py-1 border text-xs cursor-pointer ${
                      scope === s.id
                        ? 'bg-black text-white border-black font-bold'
                        : 'border-zinc-300 text-zinc-700 hover:border-black'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={loading || !query.trim()}
                className="px-5 py-2 bg-black text-white hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loading ? 'در حال نگارش و تدوین سنتز...' : 'تولید تحلیل راهبردی'}</span>
              </button>
            </div>
          </div>

          {/* Quick preset suggestions */}
          {!result && !loading && (
            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                پیشنهادهای استعلام تحریریه:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {defaultSuggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(sug);
                      handleGenerate(sug);
                    }}
                    className="text-right p-2.5 bg-zinc-50 border border-zinc-200 hover:border-black hover:bg-zinc-100 transition-colors cursor-pointer text-zinc-800"
                  >
                    «{sug}»
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-zinc-100 border border-black text-xs text-black flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">خطا در فرآیند استعلام:</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Result Output Display */}
          {result && (
            <div className="space-y-3 border-t-2 border-black pt-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-zinc-200">
                <span className="font-bold text-black uppercase tracking-wider text-[11px]">
                  سنتز تحلیلی تدوین‌شده توسط هیئت تحریریه
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-zinc-600 hover:text-black cursor-pointer text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{copied ? 'رونوشت برداشته شد' : 'کپی متن گزارش'}</span>
                </button>
              </div>

              <div className="bg-zinc-50 border border-black/20 p-5 text-sm sm:text-base leading-relaxed text-zinc-900 font-article-body whitespace-pre-line space-y-4">
                {result}
              </div>

              <div className="text-[11px] font-sans-editorial text-zinc-500 flex justify-between">
                <span>موتور هوش مصنوعی: {modelUsed}</span>
                <span>پروتکل استدلال بالا: فعال</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-zinc-100 border-t border-zinc-300 flex justify-between items-center text-xs">
          <span className="text-[11px] text-zinc-500">
            تولیدشده با ارجاع به داده‌های تحریریه رادار
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white text-xs uppercase font-bold hover:bg-zinc-800 cursor-pointer"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </div>
  );
};
