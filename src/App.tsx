import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { authService } from './services/authServices';
import './App.css';

const App: React.FC = () => {
  const user = authService.getCurrentUser();

  return (
    <BrowserRouter>
  <Navbar />
  
  <div className="background-wrapper">
    <div className="overlay">
      <Container className="main-content py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/" />} 
          />
        </Routes>
      </Container>
    </div>
  </div>

  <Footer />
</BrowserRouter>

  );
};

export default App;

