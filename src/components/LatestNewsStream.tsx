import React from 'react';
import { motion } from 'motion/react';

interface NewsStreamItem {
  id: string;
  time: string;
  category: string;
  title: string;
  slug: string;
}

interface LatestNewsStreamProps {
  items: NewsStreamItem[];
  onSelectArticle: (slug: string) => void;
}

export const LatestNewsStream: React.FC<LatestNewsStreamProps> = ({
  items,
  onSelectArticle,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 my-4 border-t-2 border-b border-black font-sans-editorial"
      dir="rtl"
    >
      <div className="space-y-4">
        {/* Stream Header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-zinc-200 pb-2 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight text-black flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block"></span>
              <span>خط خبری زنده تحریریه</span>
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              — مخابره‌ها و تلکس‌های تاییدشده دفاتر خبری
            </span>
          </div>
          <span className="text-[11px] font-sans-editorial uppercase tracking-wider text-zinc-500">
            به‌روزرسانی پیوسته
          </span>
        </div>

        {/* Responsive Grid of Ticker Dispatches (Icon-free, typography and time-first) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item.slug)}
              className="border-b border-zinc-200 pb-3 group cursor-pointer hover:border-black transition-colors space-y-1"
            >
              <div className="flex items-center gap-2 text-[11px] font-sans-editorial text-zinc-500">
                <span className="font-bold text-black">{item.time}</span>
                <span>•</span>
                <span className="uppercase text-[10px] text-zinc-600 tracking-wider">
                  {item.category}
                </span>
              </div>

              <h4 className="font-headline font-bold text-sm text-zinc-900 group-hover:text-black group-hover:underline leading-snug">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
