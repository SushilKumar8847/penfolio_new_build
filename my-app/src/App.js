import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Header from './component/Header';
import Footer from './component/Footer';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Add a trailing * to the :username route */}
        <Route path="/:username/*" element={<RenderRoutes />} />
        <Route path="/" element={<RenderRoutes />} /> {/* For the Home route without username */}
      </Routes>
      <Footer />
    </div>
  );
}

// Function to render the header and the corresponding page
const RenderRoutes = () => {
  const { username } = useParams(); // Extract username from URL parameters

  return (
    <>
      <Header username={username} /> {/* Pass the username prop to Header */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route without username */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
