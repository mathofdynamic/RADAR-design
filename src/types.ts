export type CategorySlug = 
  | 'world'
  | 'politics'
  | 'business'
  | 'technology'
  | 'science'
  | 'culture'
  | 'opinion'
  | 'investigations';

export interface Author {
  name: string;
  role: string;
  location?: string;
  avatarUrl?: string;
}

export interface ArticleMetric {
  label: string;
  value: string;
  change?: string;
}

export interface TimelineEvent {
  timeOrDate: string;
  title: string;
  description: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  standfirst: string;
  author: Author;
  category: CategorySlug;
  subcategory: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  isLead?: boolean;
  isSecondary?: boolean;
  isBreaking?: boolean;
  isAnalysis?: boolean;
  isInvestigation?: boolean;
  isOpinion?: boolean;
  ranking?: number; // For Most Read (1-5)
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  pullQuote?: string;
  pullQuoteSpeaker?: string;
  keyTakeaways?: string[];
  timeline?: TimelineEvent[];
  body: string[]; // Editorial paragraphs in Persian
  subsections?: {
    heading: string;
    paragraphs: string[];
  }[];
  sourcesAndDocuments?: string[];
  metrics?: ArticleMetric[];
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  persianName: string;
  description: string;
  leadStoryId: string;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'article'; articleSlug: string }
  | { type: 'category'; categorySlug: CategorySlug }
  | { type: 'search'; initialQuery?: string }
  | { type: 'saved' };
