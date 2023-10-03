import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewsList from './components/NewsList';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import Search from './components/Search';
import NewsID from './components/NewsID';
import NewsProvider from './utils/NewsProvider';
import AllNewsProvider from './utils/AllNewsProvider';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  return (
    <NewsProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/newsfeed" element={<AllNewsProvider><NewsFeed /></AllNewsProvider>} />
        <Route path="/news/:id" element={<AllNewsProvider><NewsID /></AllNewsProvider>} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
    </NewsProvider>
  );
}

export default App;
