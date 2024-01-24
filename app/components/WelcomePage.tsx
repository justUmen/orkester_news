"use client"
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/rpi');
  }, []);

  return <div><CircularProgress /></div>;
}
export default WelcomePage;