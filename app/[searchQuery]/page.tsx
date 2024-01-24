"use client";
import { fetchNewsQuery } from "../action";
import { NewsArticle, NewsData } from "@/app/types/newsInterface";
import { useEffect, useState } from "react";
import CardNews from "../components/CardNews";
import { PageSkeleton } from "../skeletons";
import LoadMoreNews from "../components/LoadMoreNews";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { useGetTotalSearchValue, useSetTotalSearchValue } from "@/redux/hooks";

export default function Page({ params }: { params: { searchQuery: string } }) {
  console.log("[searchQuery] RENDERED !!!");
  const searchQuery: string = params.searchQuery;
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false); // Initialize error state to false
  const setTotalSearchValue = useSetTotalSearchValue(); // My custom hook for totalSearchValue
  const totalSearchValue = useGetTotalSearchValue();

  useEffect(() => {
    console.log("[searchQuery] useEffect TRIGGERED !!!");
    //ERROR HANDLING : * => Handled by fetchNewsQuery() itself
    // (1*) - network-related errors
    // (2*) - data fetching issues
    // (3) - API issues (100+ results)
    // (4) - parsing issues
    // (5) - image loading issues (no plan for now just Skeleton of the same size)
    // ...
    // Special management :
    // (1) no results, totalResults = 0 {"status":"ok","totalResults":0,"articles":[]} :
    // (2) result < 9, totalResults = 7 : Nothing special to do ???
    // ...

    const fetchAndSetNewsData = async () => {
      try {
        setIsLoading(true);
        setHasError(false); // Reset error state before fetching
        const data: NewsData = await fetchNewsQuery(1, searchQuery);

        // These lines will only execute if fetchNewsQuery did not throw an error (1) or (2) :
        // Now check for other Errors (3), (4), (5), etc...
        // example of (3) : {"status":"error","code":"maximumResultsReached","message":"You have requested too many results. Developer accounts are limited to a max of 100 results. You are trying to request results 189 to 198. Please upgrade to a paid plan if you need more results."}
        if (data.status === "error") {
          //Not an error, but an "API issue"
          if ("code" in data) {
            throw new Error(
              `[fetchAndSetNewsData] API issues (status === "error"): ${data.code}`
            ); // (3) - API issues (100+ results)
          }
          throw new Error(
            `[fetchAndSetNewsData] API issues (status === "error"): no code`
          ); // (3) - Other API issues
        } else {
          if ("articles" in data) {
            // Everything looks normal to me...
            setNewsArticles(data.articles);
            // setNewsTotalResults(data.totalResults);
            if ("totalResults" in data) {
              setTotalSearchValue(data.totalResults);
            } else { // (4) - parsing issues
              throw new Error(
                "[fetchAndSetNewsData] No 'totalResults' key found in the response, Weird..."
              );
            }
          } else {// (4) - parsing issues
            throw new Error(
              "[fetchAndSetNewsData] Parsing error, no 'articles' key found in the response"
            );
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("[fetchAndSetNewsData] Error :", error.message);
          setHasError(true); // Set error state only if an error occurs
        } else {
          console.error(
            "[fetchAndSetNewsData] An unexpected non-Error object was thrown:",
            error
          );
          setHasError(true); // Handle non-Error objects as well
        }
      } finally {
        // Finally will always execute, even if an error occurs
        setIsLoading(false);
      }
    };
    fetchAndSetNewsData();
  }, [searchQuery]); // Added searchQuery as a dependency

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (hasError) {
    return (
      <Alert severity="warning">
        Error loading news articles. Please try again later. (You are only allowed 1 API request every 5 seconds)
      </Alert>
    );
  }

  return (
    <>
      {/* Only goes there if !isLoading && !hasError */}
      {newsArticles?.map((item: NewsArticle, index: number) => (
        <CardNews key={`${item.title}-${index}`} news={item} index={index} />
      ))}
      {totalSearchValue === 0 ? (
        <Alert severity="info">There is no result for this request</Alert>
      ) : totalSearchValue > 9 ? (
        <LoadMoreNews extraSearch={searchQuery} />
      ) : (
        <Alert severity="warning">
          No more news to load, you are only allowed API 1 request every 5 seconds.
        </Alert>
      )}
    </>
  );
}
