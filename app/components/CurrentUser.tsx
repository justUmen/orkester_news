"use client"
import { useGetUsernameValue } from "@/redux/hooks"
import { Typography } from "@mui/material";

const TestRedux = () => {
    return (
        <Typography>{useGetUsernameValue()}</Typography>
    )
};
export default TestRedux;