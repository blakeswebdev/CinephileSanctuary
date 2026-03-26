import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './MovieDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import Nav from "./Nav";
import UserReviews from "./UserReviews";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, orderBy, serverTimestamp, addDoc } from "firebase/firestore";


const MovieDetail = () => {
    const { id } = useParams();
    const [img, setImage] = useState();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [reviews, setReviews] = useState([]);

    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => { mountedRef.current = false; };
    }, []);

    useEffect(() => {
        if (movie && movie.poster_path) {
            setLoading(false);
            return;
        }
        
        
        
            if (movie && movie.poster_path) {

        const image = new Image();
        image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        image.onload = () => {
            setTimeout(() => {
                if (mountedRef.current){
                setImage(image);
                setLoading(false);
            }
        }, 300);            
        };
    }
        return () => {
            mountedRef.current = false;
        };
    }, [movie]);


    const addToWatchlist = async () => {
        if (!auth.currentUser) {
            alert("Please log in to add movies to your watchlist.");
            return;
        }

        try {
            await addDoc(collection(db, "watchlists"), {
                userId: auth.currentUser.uid,
                movieId: id,
                title: movie.title,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                addedAt: serverTimestamp()
            });
            alert(`${movie.title} added to your watchlist`);
        }
        catch (error) {
            console.error("Error adding to watchlist", error);
            alert("Coulf not add to watchlist. Please try again.");
        }
    };

    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("movieId", "==", id),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reviewsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsData);
        });

        return () => unsubscribe();
    }, [id]);


    useEffect(() => {
        setLoading(true);

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2FlMzc4MzYyMzgxODY1NjlhNWRjNjEyMmNhZjJmYyIsIm5iZiI6MTc3MjI0MTgxOC45ODcsInN1YiI6IjY5YTI0MzlhODE3ZTJkZGM2NGZmNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnVWIBEh3QZUNEs57oYVrJfErkI2L7EC3oOBu0ERan8'
            }
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&&append_to_response=videos`, options)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                const trailer = data.videos.results.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
                setTrailerKey(trailer ? trailer.key : null);
            if (data.poster_path) {
                const image = new Image();
                image.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
                image.onload = () => {
                    if (mountedRef.current) setLoading(false);
                };
                image.onerror = () => {
                    if (mountedRef.current) setLoading(false);
                };
            } else {

                setLoading(false);
            }
         
   
            })
            .catch(err => { 
                console.error(err);
            if (mountedRef.current) setLoading(false);
});
   
return() => { mountedRef.current = false; };}, [id]);


    return (
        <>
            <Nav />
            <div className="movie-detail">
                {movie && !loading ? (
                     <> 
                     <div className="img-wrapper" onClick={() => setShowTrailer(true)}>
                <img className="movie-img" src={movie.poster_path 
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                            : `https://image.tmdb.org/t/p/w500x750?text=No+Poster+Available`} 
                            alt={movie.title}  />
                            <div className="play-overlay" >
                                <FontAwesomeIcon icon={faPlay} />
                                <span>Watch Trailer</span>
                            </div>
                            </div>
                <div className="info">
                    <h1 className="movie-title" >{movie.title}</h1>
                    <p className="movie-release" ><strong>Release Date:</strong> {(movie.release_date)}</p>
                    <p className="movie-rating" ><strong>Rating:</strong> {(movie.vote_average).toFixed(1)} /10</p>
                    <p className="movie-runtime" ><strong>Runtime:</strong> {(movie.runtime)+" minutes"}</p>
                    <p className="movie-over" >{movie.overview}</p>
                    <div className="movie__btns" >

            <button className=" btn watchlist-btn" onClick={addToWatchlist}>Add to Watchlist</button>
<Link to={ `/rate/${movie.id}`}>
            <button className="btn rate-btn" >Rate Movie</button>
        </Link>
        </div>
                </div>
</> ) : (
    <><div className="img-wrapper">
                    <div className="movie__img--skeleton"></div>
                </div>

                <div className="info">
                    <div className="movie__title--skeleton"></div>
                    <div className="movie__release--skeleton"></div>
                    <div className="movie__rating--skeleton"></div>
                    <div className="movie__runtime--skeleton"></div>
                    <div className="movie__over--skeleton"></div>

                    <div className="movie__btns">
                        <div className="watchlist__btn--skeleton"></div>
                        <div className="rate__btn--skeleton"></div>
                    </div>
                </div></>
                )}
                    
            </div>
            {showTrailer && trailerKey && (
                <div className="video-modal" onClick={() => setShowTrailer(false)} >
                    <div className="modal-content">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button className="close-btn" >Close</button>
                    </div>
                </div>
            )}

            <div className="movie-reviews-list">
                <h3>User Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <div key={rev.id} className="review-item">
                            <div className="review-header">
                                <strong>{rev.userName}</strong>
                                <span className="stars" >{"⭐".repeat(rev.rating)}</span>
                            </div>
                            <p>{rev.comment}</p>
                            <small>{rev.createdAt?.toDate().toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first!</p>
                )}
            </div>

            <Footer />
        </>
    )

}



export default MovieDetail;