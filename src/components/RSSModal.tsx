import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rss, X, Copy, Check } from 'lucide-react';

interface RSSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSSModal: React.FC<RSSModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rssUrl = `${window.location.origin}/api/rss.xml`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rssUrl);
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
        className="bg-white border-2 border-black w-full max-w-xl shadow-2xl flex flex-col font-sans-editorial"
      >
        <div className="p-4 bg-black text-white flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-base uppercase tracking-wider text-white">
              اشتراک خوراک خبرخوان تحریریه رادار (RSS 2.0)
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer" title="بستن">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-zinc-800 text-xs">
          <p className="font-article-body text-sm text-black leading-relaxed">
            کلیه گزارش‌های اختصاصی، پرونده‌های تحقیقی و تلکس‌های بامدادی «رادار» از طریق پروتکل استاندارد RSS 2.0 و با رمزگذاری UTF-8 همگام‌سازی و بازتوزیع می‌گردد.
          </p>

          <div className="space-y-1">
            <label className="font-bold uppercase tracking-wider text-[10px] text-zinc-500">
              نشانی اختصاصی خوراک XML:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={rssUrl}
                className="w-full p-2 text-xs font-sans-editorial border border-black bg-zinc-50 text-black select-all text-left"
                dir="ltr"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-black text-white text-xs uppercase font-bold tracking-wider hover:bg-zinc-800 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'کپی شد' : 'کپی پیوند'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 font-sans-editorial text-[11px] text-zinc-600 space-y-1">
            <div className="font-bold text-black">مشخصات فنی بازتوزیع:</div>
            <div>• پروتکل: استاندارد RSS 2.0 با فضای نام Dublin Core و Atom</div>
            <div>• کدگذاری متنی: استاندارد بین‌المللی UTF-8</div>
            <div>• بسامد همگام‌سازی: بازتولید برخط پس از انتشار هر گزارش</div>
            <div>• دسترسی نامحدود برای سامانه‌های خبرخوان و پژوهشگران دانشگاهی</div>
          </div>
        </div>

        <div className="p-3 bg-zinc-100 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white text-xs uppercase font-bold hover:bg-zinc-800 cursor-pointer"
          >
            بستن پنجره
          </button>
        </div>
      </motion.div>
    </div>
  );
};
