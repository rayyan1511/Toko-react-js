import React from "react";
import { useLoading } from "../../hooks/useLoading";
import classes from "./loading.module.css";

export default function Loading() {
  const { isLoading } = useLoading(); 
  if (!isLoading) return; 

  return (
    <div className={classes.container}>
        <div className={classes.items}>
            <img src="/loading.svg" alt="loading" />
            <h1>loading...</h1>
        </div>  
    </div>
 );  
}
