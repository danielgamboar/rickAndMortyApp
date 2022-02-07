import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound';
import CharDetails from './components/CharDetails/CharDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { clearMessage, clearMessageError } from './actions/message';

import { history } from './helpers/history';
import Footer from './components/Footer/Footer';
import Notification from './components/Notification/Notification';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message, error } = useSelector((state) => state.message);
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
    // const timer = setTimeout(() => {
    //   // dispatch(clearMessageError());
    //   setClear(!clear);
    // }, 10000);
    // return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <Router history={history}>
      <Header isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<PrivateRoute Component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/char/:id"
          element={<PrivateRoute Component={CharDetails} />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {message ? (
        <Notification message={message} error={error} clear={clear} />
      ) : null} */}

      <Footer />
    </Router>
  );
};

export default App;
