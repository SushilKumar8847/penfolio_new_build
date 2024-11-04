import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ArticlesSection from '../component/ArticlesSection';

const Home = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://app.penfolio.co/api/user/profile/${username}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!userData) {
    return <p className="text-danger">User data is not available.</p>;
  }

  return (
    <>
      <Helmet>
        <title>{userData.full_name || userData.username} - React App</title>
        <meta name="description" content={userData.bio || 'User bio not available.'} />
        {/* Set favicon using the user's profile image if available, otherwise a placeholder */}
        <link rel="icon" href={userData.user_profile_image || 'https://via.placeholder.com/250'} />
      </Helmet>
      <div className="container my-5">
        <div className="row align-items-start">
          <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
            <img
              src={userData.user_profile_image || 'https://via.placeholder.com/250'}
              className="rounded mb-3"
              alt="Profile Picture"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '250px' }}
            />
            <p><i className="fas fa-map-marker-alt"></i> {userData.city || ''}, {userData.country || ''}</p>
          </div>
          <div className="col-12 col-md-8 text-center text-md-start">
            <h2>{userData.full_name || userData.username}</h2>
            <p className="text-muted">{userData.title || 'N/A'}</p>
            <p className="lead" dangerouslySetInnerHTML={{ __html: userData.bio || '' }}></p>
            <div className="my-3 d-flex justify-content-center justify-content-md-start">
              {userData.facebook && (
                <a href={userData.facebook} className="btn btn-outline-primary mx-1" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {userData.twitter && (
                <a href={userData.twitter} className="btn btn-outline-primary mx-1" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {userData.linkedin && (
                <a href={userData.linkedin} className="btn btn-outline-primary mx-1" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {userData.github && (
                <a href={userData.github} className="btn btn-outline-primary mx-1" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
            <p><i className="fas fa-map-marker-alt"></i> {userData.country || ''}</p>
          </div>
        </div>
        <ArticlesSection username={username} />
      </div>
    </>
  );
};

export default Home;
