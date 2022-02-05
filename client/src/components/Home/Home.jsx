import React from 'react';
import Card from '../Card/Card';
import { useSelector } from 'react-redux';
import styles from './Home.module.css';
export default function Home() {
  const { allChars } = useSelector((state) => state.ram);
  const { userFavChars } = useSelector((state) => state.ram);
  return (
    <div className={styles.card_wrapper}>
      {allChars.map((char) => {
        let liked = userFavChars.includes(char.id);
        return <Card char={char} key={char.id} liked={liked} />;
      })}
    </div>
  );
}
