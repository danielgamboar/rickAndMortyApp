import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';

import { history } from './helpers/history';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        {isLoggedIn ? (
          <div>
            <a href="/login" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </div>
        ) : (
          <div>
            <Link to={'/login'} className="nav-link">
              Login
            </Link>
          </div>
        )}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>

    // <div className="App">
    //   {/* <Home /> */}
    //   <Login />
    // </div>
  );
};

export default App;
