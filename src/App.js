import React from 'react'
import Home from './Components/Home';
import Login from './Components/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import MovieDetail from './Components/MovieDetail';
import Welcome from './Components/Welcome';
import UserReviews from './Components/UserReviews';
import Watchlist from './Components/Watchlist';


function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/movie/:id' element={<MovieDetail/>}/>
      <Route path='/rate/:id' element={<UserReviews/>}/>
      <Route path='/watchlist' element={<Watchlist/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
