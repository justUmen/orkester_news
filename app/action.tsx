"use server" //Server Actions

import { NewsData, ErrorType } from "./types/newsInterface";
const API_KEY = process.env.NEWS_API_KEY;

const NB_ITEMS = 9;
export async function fetchNewsQuery(page: number, query: string): Promise<NewsData | ErrorType> {
  const baseUrl = `https://newsapi.org/v2/everything?&language=en&apiKey=${API_KEY}&pageSize=${NB_ITEMS}&page=${page}`;
  const searchQuery = query ? `&q=${query}` : '';
  const url = `${baseUrl}${searchQuery}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { error: `Error fetching data: ${response.statusText}` };
    }
    const data: NewsData = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { error: 'An unexpected error occurred while fetching data' };
  }
}