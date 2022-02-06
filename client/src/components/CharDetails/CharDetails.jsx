import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CharDetails.module.css';
import authHeader from '../../services/auth-header';
import { favOrUnfavChar } from '../../actions/ramchar';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { setLoading } from '../../actions/loading';

function CharDetails() {
  const { id } = useParams();
  const [char, setChar] = useState({});
  const [origin, setOrigin] = useState('');
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const { userFavChars } = useSelector((state) => state.ram);
  const { loading } = useSelector((state) => state.loading);

  const handleFavChar = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    dispatch(favOrUnfavChar(id));
    dispatch(setLoading(true));
  };
  let liked = userFavChars.includes(char.id);

  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/char/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        if (response.data.status === 200) {
          setChar(response.data.data);
          setOrigin(response.data.data.origin.name);
          setLocation(response.data.data.location.name);
        }
      });
  }, [id]);

  return (
    <div className={styles.detail_wrapper}>
      <aside className="image_card">
        <img src={char.image} alt={char.name} className={styles.char_image} />
      </aside>
      <article className={styles.card}>
        <div className={styles.name_card}>
          <h1 className={styles.char_name}>{char.name}</h1>
        </div>
        <div className={styles.card_body}>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Status</p>
            <p className={styles.data_value}>{char.status}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Species</p>
            <p className={styles.data_value}>{char.species}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Type</p>
            <p className={styles.data_value}>{char.type}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Gender</p>
            <p className={styles.data_value}>{char.gender}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Origin</p>
            <p className={styles.data_value}>{origin}</p>
          </div>
          <div className={styles.data_box}>
            <p className={styles.data_title}>Location</p>
            <p className={styles.data_value}>{location}</p>
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
      </article>
    </div>
  );
}

export default CharDetails;
