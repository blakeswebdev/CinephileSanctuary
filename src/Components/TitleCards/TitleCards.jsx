import React, { useRef, useState, useEffect } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom';

const TitleCards = ({results, title, loading }) => {
    if (!loading && results === null) return null;

    return (
        <div className="title-cards">
            <h2>{title}</h2>
            <div className="card-list">
                {loading ? (
                    new Array(8).tofill(0).map((_, index) => (
                    <div className="results" key={index}>
                        <div className="movie__img--skeleton"></div>
                        <div className="movie__title--skeleton"></div>
                    </div>
                ))
            ) : results && results.length > 0 ? (results.map((movie) => {
                    if (!movie) return null;
                      return(
                        <Link to={`/movie/${movie.id}`} key={movie.id} className='card-link'>
                    <div className="card" >
                        <img 
                            className='card-img' 
                            src={movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                            : `https://image.tmdb.org/t/p/w500x750?text=No+Poster+Available`} 
                            alt={movie.title} 
                            />
                    <p>{movie.title}</p>
                    </div>
                    </Link>
                    );
})
            ): (
                <p>No movies found. Try a different search.</p>
            )
        } 
            </div>
            
        </div>
    );
}

export default TitleCards