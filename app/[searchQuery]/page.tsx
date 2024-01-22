"use client";
import { fetchNewsQuery } from "../action";
import { ErrorType, NewsArticle, NewsData } from "@/app/types/newsInterface";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardNews from "../components/CardNews";

export default function Page({ params }: { params: { searchQuery: string } }) {
  const searchQuery: string = params.searchQuery;
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [totalResults, setNewsTotalResults] = useState<number>(0);

  useEffect(() => {
    const fetchAndSetNewsData = async () => {
      const data: NewsData | ErrorType = await fetchNewsQuery(1, searchQuery);
      if ("error" in data) {
        console.error(data.error);
      } else {
        setNewsTotalResults(data.totalResults);
        setNewsArticles(data.articles);
      }
    };
    fetchAndSetNewsData();
  }, []);

  return (
    <>
      {newsArticles?.map((item: NewsArticle, index: number) => (
        <CardNews key={`${item.title}`} news={item} index={index} />
      ))}
    </>
  );
}
