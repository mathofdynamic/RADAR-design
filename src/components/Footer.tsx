import React from 'react';
import { motion } from 'motion/react';
import { ViewState } from '../types';
import { CATEGORIES } from '../data/articles';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onOpenRssModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenRssModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full bg-black text-white hairline-t border-t-2 border-black pt-12 pb-16 font-sans-editorial select-none"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Masthead Row in Footer */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h2
              onClick={() => onNavigate({ type: 'home' })}
              className="font-display-masthead font-black text-4xl sm:text-5xl tracking-tight text-white cursor-pointer hover:opacity-80"
            >
              رادار
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-2 max-w-xl leading-relaxed">
              نشریه مستقل و حقیقت‌محور رویدادهای راهبردی، ژئوپلیتیک، معماری مالی و ژورنالیسم تحقیقی
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <button
              onClick={onOpenRssModal}
              className="hover:text-white transition-colors cursor-pointer"
            >
              <span>خوراک خبرخوان (RSS)</span>
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] font-bold"
            >
              <span>بازگشت به بالا</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Section Links Directory */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* Column 1: News Sections */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              سرویس‌های خبری
            </div>
            <ul className="space-y-2 text-zinc-400">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate({ type: 'category', categorySlug: cat.slug })}
                    className="hover:text-white transition-colors cursor-pointer text-right"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Analysis & Culture */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              دیدگاه‌ها و فرهنگ
            </div>
            <ul className="space-y-2 text-zinc-400">
              {CATEGORIES.slice(4).map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => onNavigate({ type: 'category', categorySlug: cat.slug })}
                    className="hover:text-white transition-colors cursor-pointer text-right"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Global Bureaus */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              دفاتر تحریریه
            </div>
            <ul className="space-y-2 text-zinc-400 text-[11px]">
              <li>تهران — بلوار کشاورز</li>
              <li>ریکیاویک — لئوگاوگور</li>
              <li>ژنو — رو دو وارمبه</li>
              <li>لندن — فلیت استریت</li>
              <li>سانتیاگو — پروویدنسیا</li>
              <li>توکیو — چیودا-کو</li>
            </ul>
          </div>

          {/* Column 4: Institutional Standards */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              منشور اخلاقی
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-white cursor-pointer">استقلال تحریریه</li>
              <li className="hover:text-white cursor-pointer">اصول راستی‌آزمایی منابع</li>
              <li className="hover:text-white cursor-pointer">اصلاحیه‌ها و تکذیبیه‌ها</li>
              <li className="hover:text-white cursor-pointer">ارسال امن اسناد افشاگری</li>
              <li className="hover:text-white cursor-pointer">شفافیت تضاد منافع</li>
            </ul>
          </div>

          {/* Column 5: Subscriptions & Editions */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              نسخه‌ها و دسترسی
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-white cursor-pointer">نسخه اصلی فارسی</li>
              <li className="hover:text-white cursor-pointer">نسخه دیجیتال بامدادی</li>
              <li className="hover:text-white cursor-pointer">بایگانی نسخه‌های چاپی PDF</li>
              <li className="hover:text-white cursor-pointer">اشتراک کتابخانه‌ها و دانشگاه‌ها</li>
            </ul>
          </div>

          {/* Column 6: Legal & Compliance */}
          <div className="space-y-3">
            <div className="font-bold uppercase tracking-wider text-zinc-300 text-[11px] border-b border-zinc-800 pb-1">
              حقوقی و مقررات
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-white cursor-pointer">شرایط استفاده از محتوا</li>
              <li className="hover:text-white cursor-pointer">حریم خصوصی و داده‌ها</li>
              <li className="hover:text-white cursor-pointer">مجوزهای بازنشر استنادی</li>
              <li className="hover:text-white cursor-pointer">نقشه ساختار وبگاه</li>
              <li className="hover:text-white cursor-pointer">دستورالعمل‌های دسترسی‌پذیری</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice and motto */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © کلیه حقوق مادی و معنوی برای بنیاد رسانه‌ای «رادار» محفوظ است.
          </div>
          <div className="font-headline italic text-zinc-300 text-xs">
            حقیقت و شفافیت • بدون هراس، بدون جانبداری
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
