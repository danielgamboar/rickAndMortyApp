import React from 'react';
import styles from './Card.module.css';
const imageUrl = 'https://rickandmortyapi.com/api/character/avatar/401.jpeg';

export default function Card(props) {
  let liked = true;
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card}>
        <div className={styles.card_img}>
          <img src={imageUrl} alt="character" className={styles.char_image} />
        </div>
        <div className={styles.card_body}>
          <div className={styles.card_header}>
            <h3 className={styles.title}>Rick Sanchez</h3>
          </div>
          <div className={styles.card_data}>
            <div className={styles.data_box}>
              <p className={styles.text}>Alive: </p>
              <p className={styles.data}>yes</p>
            </div>
            <div className={styles.data_box}>
              <p className={styles.text}>Origen: </p>
              <p className={styles.data}>Earth</p>
            </div>
            <div className={styles.data_box}>
              <p className={styles.text}>Especie: </p>
              <p className={styles.data}>Humano</p>
            </div>
          </div>
          <div className={styles.button_box}>
            <button className={liked ? styles.btn_liked : styles.btn_like}>
              {liked ? 'Loving' : 'Like'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
