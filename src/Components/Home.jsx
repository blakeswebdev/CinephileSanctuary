import React, { useEffect, useState } from 'react'
import './Home.css'
import Footer from './Footer'
import Nav from './Nav'
import TitleCards from './TitleCards/TitleCards'
import { useParams, useLocation } from 'react-router-dom'

const Home = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(null);
  const {id} = useParams();
  const location = useLocation();

  useEffect(() =>  {
    const params = new URLSearchParams(location.search);
    const queryFromUrl = params.get('query');

    if (queryFromUrl) {
        setSearchTerm(queryFromUrl);
        performSearch(queryFromUrl);
    }
  }, [location.search]);

  const performSearch = (query) => {
    
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2FlMzc4MzYyMzgxODY1NjlhNWRjNjEyMmNhZjJmYyIsIm5iZiI6MTc3MjI0MTgxOC45ODcsInN1YiI6IjY5YTI0MzlhODE3ZTJkZGM2NGZmNTkyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnVWIBEh3QZUNEs57oYVrJfErkI2L7EC3oOBu0ERan8'
  }
};
fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`, options)
  .then(res => res.json())
  .then(res => {setResults(res.results || []); console.log(res.results)})
  .catch(err => console.error(err));
  }

    
    
    
   
  const searchMovies = (e) => {

    if (e) e.preventDefault();
    performSearch(searchTerm);
};
  

    return (
        <div className="home">
            <Nav />
            <div className="search">
                <form className="search_caption" onSubmit={searchMovies}>
                    <h2>Look up your movie here</h2>
                    <input type="text" placeholder="Search Movies"  className='search-input'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button className='search-btn' type="submit" >Search</button>
                </form>
            
            <TitleCards className="search__title" results={results} title="Search Results" />
        </div>
        <Footer />
        </div>
    )
}

export default Home