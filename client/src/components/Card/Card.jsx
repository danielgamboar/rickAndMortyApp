import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Card.module.css';
import { favOrUnfavChar } from '../../actions/ramchar';
import { Link } from 'react-router-dom';
import { setLoading } from '../../actions/loading';

export default function Card(props) {
  const { char, liked } = props;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const handleFavChar = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    dispatch(favOrUnfavChar(char.id));
    dispatch(setLoading(false));
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img src={char.image} alt="character" className={styles.char_image} />
      </div>
      <div className={styles.card_body}>
        <div className={styles.card_header}>
          <Link to={`/char/${char.id}`} className={styles.title}>
            {char.name}
          </Link>
        </div>
        <div className={styles.card_data}>
          <div className={styles.data_box}>
            <p className={styles.text}>Status: </p>
            <p className={styles.data}>{char.status}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.text}>Origen: </p>
            <p className={styles.data}>{char.origin.name}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.text}>Specie: </p>
            <p className={styles.data}>{char.species}</p>
          </div>
        </div>
        <div className={styles.button_box}>
          <button
            className={liked ? styles.btn_liked : styles.btn_like}
            onClick={handleFavChar}
            disabled={loading}
          >
            {liked ? 'Loving' : 'Like'}
          </button>
        </div>
      </div>
    </div>
  );
}
