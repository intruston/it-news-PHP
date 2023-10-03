import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const subscribe = (event) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer>
      <div className="footer-container">
      <div className="column">
        <h3>IT NEWS</h3>
        <ul className="footer-list">
          <li><Link to="/about" className="ftr-link">About</Link></li>
          <li><Link to="https://www.hackyourfuture.net/donate" target="_blank" className="ftr-link">Support HYF</Link></li>
        </ul>
      </div>
      <div className="column">
        <h3>Platforms</h3>
        <ul className="footer-list">
          <li><Link to="https://github.com/intruston" target="_blank" className="ftr-link">GitHub</Link></li>
          <li><Link to="https://www.linkedin.com/in/vladimir-and-ivanov/" target="_blank" className="ftr-link">LinkedIn</Link></li>
        </ul>
      </div>
      <div className="column">
        <h3>Subscribe</h3>
        {subscribed ? (
          <p>Thanks for subscribing!</p>
        ) : (
          <form onSubmit={subscribe}>
            <input
              className="footer-input"
              type="email"
              placeholder="email"
              value={email}
              onChange={emailChange}
            />
            <button className="subscribe-button" type="submit">Subscribe</button>
          </form>
        )}
      </div>
      </div>
    </footer>
  );
}

export default Footer;