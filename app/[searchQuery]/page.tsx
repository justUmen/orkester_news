"use client";
import { fetchNewsQuery } from "../action";
import { ErrorType, NewsArticle, NewsData } from "@/app/types/newsInterface";
import { useEffect, useState } from "react";
import CardNews from "../components/CardNews";
import { PageSkeleton } from "../skeletons";

export default function Page({ params }: { params: { searchQuery: string } }) {
  const searchQuery: string = params.searchQuery;
  const [ newsArticles, setNewsArticles ] = useState<NewsArticle[]>([]);
  const [ totalResults, setNewsTotalResults ] = useState<number>(0);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSetNewsData = async () => {
      setIsLoading(true);
      const data: NewsData | ErrorType = await fetchNewsQuery(1, searchQuery);
      if ("error" in data) {
        console.error(data.error);
      } else {
        setNewsTotalResults(data.totalResults);
        setNewsArticles(data.articles);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay for admiring 9 skeletons
      setIsLoading(false);
    };
    fetchAndSetNewsData();
  }, []);

  if (isLoading) {
    return <PageSkeleton />;
  }
  
  return (
    <>
      {newsArticles?.map((item: NewsArticle, index: number) => (
        <CardNews key={`${item.title}`} news={item} index={index} />
      ))}
    </>
  );
}
