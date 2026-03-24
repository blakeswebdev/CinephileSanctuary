import React, { useRef, useState, useEffect } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom';

const TitleCards = ({results, title}) => {
    if (results === null) {return null};

    return (
        <div className="title-cards">
            <h2>{title}</h2>
            <div className="card-list">
                {results && results.length > 0 ? (results.map((movie) => {
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