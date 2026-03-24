import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import './Watchlist.css'; 

const Watchlist = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!auth.currentUser) return;

        const q = query(
            collection(db, 'watchlists'),
            where("userId", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe();
    }, []);

    const removeFromWatchlist = async (docId) => {
        try {
            await deleteDoc(doc(db, "watchlists", docId));
        } catch (error) {
            console.error("error removing movie:", error);
        }
    };

    return (
        <>
        <div className="watchlist-page">
            <Nav />
            <div className="watchlist-container">
            <h1 className='watchlist-title' >My Watchlist</h1>
            <div className="movies-grid">
                {list.length > 0 ? (
                list.map(movie => (
                    <div className='watchlist-item' key={movie.id}>
                    <Link to={`/movie/${movie.movieId}`}>
                        <div className="movie-card">
                            <img src={movie.poster} alt={movie.title} />
                                        </div>
                    </Link>
                <button className='remove-btn' onClick={() => removeFromWatchlist(movie.id)}>
                        Remove                
                    </button>
                    </div>
                ))
                ):(
                    <p className='empty-msg'>
                        Your Watchlist is empty. Go find some movies to add.
                    </p>
                )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Watchlist;