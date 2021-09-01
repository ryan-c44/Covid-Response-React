import React from "react";
import { NewsContextProvider } from "./NewsContextProvider";
import News from "./News";
import "./layout.css";

const VaccineNews = () => {
  return (
    <div className="news_container">
        <NewsContextProvider>
            <News />
        </NewsContextProvider>
    </div>
  );
}

export default VaccineNews;