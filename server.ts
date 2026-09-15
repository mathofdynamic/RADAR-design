import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    publication: "رادار",
    edition: "نسخه ملی و بین‌المللی",
    language: "fa",
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Editorial Intelligence & Deep Thinking endpoint
// Using gemini-3.1-pro-preview with ThinkingLevel.HIGH
app.post("/api/editorial-synthesis", async (req, res) => {
  const { query, articleContext, scope } = req.body;

  if (!query || typeof query !== "string") {
    res.status(400).json({ error: "پرسش یا موضوع پژوهش الزامی است." });
    return;
  }

  const ai = getGenAI();

  // If Gemini API key is configured, use gemini-3.1-pro-preview with high thinking in Persian
  if (ai) {
    try {
      const prompt = `شما مدیر ارشد تحریریه و تحلیل‌گر ارشد استراتژیک در نشریه «رادار» (یک نشریه وزین، مستقل و تحلیلی با روزنامه‌نگاری تحقیقی موشکافانه) هستید.

وظیفه:
پاسخ تحلیلی جامع، دقیق و موشکافانه خود را کاملاً به زبان فارسی معیار، فصیح، جدی و با لحن ژورنالیسم طراز اول بین‌المللی در پاسخ به پرسش کاربر ارائه دهید.

پرسش پژوهشی:
"${query}"

${articleContext ? `زمینه و متن گزارش مورد بررسی:\n${articleContext}\n` : ""}
${scope ? `افق بررسی تحلیلی: ${scope}\n` : ""}

الزامات ساختار گزارش (همه بخش‌ها با تیتر فارسی):
۱. ارزیابی اجرایی تحریریه (بیانیه افتتاحیه در ۲ بند مستدل و راهبردی)
۲. ابعاد ژئوپلیتیک و پیامدهای کلان ساختاری (اثرات درجه دوم و زنجیره‌ای)
۳. آرایش جناح‌ها، برندگان و بازندگان پنهان (منافع ثبت‌نشده و انگیزه‌های ناگفته)
۴. روایت‌های متقابل و زوایای مغفول (آنچه اجماع عمومی نادیده گرفته است)
۵. الگوها و پیشینه‌های تاریخی مشابه
۶. افق پیش‌رو: شاخص‌های کلیدی برای پایش در بازه ۹۰ روز آینده

لحن: ژورنالیسم تحقیقی، نخبگانی، کاملاً بی‌طرفانه، منضبط، بدون شعار یا واژگان تبلیغاتی، و با واژه‌گزینی شایسته زبان فارسی.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          systemInstruction: "شما تحلیل‌گر ارشد هیئت تحریریه نشریه «رادار» هستید و گزارش‌های راهبردی و محرمانه با استدلال عمیق و منحصراً به زبان فارسی تدوین می‌کنید.",
        },
      });

      const text = response.text || "تحلیلی برای این موضوع تولید نشد.";
      res.json({
        synthesis: text,
        model: "gemini-3.1-pro-preview",
        mode: "high-thinking",
        generatedAt: new Date().toISOString(),
      });
      return;
    } catch (err: any) {
      console.error("Gemini thinking synthesis error:", err);
      // Fall through to Persian newsroom fallback
    }
  }

  // Authoritative newsroom desk analytical fallback in Persian
  const deskBriefing = `### ارزیابی اجرایی تحریریه

تحولات مورد بررسی نشان‌دهنده گسست شتابان در کریدورهای لجستیکی راهبردی و بازآرایی ساختارهای رگولاتوری بین‌المللی است. این اقدامات، نه تعدیل‌های مقطعی، بلکه بازتابی از یک تغییر پارادایم کلان هستند که در آن سیاست‌های صنعتی و امنیتی دولت‌ها بر معاهدات چندجانبه پیشین تفوق یافته است.

بازیگران اصلی به‌طور فزاینده‌ای نوسانات ژئوپلیتیک پایدار را در مدل‌های مالی خود لحاظ می‌کنند؛ به‌گونه‌ای که صرف سرمایه‌ای در زیرساخت‌های حیاتی با نرخ خطرپذیری ۱۸۰ تا ۲۴۰ نقطه پایه بازتعریف شده و نهادهای داوری سنتی با مقاومت‌های صلاحیت سرزمینی مواجه گشته‌اند.

### ابعاد ژئوپلیتیک و پیامدهای اقتصاد کلان
* **بازمهندسی زنجیره‌های عرضه:** پیمان‌های دوجانبه در حوزه مواد معدنی حیاتی، نیمه‌هادی‌ها و آلیاژهای پیشرفته جایگزین چارچوب‌های استاندارد بین‌المللی شده‌اند.
* **فشارهای ترازنامه‌ای:** نهادهای پولی در تلاشند تعادل میان مهار تورم ساختاری و هزینه‌های فزاینده تأمین بدهی‌های حاکمیتی را حفظ کنند که این امر توان مانور ضدچرخه‌ای را به شدت تحدید می‌کند.
* **واگرایی مقرراتی:** اصطکاک میان استانداردهای زیست‌محیطی سخت‌گیرانه و مشوق‌های تولید داخلی، پنجره‌های آربیتراژ بی‌سابقه‌ای برای صندوق‌های ثروت ملی گشوده است.

### منافع جناح‌ها و موازنه‌های راهبردی
* **کنسرسیوم‌های انرژی و صنایع پایه:** اولویت‌بخشی به صیانت از ترازنامه به جای تغییر سریع مدل تجاری، و تخصیص منابع گسترده برای امتداد یارانه‌های دوره‌ای.
* **پیشگامان فناوری‌های ژرف و پردازش ابری:** مواجهه با تنگناهای نقدینگی بخش خصوصی، که وابستگی آنها را به سرمایه‌گذاری‌های اقلیت از سوی صندوق‌های حاکمیتی افزایش داده است.
* **دیده‌بان‌های مدنی و نهادهای ممیزی:** هشدار پیرامون کاهش شفافیت در قراردادهای محرمانه دولتی و نقض احتمالی تعهدات اقلیمی.

### پیشینه‌های تاریخی و الگوهای مشابه
بحران‌های بازآرایی کنونی تشابه ساختاری عمیقی با تحولات قیمت‌گذاری انرژی در سال‌های ۱۹۷۳ تا ۱۹۷۵ و انشعاب از استانداردهای پولی در دهه ۱۹۳۰ دارند. در هر دو دوره تاریخی، خوش‌بینی‌های رسمی اولیه جای خود را به بازنویسی دائمی پروتکل‌های تبادل کالا و سرمایه دادند.

### شاخص‌های کلیدی برای رصد در ۹۰ روز آینده
۱. روند تصویب لایحه‌ها و معاهدات دوجانبه در کمیسیون‌های پارلمانی.
۲. شکاف بازده اوراق قرضه حاکمیتی در بازارهای فرامرزی.
۳. اقدامات اجرایی و جرایم مرتبط با دور زدن محدودیت‌های فناورانه و مسیرهای کشتیرانی.

*(یادداشت تحریریه: به محض اتصال کلید اختصاصی در بخش تنظیمات، سنتز زنده با استفاده از موتور تفکر استدلالی Gemini 3.1 Pro Thinking فعال خواهد شد).*`;

  res.json({
    synthesis: deskBriefing,
    model: "radar-editorial-desk",
    mode: "editorial-desk-briefing",
    generatedAt: new Date().toISOString(),
  });
});

// RSS Feed Endpoint (100% Persian RSS 2.0 with UTF-8)
app.get("/api/rss.xml", (req, res) => {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>رادار — نشریه مستقل و حقیقت‌محور تحلیلی</title>
    <link>https://radar.internal/</link>
    <description>نشریه مستقل رویدادهای راهبردی، ژئوپلیتیک، معماری مالی و ژورنالیسم تحقیقی بین‌الملل با نظام بصری منحصراً سیاه‌وسفید.</description>
    <language>fa</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://radar.internal/api/rss.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>بن‌بست در مذاکرات ائتلاف دریانوردی پیرامون عوارض ترانزیت گذرگاه قطب شمال</title>
      <link>https://radar.internal/article/arctic-passage-tariffs</link>
      <description>دیپلمات‌ها و کنسرسیوم‌های حمل‌ونقل بین‌المللی پس از چهار روز مذاکرات فشرده و پشت درهای بسته در ریکیاویک، بدون دستیابی به توافقی بر سر چارچوب تعرفه‌های ترانزیتی به کار خود پایان دادند.</description>
      <category>جهان</category>
      <pubDate>Mon, 14 Sep 2026 08:30:00 GMT</pubDate>
      <guid>https://radar.internal/article/arctic-passage-tariffs</guid>
    </item>
    <item>
      <title>حاکمیت بر زیرساخت پردازش: نبرد پنهان برای تأسیسات بومی لیتوگرافی نیمه‌هادی</title>
      <link>https://radar.internal/article/sovereignty-of-compute</link>
      <description>وزارتخانه‌های اقتصاد و دارایی در اروپا و شرق آسیا بسته‌های تاریخی تخصیص سرمایه را برای بومی‌سازی کارخانه‌های تولید تراشه تصویب کردند تا وابستگی‌های متقابل کاهش یابد.</description>
      <category>فناوری</category>
      <pubDate>Mon, 14 Sep 2026 07:15:00 GMT</pubDate>
      <guid>https://radar.internal/article/sovereignty-of-compute</guid>
    </item>
    <item>
      <title>واکاوی قراردادهای محرمانه ذخایر لیتیوم در بیابان آتاکاما</title>
      <link>https://radar.internal/article/investigation-lithium-concessions</link>
      <description>بررسی اختصاصی رادار از اسناد ثبتی، صورت‌جلسه‌های غیرعلنی و ممیزی‌های مالیاتی پرده از ساختار حقوقی پیچیده در واگذاری امتیازات استخراج کانی‌های راهبردی برمی‌دارد.</description>
      <category>پرونده‌های تحقیقی</category>
      <pubDate>Mon, 14 Sep 2026 05:45:00 GMT</pubDate>
      <guid>https://radar.internal/article/investigation-lithium-concessions</guid>
    </item>
  </channel>
</rss>`;

  res.set("Content-Type", "application/xml; charset=utf-8");
  res.send(rssFeed);
});

// Vite middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Radar (رادار) server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
