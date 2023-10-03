import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import logo from "../images/logo.svg";
import loop from "../images/loop.svg";
import rss from "../images/rss.svg";
import donate from "../images/donate.svg";
import menu from "../images/menu.svg";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sandwichOpen, setSandwichOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const toggleSandwich = () => {
    setSandwichOpen(!sandwichOpen);
  };

  return (
    <header>
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <nav>
        <ul>
          <li className="nav-item">
            <button className="search-button" onClick={toggleSearch}>
              <img className="nav-img" src={loop} alt="Loop" />
            </button>
          </li>
          <li className="nav-item">
            <Link to="/newsfeed" className="nav-link">
              <img className="nav-img" src={rss} alt="RSS" />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="https://www.hackyourfuture.net/donate"
              target="_blank"
              className="nav-link"
            >
              <img className="nav-img" src={donate} alt="Donate" />
            </Link>
          </li>
          <li className="nav-item-sandwich">
            <button className="sandwich-button" onClick={toggleSandwich}>
              <img className="nav-img" src={menu} alt="Menu" />
            </button>
            {sandwichOpen && (
              <div className="sandwich-dropdown">
                <p onClick={toggleSearch} className="sandwich-link">
                  Search
                </p>
                <Link to="/newsfeed" className="sandwich-link">
                  News Feed
                </Link>
                <Link to="https://www.hackyourfuture.net/donate" className="sandwich-link">
                  Donate
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      {searchOpen && (
        <div className="search-container">
          <Search />
          <button className="close-button" onClick={closeSearch}>
            x
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
