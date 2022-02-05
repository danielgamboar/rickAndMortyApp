import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';

import { clearMessage } from './actions/message';
import { getAllChars, getUsersFavChars } from './actions/ramchar';

import { history } from './helpers/history';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
    dispatch(getAllChars(1));
    dispatch(getUsersFavChars(isLoggedIn));
  }, [dispatch, isLoggedIn]);

  return (
    <Router history={history}>
      <div className="header">
        <Header isLoggedIn={isLoggedIn} />
        <SearchBar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
