import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import NewsContext from "../utils/NewsContext";

const NewsID = () => {
  const { news } = useContext(NewsContext);
  const { id } = useParams();
  const currentNews = news.find((n) => n._id === id);

  if (!currentNews) {
    return <div className="feed-container">404 Oops, news not found</div>;
  }

  return (
    <div className="id-container">
      <h1>{currentNews.article}</h1>
      <p className="grey">{`Author: ${currentNews.author}`}</p>
      <p className="grey">{`Publishing time: ${new Date(
        currentNews.publishing_time
      ).toLocaleDateString()} ${new Date(
        currentNews.publishing_time
      ).toLocaleTimeString()}`}</p>
      <div className="news-container-image">
        <img
          alt={currentNews._id}
          className="news-image"
          src={currentNews.image}
        />
      </div>
      <p className="main-text" dangerouslySetInnerHTML={{__html: currentNews.text}}></p>
    </div>
  );
};

export default NewsID;
