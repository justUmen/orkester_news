"use client"
import { useGetUsernameValue, useSetUsernameValue } from "@/redux/hooks"
import { Button, Typography } from "@mui/material";
import { fetchNewsQuery } from "@/app/action";
import { useEffect, useState } from "react";
import { NewsArticle } from "../types/newsInterface";

const TestRedux = () => {
    const [totalResults, setNewsTotalResults] = useState<number>(0);
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const fetchAndSetNewsData = async () => {
            const testApiJson = await fetchNewsQuery(1, "test");
            if ("error" in testApiJson) {
                console.error(testApiJson.error);
            } else {
                setNewsTotalResults(testApiJson.totalResults);
                setNewsArticles(testApiJson.articles);
            }
        };
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
};
export default TestRedux;