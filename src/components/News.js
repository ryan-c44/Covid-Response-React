import React, { useContext } from "react";
import { NewsContext } from "./NewsContextProvider";
import NewsArticle from "./NewsArticle";

import './layout.css';

function News(props) {
  const { data } = useContext(NewsContext);
  console.log(data);

  return (
    <div>
      <h1 className="head__text">Vaccine News</h1>
      <div className="all__news">
        {data
          ? data.articles.map((news) => (
              <NewsArticle data={news} key={news.url} />
            ))
          : "Loading"}
      </div>
    </div>
  );
}

export default News;