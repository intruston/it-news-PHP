import React, { useContext } from "react";
import { Link } from "react-router-dom";
import NewsContext from "../utils/NewsContext";

const NewsList = () => {
  const { news } = useContext(NewsContext);

  const getTimeDifference = (date) => {
    const diff = new Date() - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  // Sort news items based on importance and publishing time
  const sortedNews = [...news].sort((a, b) => {
    // First, sort by importance
    if (a.important && !b.important) {
      return -1; // a comes first
    } else if (!a.important && b.important) {
      return 1; // b comes first
    } else {
      // If both items have the same importance, sort by publishing time
      return new Date(b.publishing_time) - new Date(a.publishing_time);
    }
  });

  return (
    <div className="section-container">
      {sortedNews.map((newsItem, index) => (
        <div
          key={newsItem._id}
          className={`news-container-${index}`}
        >
          <Link
            to={{ pathname: `/news/${newsItem._id}` }}
            className="news-link"
          >
            <h2>{newsItem.article}</h2>
          </Link>
          <p className="grey">{getTimeDifference(newsItem.publishing_time)}</p>
          {newsItem.image && (index === 0 || newsItem.important) && (
            <div className="news-container-image">
              <img
                alt={newsItem._id}
                className="news-image"
                src={newsItem.image}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsList;