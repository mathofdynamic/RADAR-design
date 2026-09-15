import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export const NewsletterBlock: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 font-sans-editorial"
      dir="rtl"
    >
      <div className="border border-black p-6 sm:p-8 bg-zinc-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-sans-editorial font-bold">
            گزارش بامدادی رادار
          </div>
          <h4 className="font-headline font-black text-2xl text-black">
            در جریان حقایق پنهان بمانید.
          </h4>
          <p className="font-article-body text-sm text-zinc-700">
            مهم‌ترین تحلیل‌های ژئوپلیتیک، گزیده پرونده‌های تحقیقی و تلکس‌های محرمانه، هر روز در طلیعه بامداد مستقیماً به ایمیل شما ارسال می‌شود.
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 text-xs font-sans-editorial font-semibold text-black bg-white px-4 py-3 border border-black">
            <Check className="w-4 h-4 text-black" />
            <span>عضویت شما با موفقیت ثبت شد. نخستین گزیده تحلیلی ساعت ۰۶:۰۰ ارسال خواهد شد.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="نشانی ایمیل خود را وارد کنید..."
              className="px-3 py-2 text-xs font-sans border border-black focus:outline-none w-full sm:w-72 bg-white text-right"
            />
            <button
              type="submit"
              className="px-5 py-2 text-xs font-sans-editorial font-bold tracking-wider bg-black text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
            >
              عضویت در خبرنامه
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
};
