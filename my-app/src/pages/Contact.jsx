import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contact = ({ username }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetch(`https://app.penfolio.co/api/user/profile/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserId(data.data.id);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [username]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('user_id', userId);
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('subject', formData.subject);
    formDataToSubmit.append('message', formData.message);

    fetch('https://app.penfolio.co/api/user/contact', {
      method: 'POST',
      body: formDataToSubmit,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(error => {
        console.error('Error:', error);
        setError('There was an error sending your message.');
      });
  };

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
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="text-center mb-4">
        <a href="#" className="btn btn-outline-primary mx-1"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="btn btn-outline-primary mx-1"><i className="fab fa-instagram"></i></a>
        <a href="#" className="btn btn-outline-primary mx-1"><i className="fab fa-tiktok"></i></a>
        <a href="#" className="btn btn-outline-primary mx-1"><i className="fab fa-youtube"></i></a>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mx-auto">
          {successMessage && <p className="text-success">{successMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="user_id" value={userId} />
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                rows="4"
                placeholder="Your message here"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
