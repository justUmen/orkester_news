"use client";

import { Key, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CircularProgress, Grid, Typography } from "@mui/material";

import { fetchNewsQuery } from "@/app/action";
import { NewsArticle } from "@/app/types/newsInterface";
import CardNews from "./CardNews";

let pageNumber=2;
function LoadMoreNewsQuery({ extraSearch }: { extraSearch: string }) {
  //TODO : Better error management, nothing for now, jut request every 500ms until it works, spam rerenders
  const { ref, inView } = useInView();
  const [ newsArticles, setNewsArticles ] = useState<NewsArticle[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  console.log("components/LoadMoreNewsQuery RENDERED !!!");

  useEffect(() => {
    console.log("components/LoadMoreNewsQuery useEffect TRIGGERED !!!");
    if (inView) {
      setIsLoading(true);
      // Add a short delay to prevent too many requests : debouncing / throttling
      // Also : will only allow 1 request per 5 seconds - for testing purpose, we have only 1 API key in use
      const delay = 500; 
      const timeoutId = setTimeout(() => {
        fetchNewsQuery(pageNumber, extraSearch).then((res) => {
          if ("articles" in res) {
            const addArticles = res.articles;
            setNewsArticles([...newsArticles, ...addArticles]);
            pageNumber++;
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
      <Grid ref={ref} item xs={12} style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {inView && !isLoading && <CircularProgress />}
        <Typography>You are limited to 1 request every 5 seconds, please wait</Typography>
      </Grid>
    </>
  );
}

export default LoadMoreNewsQuery;