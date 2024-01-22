"use client"
import { useGetUsernameValue, useSetUsernameValue } from "@/redux/hooks"
import { Button, Typography } from "@mui/material";


const TestRedux = () => {
    const setUsernameValue = useSetUsernameValue();

    const handleChangeUsername = () => {
        setUsernameValue("newUsername");
    };

    return (
        <div>
            <Typography>
                From component TestRedux = {useGetUsernameValue()}
            </Typography>
            <Button variant="contained" onClick={handleChangeUsername}>Change username to "newUsername"</Button>
        </div>
    );
};
export default TestRedux;