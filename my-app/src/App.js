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
        <Route path="/:username/*" element={<RenderRoutes />} />
        <Route path="/" element={<RenderRoutes />} />
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
      <Header username={username} />
      <Routes>
        <Route path="/" element={<Home username={username} />} /> {/* Pass username as a prop */}
        <Route path="about" element={<About username={username} />} /> {/* Pass username to About */}
        <Route path="contact" element={<Contact username={username} />} /> {/* Pass username to Contact */}
      </Routes>
    </>
  );
};

export default App;
