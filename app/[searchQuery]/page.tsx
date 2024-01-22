"use client";
import { fetchNewsQuery } from "../action";
import { ErrorType, NewsArticle, NewsData } from "@/app/types/newsInterface";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { searchQuery: string } }) {
  const searchQuery: string = params.searchQuery;
  const [ newsArticles, setNewsArticles ] = useState<NewsArticle[]>([]);
  const [ totalResults, setNewsTotalResults ] = useState<number>(0);

  useEffect(() => {
    const fetchAndSetNewsData = async () => {
        const data: NewsData | ErrorType = await fetchNewsQuery(1, searchQuery);
        if ("error" in data) {
          console.error(data.error);
        } else {
          setNewsTotalResults(data.totalResults);
          setNewsArticles(data.articles);
        }
      }
    fetchAndSetNewsData();
  }, []);

  return (
    <div>
        <Typography>Total Results: {totalResults}</Typography>
        <div>
            {newsArticles.map((article, index) => (
                <div key={index}>
                    <Typography variant="h6">{article.title}</Typography>
                    <Typography variant="body1">{article.description}</Typography>
                </div>
            ))}
        </div>
    </div>
);
}
