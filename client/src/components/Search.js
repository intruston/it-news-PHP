import React, { useState, useEffect } from "react";
import useFetch from "../utils/useFetch";
import Fuse from "fuse.js";

const Search = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api.php?all"
  );
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data) {
      setNews(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value.length > 0) {
      const fuse = new Fuse(news, {
        keys: ["article", "text", "author"],
        includeScore: true,
      });

      const results = fuse.search(value).map((result) => result.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="search-popup">
      <input className="search-input" type="text" value={searchTerm} onChange={handleSearch} />
      <div className="search-results">
        <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              <a href={`/news/${result._id}`}>
                <p>{result.article}</p>
                <small>{result.author}</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
