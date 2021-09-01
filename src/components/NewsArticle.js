import React from "react";
import './layout.css';

function NewsArticle({ data }) {
  return (
    <div className="news">
      <h1 className="news__title">{data.title}</h1>
      <p className="news__desc">{data.description}</p>
      <span className="news__author">{data.author}</span> <br />
      <span className="news__published">{data.publishedAt}</span>
      <span className="news__source">{data.source.name}</span>
      <br></br>
      <span className="news__url"><a href={data.url} target='_blank'>Read more..</a></span>
    </div>
  );
}

export default NewsArticle;