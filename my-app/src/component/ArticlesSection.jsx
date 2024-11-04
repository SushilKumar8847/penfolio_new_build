import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticlesSection = ({ username }) => {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [sources, setSources] = useState([]);
  const [activeTab, setActiveTab] = useState('articles');
  const [itemsToShow, setItemsToShow] = useState({
    articles: 6,
    books: 6,
    podcasts: 6,
    videos: 6,
  });
  const [expandedArticles, setExpandedArticles] = useState(new Set());
  const [selectedSource, setSelectedSource] = useState('');

  // Fetch data for articles, books, podcasts, videos, and sources
  const fetchData = async (type) => {
    const urls = {
      articles: `https://app.penfolio.co/api/user/portfolio/articles/${username}`,
      books: `https://app.penfolio.co/api/user/portfolio/book/${username}`,
      podcasts: `https://app.penfolio.co/api/user/portfolio/podcast/${username}`,
      videos: `https://app.penfolio.co/api/user/portfolio/video/${username}`,
      sources: `https://app.penfolio.co/api/user/sources/${username}`,
    };

    try {
      const response = await axios.get(urls[type]);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (username) {
        setArticles(await fetchData('articles'));
        setBooks(await fetchData('books'));
        setPodcasts(await fetchData('podcasts'));
        setVideos(await fetchData('videos'));
        setSources(await fetchData('sources'));
      } else {
        console.error('Username is undefined');
      }
    };
    loadData();
  }, [username]);

  const loadMore = () => {
    setItemsToShow((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab] + 6, // Update only the active tab
    }));
  };

  const toggleExpandArticle = (index) => {
    const updatedExpandedArticles = new Set(expandedArticles);
    if (updatedExpandedArticles.has(index)) {
      updatedExpandedArticles.delete(index);
    } else {
      updatedExpandedArticles.add(index);
    }
    setExpandedArticles(updatedExpandedArticles);
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length <= 20) return description;
    return words.slice(0, 20).join(' ') + '...';
  };

  // Filter articles based on the selected source
  const filteredArticles = selectedSource
    ? articles.filter(article => article.article_source === selectedSource)
    : articles;

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Content Section</h3>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'articles' ? 'active' : ''}`}
              onClick={() => setActiveTab('articles')}
              type="button"
              role="tab"
            >
              Articles
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
              onClick={() => setActiveTab('books')}
              type="button"
              role="tab"
            >
              Books
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
              type="button"
              role="tab"
            >
              Videos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === 'podcasts' ? 'active' : ''}`}
              onClick={() => setActiveTab('podcasts')}
              type="button"
              role="tab"
            >
              Podcasts
            </button>
          </li>
        </ul>

        {/* Dropdown for Source */}
        {activeTab === 'articles' && sources.length > 0 && (
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownSourceButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Source
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownSourceButton">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => setSelectedSource('')} // Reset filter
                >
                  All Sources
                </a>
              </li>
              {sources.map((source) => (
                <li key={source.source_id}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setSelectedSource(source.source)}
                  >
                    {source.source}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tabs content */}
      <div className="tab-content mt-4" id="myTabContent">
        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="row g-4">
            {filteredArticles.slice(0, itemsToShow.articles).map((article, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <img
                    src={article.featuredImageurl || "https://via.placeholder.com/400x250"}
                    className="card-img-top"
                    alt={article.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      {expandedArticles.has(index) ? article.description : truncateDescription(article.description)}
                    </p>
                    {article.description.split(' ').length > 20 && (
                      <button className="btn btn-link" onClick={() => toggleExpandArticle(index)}>
                        {expandedArticles.has(index) ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                    {article.article_source && (
                      <p>Source: {article.article_source} </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="row g-4">
            {books.slice(0, itemsToShow.books).map((book, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <img src="https://via.placeholder.com/400x250" className="card-img-top" alt={book.title} />
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{truncateDescription(book.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="row g-4">
            {videos.slice(0, itemsToShow.videos).map((video, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <img src={video.featuredImageurl || "https://via.placeholder.com/400x250"} className="card-img-top" alt={video.title} />
                  <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">{truncateDescription(video.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Podcast Tab */}
        {activeTab === 'podcasts' && (
          <div className="row g-4">
            {podcasts.slice(0, itemsToShow.podcasts).map((podcast, index) => (
              <div className="col-md-4" key={index}>
                <div className="card">
                  <img src={podcast.featuredImageurl || "https://via.placeholder.com/400x250"} className="card-img-top" alt={podcast.title} />
                  <div className="card-body">
                    <h5 className="card-title">{podcast.title}</h5>
                    <p className="card-text">{truncateDescription(podcast.description)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Load More Button */}
{activeTab === 'articles' && articles.length > itemsToShow.articles && (
  <div className="d-flex justify-content-center my-3">
    <button className="btn btn-primary" onClick={loadMore}>
      Load More Articles
    </button>
  </div>
)}
{activeTab === 'books' && books.length > itemsToShow.books && (
  <div className="d-flex justify-content-center my-3">
    <button className="btn btn-primary" onClick={loadMore}>
      Load More Books
    </button>
  </div>
)}
{activeTab === 'videos' && videos.length > itemsToShow.videos && (
  <div className="d-flex justify-content-center my-3">
    <button className="btn btn-primary" onClick={loadMore}>
      Load More Videos
    </button>
  </div>
)}
{activeTab === 'podcasts' && podcasts.length > itemsToShow.podcasts && (
  <div className="d-flex justify-content-center my-3">
    <button className="btn btn-primary" onClick={loadMore}>
      Load More Podcasts
    </button>
  </div>
)}

    </div>
  );
};

export default ArticlesSection;
