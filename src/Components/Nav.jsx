import logo from "../Assets/C (1).png";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import Login from "./Login";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return ( ) => unsubscribe();
  }, []);

  const handleSignOut = async () => {
      await signOut(auth);
      navigate('/login');
    } 

  return (
    <nav>
      <div className="nav__container">
        <div className="title" >
        <Link to="/">
          <img className="title__logo-img" src={logo} alt="" />
        </Link>
        <div className="title__logo">Cinephile Sanctuary</div>
        </div>
        <ul className="nav__links">
          <li className="nav__list">
            <select className="list-dropdown" name="" id="">
                <option value="English">English</option>
                <option value="Korean">Korean</option>
            </select>
          </li>
          <li className="nav__list watchlist">
            <Link to="/watchlist" className="nav__link">
              My Watchlist
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/home" className="nav__link">
              Movies
            </Link>
          </li>
          <li>
            
            {user ? (
            <button className="btn__menu" onClick={handleSignOut}>
              Sign Out
            </button>):(
              <button className="btn__menu" onClick={() => navigate('/login')}>
              Log In
            </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
