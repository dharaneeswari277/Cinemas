import React from 'react';
import ExtractionImage from './extraction.jpg';

const ViewMovie = () => {
  const movie = {
    title: "Extraction",
    cast: "Chris Hemsworth, Randeep Hooda, David Harbour",
    price: "₹ 250.0/-",
    ticketsAvailable: 150,
  };

  return (
    <div>
        <header>
            <nav className="main-nav">
            <a href="/">NMS Cinemas</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/view">View Movies</a>
            <a href="/manage">Manage Movies</a>
            </nav>
        </header>
        <nav className="side-nav">
         <a href="/">Home</a>
            <a href="/manage">Movies</a>
            <a href="/extract">Extraction</a>
            </nav>
    <div className="view-movie-container">
  
      <img src={ExtractionImage} alt={movie.title} className="movie-image" />
      <div className="movie-details">
        <h2>{movie.title}</h2>
        <p><strong>Cast:</strong> {movie.cast}</p>
        <p><strong>Price:</strong> {movie.price}</p>
        <p><strong>Tickets Available:</strong> {movie.ticketsAvailable}</p>
        <button className="edit-button">Edit</button>
        <button className="explore-button">Explore More</button>
      </div>
    </div>
    </div>
  );
};

export default ViewMovie;
