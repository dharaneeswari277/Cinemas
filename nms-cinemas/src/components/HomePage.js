import React from 'react';
import Cinemas from './cinemas.jpg';
import Extraction from './extraction.jpg';
import Crawl from './crawl.jpg';
import Rambo from './rambo.jpg';


const Header = () => {
  return (
    <div>
    <header>
      <nav className="main-nav">
        <a href="/">NMS Cinemas</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/view">View Movies</a>
      </nav>
      <nav className="auth-nav">
        <a href="/signup">Sign Up</a>
        <a href="/login">Login</a>
      </nav>
    </header>
    <main>
    <nav>
      <a href="/action">Action</a>
      <a href="/horror">Horror</a>
      <a href="/comedy">Comedy</a>
      <a href="/romance">Romance</a>
      <a href="/scifi">Sci-Fi</a>
      <img src={Cinemas} alt="cinemas" className='cinema'/>
    </nav>
  </main>
  <h3>Most Booked Movies</h3>
  <img src={Extraction} alt="cinemas" className='img'/>
  <img src={Rambo} alt="cinemas" className='img'/>
  <img src={Crawl} alt="cinemas" className='img'/>

    </div>
  );
};

export default Header;
