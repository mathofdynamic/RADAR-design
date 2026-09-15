import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

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
  const [streamQueue, setStreamQueue] = useState<NewsStreamItem[]>(items);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const ADVANCE_INTERVAL = 6000; // Advance every 6 seconds

  const advanceWire = () => {
    setStreamQueue((prev) => {
      if (prev.length <= 1) return prev;
      const next = [...prev];
      const first = next.shift();
      if (first) next.push(first);
      return next;
    });
  };

  const rewindWire = () => {
    setStreamQueue((prev) => {
      if (prev.length <= 1) return prev;
      const next = [...prev];
      const last = next.pop();
      if (last) next.unshift(last);
      return next;
    });
  };

  useEffect(() => {
    if (shouldReduceMotion || isHovered || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      advanceWire();
    }, ADVANCE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, isPaused, shouldReduceMotion]);

  // Display top 4 items from the live queue
  const visibleItems = streamQueue.slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 my-4 border-t-2 border-b border-black font-sans-editorial select-none"
      dir="rtl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-4">
        {/* Stream Header with Live Pulse Indicator & Play/Pause Controls */}
        <div className="flex flex-wrap items-baseline justify-between border-b border-zinc-200 pb-2 gap-2">
          <div className="flex items-center gap-3">
            <h3 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight text-black flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block animate-pulse"></span>
              <span>خط خبری زنده تحریریه</span>
            </h3>
            <span className="text-xs font-sans-editorial text-zinc-500 hidden sm:inline">
              — مخابره‌ها و تلکس‌های بامدادی دفاتر خبری
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-sans-editorial">
            <span className="text-zinc-400 hidden md:inline">
              {isHovered ? 'مکث (روی خط)' : 'جریان زنده فعال'}
            </span>

            {/* Manual wire controls */}
            <div className="flex items-center gap-1.5 text-zinc-600">
              <button
                onClick={rewindWire}
                className="hover:text-black cursor-pointer px-1 py-0.5"
                title="مخابره پیشین"
              >
                ←
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="hover:text-black cursor-pointer px-1 py-0.5 underline text-[10px]"
                title={isPaused ? 'ادامه جریان' : 'مکث جریان'}
              >
                {isPaused ? 'ادامه' : 'توقف'}
              </button>
              <button
                onClick={advanceWire}
                className="hover:text-black cursor-pointer px-1 py-0.5"
                title="مخابره پسین"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Vertically Advancing Live Newsroom Wire (Physical Layout Shift) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-1">
          <AnimatePresence initial={false}>
            {visibleItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout={!shouldReduceMotion}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12 }
                }
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
