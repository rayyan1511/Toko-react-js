import React from "react";

export default function DateTime({
  date,
  options = {
    weekday :"short",
    year : "numeric",
    month : "long",
    day : "numeric",
    hour :"numeric",
    minute : "numeric",
  },
}) {
  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      ...options,
    }).format(Date.parse(date));

  return <>{getDate()}</>;
}
