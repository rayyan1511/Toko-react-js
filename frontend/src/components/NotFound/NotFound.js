import React from "react";
import classes from "./notFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound({message = "Tidak ditemukan!" , linkRoute = "/", linkText = "Pergi ke Home"}) {
return (
  <div className={classes.container}>
    {message}
    <Link to ={linkRoute}>{linkText}</Link>
  </div>
 );   
}

NotFound.defaultProps = {
    message : "Tidak ditemukan!",
    linkRoute : "/",
    linkText : "Pergi ke Home",
}
