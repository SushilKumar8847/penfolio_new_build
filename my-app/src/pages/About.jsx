import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization
import 'bootstrap/dist/css/bootstrap.min.css';

const About = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://app.penfolio.co/api/user/profile/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserData(data.data); // Adjust to your data structure
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
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

  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About {userData.full_name || userData.username}</h2>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">{userData.title || userData.bio}</h5>
          <p className="card-text">
            {/* Sanitize HTML content to prevent XSS */}
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userData.about || userData.bio) }} />
          </p>
          <h6>More About {userData.full_name || userData.username}:</h6>
          <p className="lead">
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userData.about) }} />
          </p>
          <h6>Location:</h6>
          <p>
            <i className="fas fa-map-marker-alt"></i> {userData.city}, {userData.country}
          </p>
        </div>
      </div>
    </div>
  );
};

// Define propTypes for validation
About.propTypes = {
  username: PropTypes.string.isRequired, // Ensure username is a required string
};

export default About;
