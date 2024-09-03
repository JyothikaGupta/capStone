import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const API_KEY = '29b789b7b3074d4ab36ecb8da0efd22f'; // Replace with your News API key
const API_URL = 'https://newsapi.org/v2/everything';

const categories = [
  'accidents',
  'emergency',
  'crime',
  'safety',
  'health',
  'medicine',
  'mental health'
];

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            q: selectedCategory,
            apiKey: API_KEY,
            pageSize: 10 // Number of articles to fetch
          }
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="news-feed">
      <Header />
      <h1>You Know What?</h1>
      <select
        className="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <div className="news-list">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((article, index) => (
            <div key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <img 
                  src={article.urlToImage || '/api/placeholder/400/200'} 
                  alt={article.title} 
                  className="news-item-image" 
                />
                <div className="news-item-content">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <div className="news-item-meta">
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <span className="news-item-category">{selectedCategory}</span>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;