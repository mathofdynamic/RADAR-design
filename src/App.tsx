import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewState, Article } from './types';
import { ARTICLES, CATEGORIES, BREAKING_NEWS, LATEST_NEWS_STREAM } from './data/articles';
import { Header } from './components/Header';
import { BreakingBar } from './components/BreakingBar';
import { HeroEditorial } from './components/HeroEditorial';
import { LatestNewsStream } from './components/LatestNewsStream';
import { CategorySections } from './components/CategorySections';
import { AnalysisAndOpinion } from './components/AnalysisAndOpinion';
import { MostReadSection } from './components/MostReadSection';
import { NewsletterBlock } from './components/NewsletterBlock';
import { ArticleView } from './components/ArticleView';
import { CategoryView } from './components/CategoryView';
import { SearchView } from './components/SearchView';
import { SavedArticlesView } from './components/SavedArticlesDrawer';
import { EditorialIntelligenceModal } from './components/EditorialIntelligenceModal';
import { RSSModal } from './components/RSSModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' });
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('radar_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [intelligenceOpen, setIntelligenceOpen] = useState(false);
  const [intelligenceArticle, setIntelligenceArticle] = useState<Article | undefined>(undefined);
  const [rssOpen, setRssOpen] = useState(false);

  // Save reading list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('radar_saved_articles', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Inject or update JSON-LD structured data for Persian SEO & NewsArticle schema
  useEffect(() => {
    let scriptTag = document.getElementById('news-jsonld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'news-jsonld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (currentView.type === 'article') {
      const art = ARTICLES.find((a) => a.slug === currentView.articleSlug);
      if (art) {
        scriptTag.text = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: art.title,
          description: art.standfirst,
          inLanguage: 'fa',
          datePublished: art.publishedAt,
          dateModified: art.updatedAt || art.publishedAt,
          author: {
            '@type': 'Person',
            name: art.author.name,
            jobTitle: art.author.role,
          },
          publisher: {
            '@type': 'NewsMediaOrganization',
            name: 'رادار',
            url: 'https://radar.internal',
          },
        });
      }
    } else {
      scriptTag.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'رادار',
        url: 'https://radar.internal',
        inLanguage: 'fa',
        foundingDate: '2024',
      });
    }
  }, [currentView]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const navigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Editorial article assignment
  const leadStory = ARTICLES.find((a) => a.isLead) || ARTICLES[0];
  const secondaryStories = ARTICLES.filter((a) => a.isSecondary).slice(0, 3);
  const currentArticle =
    currentView.type === 'article'
      ? ARTICLES.find((a) => a.slug === currentView.articleSlug) || leadStory
      : undefined;

  const currentCategory =
    currentView.type === 'category'
      ? CATEGORIES.find((c) => c.slug === currentView.categorySlug) || CATEGORIES[0]
      : undefined;

  const savedArticlesList = ARTICLES.filter((a) => savedIds.includes(a.id));

  return (
    <div
      className="min-h-screen flex flex-col bg-white text-black font-sans-editorial"
      dir="rtl"
    >
      {/* Editorial Masthead & Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={navigate}
        savedCount={savedIds.length}
        onOpenSaved={() => navigate({ type: 'saved' })}
        onOpenIntelligence={() => {
          setIntelligenceArticle(currentArticle);
          setIntelligenceOpen(true);
        }}
        onOpenRssModal={() => setRssOpen(true)}
      />

      {/* Real-time Breaking Wire Bar */}
      {BREAKING_NEWS && (
        <BreakingBar
          news={BREAKING_NEWS}
          onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
        />
      )}

      {/* MAIN VIEWPORT ROUTER WITH REFINED EDITORIAL MOTION */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {currentView.type === 'home' && (
            <motion.div
              key="view-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-4"
            >
              {/* 1. Asymmetric Hero Editorial Area with Lead Story Rotation */}
              <HeroEditorial
                leadArticle={leadStory}
                leadArticles={[leadStory, secondaryStories[0], secondaryStories[1]].filter(Boolean)}
                secondaryArticles={secondaryStories}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onToggleSave={toggleSave}
                isSaved={isSaved}
              />

              {/* 2. Chronological Latest News Stream */}
              <LatestNewsStream
                items={LATEST_NEWS_STREAM}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
              />

              {/* 3. Controlled Editorial Category Sections with Viewport Reveals */}
              <CategorySections
                articles={ARTICLES}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onSelectCategory={(slug) => navigate({ type: 'category', categorySlug: slug })}
                onToggleSave={toggleSave}
                isSaved={isSaved}
              />

              {/* 4. Analysis & Long-Form Criticism */}
              <AnalysisAndOpinion
                articles={ARTICLES}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
              />

              {/* 5. Most Read 01–05 Section with Sequential Numeral Reveals */}
              <MostReadSection
                articles={ARTICLES}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
              />

              {/* 6. Minimalist Editorial Newsletter */}
              <NewsletterBlock />
            </motion.div>
          )}

          {currentView.type === 'article' && currentArticle && (
            <motion.div
              key={`view-article-${currentArticle.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ArticleView
                article={currentArticle}
                relatedArticles={ARTICLES.filter(
                  (a) => a.id !== currentArticle.id && a.category === currentArticle.category
                ).slice(0, 3)}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onBack={() => navigate({ type: 'home' })}
                onToggleSave={toggleSave}
                isSaved={isSaved(currentArticle.id)}
                onOpenIntelligenceForArticle={(art) => {
                  setIntelligenceArticle(art);
                  setIntelligenceOpen(true);
                }}
              />
            </motion.div>
          )}

          {currentView.type === 'category' && currentCategory && (
            <motion.div
              key={`view-category-${currentCategory.slug}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <CategoryView
                category={currentCategory}
                articles={ARTICLES.filter((a) => a.category === currentCategory.slug)}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onBack={() => navigate({ type: 'home' })}
                onToggleSave={toggleSave}
                isSaved={isSaved}
              />
            </motion.div>
          )}

          {currentView.type === 'search' && (
            <motion.div
              key="view-search"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <SearchView
                articles={ARTICLES}
                initialQuery={currentView.initialQuery}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onBack={() => navigate({ type: 'home' })}
                onToggleSave={toggleSave}
                isSaved={isSaved}
              />
            </motion.div>
          )}

          {currentView.type === 'saved' && (
            <motion.div
              key="view-saved"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <SavedArticlesView
                savedArticles={savedArticlesList}
                onSelectArticle={(slug) => navigate({ type: 'article', articleSlug: slug })}
                onRemoveSave={toggleSave}
                onClearAll={() => setSavedIds([])}
                onBack={() => navigate({ type: 'home' })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Structured Typographic Footer */}
      <Footer
        onNavigate={navigate}
        onOpenRssModal={() => setRssOpen(true)}
      />

      {/* Editorial Intelligence Bureau Modal (Powered by Gemini 3.1 Pro Thinking Mode) */}
      <EditorialIntelligenceModal
        isOpen={intelligenceOpen}
        onClose={() => setIntelligenceOpen(false)}
        currentArticle={intelligenceArticle}
      />

      {/* RSS 2.0 Syndication Discovery Modal */}
      <RSSModal
        isOpen={rssOpen}
        onClose={() => setRssOpen(false)}
      />
    </div>
  );
}
