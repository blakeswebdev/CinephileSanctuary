import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserReviews.css";
import Nav from "./Nav";
import Footer from "./Footer";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const UserReviews = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2FlMzc4MzYyMzgxODY1NjlhNWRjNjEyMmNhZjJmYyIsIm5iZiI6MTc3MjI0MTgxOC45ODcsInN1YiI6IjY5YTI0MzlhODE3ZTJkZGM2NGZmNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnVWIBEh3QZUNEs57oYVrJfErkI2L7EC3oOBu0ERan8",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&&append_to_response=videos`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
        alert("Please login to submit a review.");
        navigate("/login");
        return;
    }
  

  if (rating === "" || !comment) {
    alert("Please provide both a rating and a comment.");
    return;
  }

  try {
    await addDoc(collection(db, "reviews"), {
        movieId: id,
        movieTitle: movie.title,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.email.split('@')[0],
        rating: Number(rating),
        comment: comment,
        createdAt: serverTimestamp(),
    });

    alert(`Successfully rated ${movie.title} ${rating} stars.`);
    navigate(`/movie/${id}`);
  } catch (error) {
    console.error("Error adding review: ", error);
    alert("Something went wrong. Try again.");
  }
};

  if (!movie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div>
        <Nav /> 
        <h2 className="rate-title">Rate {movie.title}</h2>
      <form className="review-section" onSubmit={handleSubmit}>
        <div className="img-wrapper">
           <img
            className="movie-img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : `https://image.tmdb.org/t/p/w500x750?text=No+Poster+Available`
            }
            alt={movie.title}
          />
        </div>
        <div className="info">
            
          <select className="rate-stars" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
          required
          >
            <option value="" disabled>How many stars?</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
         <textarea className="review" 
            placeholder="Write your review here..." 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            required></textarea>
          <button className="btn" type="submit">
            Submit Review
          </button>
          <p className="movie-rating">
            <strong>Official Rating:</strong> {movie.vote_average.toFixed(1)} /10
          </p>
          <p className="movie-runtime">
            <strong>Runtime:</strong> {movie.runtime + " minutes"}
          </p>
          <p className="movie-over">{movie.overview}</p>
          <div className="movie__btns"></div>
        </div>

     
          
        
      </form>
      <Footer />
    </div>
  );
};

export default UserReviews;
