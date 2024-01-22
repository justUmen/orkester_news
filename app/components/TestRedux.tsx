"use client"
import { useGetUsernameValue } from "@/redux/hooks"

const TestRedux = () => {
    return (
        <div>
            From component TestRedux = {useGetUsernameValue()}
        </div>
    )
};
export default TestRedux;