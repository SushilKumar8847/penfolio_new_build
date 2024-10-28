import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { username } = useParams(); // Extract username from the URL
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data for:", username);
    fetch(`https://app.penfolio.co/api/user/profile/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data fetched successfully:", data);
        setUserData(data.data); // Adjust to match your data structure
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
        <img 
          src={userData.user_profile_image || 'https://via.placeholder.com/250'} 
          className="rounded mb-3" 
          alt="Profile" 
          style={{ width: '250px' }} 
        />
        <p><i className="fas fa-map-marker-alt"></i> {userData.city}, {userData.country}</p>
      </div>
      <div className="col-12 col-md-6 text-center text-md-start">
        <h2>{userData.full_name || userData.username}</h2>
        <p className="text-muted">{userData.title}</p>
        <p className="lead" dangerouslySetInnerHTML={{ __html: userData.bio }}></p>
        <div className="my-3">
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
        <p className="text-center"><i className="fas fa-map-marker-alt"></i> {userData.country}</p>
      </div>
    </div>
  );
};

export default Home;
