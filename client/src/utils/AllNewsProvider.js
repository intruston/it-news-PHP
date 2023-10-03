import React from 'react';
import useFetch from './useFetch';
import NewsContext from './NewsContext';

const AllNewsProvider = ({ children }) => {
  const { data, loading, error } = useFetch('http://localhost:8000/api.php?all');

  if (loading) {
    return <div className="feed-container">Loading...</div>;
  }

  if (error) {
    return <div className="feed-container">Something went wrong: {error}</div>;
  }

  return (
    <NewsContext.Provider value={{ news:data }}>
      {children}
    </NewsContext.Provider>
  );
};

export default AllNewsProvider;