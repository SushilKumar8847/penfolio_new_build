import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const { username } = useParams();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">About {userData.full_name || userData.username}</h2>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title"> {userData.title || userData.bio}</h5>
          <p className="card-text">
          {userData.about || userData.bio}
          </p>
          <h6>More About {userData.full_name || userData.username}:</h6>
          <p className="lead">{userData.about}</p>
          <h6>Location:</h6>
          <p>
            <i className="fas fa-map-marker-alt"></i> {userData.city}, {userData.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
