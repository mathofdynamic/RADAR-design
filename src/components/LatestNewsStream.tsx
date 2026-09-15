import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock } from 'lucide-react';

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
      className="w-full bg-zinc-50 border-t-2 border-b-2 border-black py-8 my-6 font-sans-editorial"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
        {/* Stream Header */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-black pb-2 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-black inline-block animate-pulse"></span>
              <span>خط خبری زنده تحریریه</span>
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              — تازه‌ترین مخابره‌ها و تلکس‌های تاییدشده دفاتر خبری
            </span>
          </div>
          <span className="text-[11px] font-sans-editorial uppercase tracking-widest text-zinc-600">
            به‌روزرسانی ۲۴ ساعته
          </span>
        </div>

        {/* Responsive Grid/List of Ticker Dispatches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectArticle(item.slug)}
              className="border-b border-zinc-200 pb-3 group cursor-pointer hover:border-black transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px] font-sans-editorial text-zinc-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span className="font-bold text-black">{item.time}</span>
                  <span>•</span>
                  <span className="uppercase text-[10px] text-zinc-600 tracking-wider">
                    {item.category}
                  </span>
                </div>
                <ArrowLeft className="w-3 h-3 text-zinc-400 group-hover:text-black group-hover:-translate-x-1 transition-all" />
              </div>

              <h4 className="font-headline font-bold text-sm sm:text-base text-black group-hover:underline leading-snug">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
