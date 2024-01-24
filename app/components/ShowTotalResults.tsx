"use client"
import { useGetTotalSearchValue } from "@/redux/hooks";
import { Typography } from "@mui/material";

function ShowTotalResults() {
    const totalResults = useGetTotalSearchValue();
    return (
        totalResults !== 0 && (
            <Typography variant="h5" align="center">{totalResults} results</Typography>
        ) || (<Typography variant="h5" align="center">...</Typography>)
    );
}

export default ShowTotalResults;
