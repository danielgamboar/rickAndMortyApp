import React, { useEffect } from 'react';
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

import { clearMessage } from './actions/message';
import { getAllChars, getUsersFavChars } from './actions/ramchar';
import { setLoading } from './actions/loading';

import { history } from './helpers/history';
import Footer from './components/Footer/Footer';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);
  const { page } = useSelector((state) => state.ram);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
    dispatch(setLoading(true));
    dispatch(getAllChars(page));
    dispatch(getUsersFavChars(isLoggedIn));
    dispatch(setLoading(false));
  }, [dispatch, isLoggedIn, page, loading]);

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

      <Footer />
    </Router>
  );
};

export default App;
