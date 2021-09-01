import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [data, setData] = useState();
  const apiKey = "e404f58b6f7a4aa9b6c2d6f3926a641e";

  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?q=vaccine&country=au&category=health&language=en&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <NewsContext.Provider value={{ data }}>
      {props.children}
    </NewsContext.Provider>
  );
};