import React, { useState } from "react"
import "./Welcome.css"
import { Link, useNavigate } from "react-router-dom";
import TitleCards from "./TitleCards/TitleCards";
import Footer from "./Footer";
import Nav from "./Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import bgimg from "../Assets/background.jpg"
import ttyd from "../Assets/ttyd-card.webp"
import ff from "../Assets/ff-card1.webp"
import tg from "../Assets/tg-card.webp"


const Welcome = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); 
 

    
    
    const handleSearchRedirect = (e) => {
        if (e) e.preventDefault();
        if(!searchTerm) return;
        navigate(`/home?query=${encodeURIComponent(searchTerm)}`);
};

    return (
        <div className="welcome-page" >
            <Nav />
            <div className="background-img" style={{backgroundImage: `url(${bgimg})`}}>

            </div>
            <div className="search-section">
                <form className="search_caption" onSubmit={handleSearchRedirect}>

                    <p className="search-para" >Find <span className="gold" >movies</span> you love.</p>
                    <p className="search-para" >Share <span className="gold" >trailers </span>with friends.</p>
                    <p className="search-para" >Track your <span className="gold" >to-be-watched </span>list.</p>
                    <div className="search-inputs" >
                    <input className="search-text" type="text" placeholder="Search Movies" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                    <button className='search-btn' type="submit" ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                </form>
        </div>
        <div className="container" >
                    <div className="discover">
                        <h2>Check out these Top-Rated Movies</h2>
                        <ul className="top-movies" >
                            <Link to="/movie/617126" className="movie" >
                                <img src={ff} alt="The Fantastic Four: First Steps" className="movie-card" />
                                <div className="movie-info" >
                                    <h3 className="gold" >The Fantastic Four: First Steps</h3>
                                    <h4>Released: 2025</h4>
                                    <p>During a space voyage, four scientists are altered by cosmic rays: Reed Richards gains the ability to stretch his body; Sue Storm can become invisible; Johnny Storm controls fire; and Ben Grimm is turned into a super-strong … thing. Together, these "Fantastic Four" must now thwart the evil plans of Dr. Doom and save the world from certain destruction.</p>

                                </div>
                            </Link>
                            <Link to="/movie/9591" className="movie" >
                                <img src={ttyd} alt="That Thing You Do" className="movie-card" />
                                <div className="movie-info" >
                                    <h3 className="gold" >That Thing You Do!</h3>
                                    <h4>Released: 1996</h4>
                                    <p>A Pennsylvania band scores a hit in 1964 and rides the star-making machinery as long as it can, with lots of help from its manager. But behind the scenes, the group’s sudden fame tests their strength, their maturity and responsibility, and their ability to resist the temptations that money and notoriety always make possible.</p>

                                </div>
                            </Link>
                            <Link to="/movie/361743" className="movie" >
                                <img src={tg} alt="Top Gun Maverick" className="movie-card" />
                                <div className="movie-info" >
                                    <h3 className="gold" >Top Gun: Maverick</h3>
                                    <h4>Released: 2022</h4>
                                    <p>After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.</p>

                                </div>
                            </Link>
                        </ul>
                        
                    </div>
                </div>
        <Footer />
        </div>
    )
}

export default Welcome;