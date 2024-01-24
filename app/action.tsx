"use server"; //Server Actions

import { NewsData } from "./types/newsInterface";
const API_KEY = process.env.NEWS_API_KEY;

const NB_ITEMS = 9;

//Throttle the API calls (only one API key...)
let lastFetchTimestamp = 0;

export async function fetchNewsQuery(
  page: number,
  query: string
): Promise<NewsData> {
  //Handle two types of Errors :
  // (1) - network-related errors
  // (2) - data fetching issues
  // 500 Internal Server Error
  // Other errors are handled after the fetchNewsQuery() call in the [searchQuery] page
  
  const currentTimestamp = Date.now();

  // Check if the last fetch was less than 5000 milliseconds ago
  const delta = currentTimestamp - lastFetchTimestamp;
  if (delta < 5000) {
    console.log(`API Fetching news for page ${page} and query ${query} (Time : ${delta} > 1000)`); //BAD
    throw new Error("Please wait a bit before requesting again.");
  }
  console.log(`API Fetching news for page ${page} and query ${query} (Time : ${delta} > 1000)`); //GOOD

  const baseUrl = `https://newsapi.org/v2/everything?&language=en&apiKey=${API_KEY}&pageSize=${NB_ITEMS}&page=${page}`;
  const searchQuery = query ? `&q=${query}` : "";
  const url = `${baseUrl}${searchQuery}`;
  console.log(url); //With API key  :p, can check or use for testing purposes
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`); // (1) - network-related errors
    }
    const data: NewsData = await response.json();
    lastFetchTimestamp = Date.now();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      const theError = `[fetchNewsQuery] An unexpected error occurred while fetching data: ${error.message}`; // (2) - data fetching issue
      console.error(theError);
      throw new Error(theError);
    }
    else {
      const theError = `[fetchNewsQuery] An unexpected non-Error object was thrown`; // Unknown issue ???
      console.error(theError);
      throw new Error(theError);
    }
  }
}
