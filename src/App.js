import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Products from './Pages/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './CSS/global.css';
import './CSS/header.css';
import './CSS/banner.css';
import './CSS/imgText.css';
import './CSS/form.css';
import './CSS/card.css';
import './CSS/footer.css';
import ionic from './utils/animation';
import './CSS/animation.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    ionic.init();
    const header = document.querySelector('header');
    const bannerHeight = document.querySelector('.banner')?.offsetHeight || 0;

    const handleScroll = () => {
      if (window.scrollY > bannerHeight - 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <>
        <header className={ `${isMobileMenuOpen ? 'open' : ''}`}>
          <div className='headeder-wrapper d-flex justify-content-between align-items-center'>
            <div className='logo-wrapper'>
              <img src='./imgs/logo.png' alt="Logo" />
            </div>

            {/* Desktop Nav */}
            <div className='nav-wrapper d-none d-md-flex justify-content-end align-items-center'>
              <div className='links-wrapper'>
                <nav className='nav'>
                  <Link className='nav-link' to="/products">Products</Link>
                  <Link className='nav-link' to="/about">About</Link>
                  <Link className='nav-link' to="/contact">Contact</Link>
                </nav>
              </div>
            </div>

            {/* Hamburger */}
            <div className='hamburger d-block d-md-none'>
              <a
                href="javascript:void(0)"
                className='hamburger-link'
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu();
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </a>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className={`mobile-nav-wrapper d-block d-md-none ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className='links-wrapper'>
              <nav className='nav flex-column align-items-end'>
                <Link className='nav-link' to="/products" onClick={closeMobileMenu}>Products</Link>
                <Link className='nav-link' to="/about" onClick={closeMobileMenu}>About</Link>
                <Link className='nav-link' to="/contact" onClick={closeMobileMenu}>Contact</Link>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

        <footer className="footer">
          <div className="container-fluid">
            <div className="row row-gap-5">
              <div className="col-2 col-md-2">
                <div className="footer-logo">
                  <img className='w-100' src='./imgs/logo.png' alt="Footer Logo" />
                </div>
              </div>
              <div className="col-12 col-md-4 offset-md-1">
                <div className="footer-contact">
                  <h4 className="footer-title">Contact</h4>
                  <ul className="list-unstyled">
                    <li><i className="fas fa-map-marker-alt"></i> Plot: 13 - Akshar Township, Waghodia, Vadodara, Gujarat - 391760</li>
                    <li><i className="fas fa-phone"></i> Phone: <a href='tel:+919898372645'>+91 9898372645</a></li>
                    <li><i className="fas fa-envelope"></i> Email: <a href='mailto:iconicswitchgear@gmail.com'>iconicswitchgear@gmail.com</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-md-2 offset-lg-2 offset-md-1">
                <div className="footer-social">
                  <h4 className="footer-title">Follow Us</h4>
                  <ul className="list-unstyled d-flex gap-4">
                    <li><a href='https://www.facebook.com/profile.php?id=61578101009388' className='social-icon'><FontAwesomeIcon icon={faFacebookF} /></a></li>
                    <li><a href='https://www.instagram.com/iconic_switchgear?igsh=MWxkeGh1aDJ4bThodg==' className='social-icon'><FontAwesomeIcon icon={faInstagram} /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="mb-1 mt-5 text-align-right copy-right">&copy; {new Date().getFullYear()} Iconic switchgear product. All rights reserved.</p>
          </div>
        </footer>
      </>
    </Router>
  );
}

export default App;
