export interface NewsArticle {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsData {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface ErrorType {
  error: string;
}
