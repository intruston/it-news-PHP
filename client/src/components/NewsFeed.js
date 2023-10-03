import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import NewsContext from "../utils/NewsContext";

const NewsFeed = () => {
  const { news } = useContext(NewsContext);
  const [currentPage, setCurrentPage] = useState(1);

  const newsPerPage = 10;
  const totalPages = Math.ceil(news.length / newsPerPage);
  const newsByDate = news.reduce((acc, news) => {
    const date = new Date(news.publishing_time);
    const options = { weekday: "long", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    acc[formattedDate] = acc[formattedDate] || [];
    acc[formattedDate].push(news);
    return acc;
  }, {});

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const displayedNews = Object.keys(newsByDate)
    .sort((a, b) => new Date(b) - new Date(a))
    .slice(0, currentPage * newsPerPage)
    .map((date) => (
      <div key={date}>
        <h3>{date}</h3>
        <ul>
          {newsByDate[date].map((news) => (
            <Link to={{ pathname: `/news/${news._id}` }} className="news-link" key={news._id}>
              <li key={news._id}>{news.article}</li>
            </Link>
          ))}
        </ul>
      </div>
    ));

  return (
    <div className="feed-container">
      {displayedNews}
      {currentPage < totalPages && (
        <button className="subscribe-button" onClick={loadMore}>Show Older News</button>
      )}
    </div>
  );
};

export default NewsFeed;
