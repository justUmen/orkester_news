"use client";

import { Key, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CircularProgress, Grid } from "@mui/material";

import { fetchNewsQuery } from "@/app/action";
import { NewsArticle } from "@/app/types/newsInterface";
import CardNews from "./CardNews";

let page=2;

function LoadMoreNewsQuery({ extraSearch }: { extraSearch: string }) {
  const { ref, inView } = useInView();
  const [ newsArticles, setNewsArticles ] = useState<NewsArticle[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  
  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500; // Add a short delay to prevent too many requests
      const timeoutId = setTimeout(() => {
        fetchNewsQuery(page, extraSearch).then((res) => {
          if ("articles" in res) {
            const addArticles = res.articles;
            setNewsArticles([...newsArticles, ...addArticles]);
            page++;
          }
        });
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timeoutId);// Clear if the component unmounted inView becomes false
    }
  }, [inView, newsArticles, isLoading]);
  
  return (
    <>
      {newsArticles?.map((item: NewsArticle, index: number) => (
        <CardNews key={index as Key} news={item} index={index} />
      ))}
      <Grid item xs={12} style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div ref={ref}>
          {inView && isLoading && <CircularProgress />}
        </div>
      </Grid>
    </>
  );
}

export default LoadMoreNewsQuery;
