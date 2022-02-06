import React, { useState } from 'react';
import Card from '../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { incrementPage, decrementPage } from '../../actions/ramchar';
import styles from './Home.module.css';
import Loading from '../Loading/Loading';

export default function Home() {
  const dispath = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const { allChars, userFavChars, page } = useSelector((state) => state.ram);

  const [query, setQuery] = useState('');
  const [searchParam] = useState(['name', 'status', 'species']);

  function search() {
    return allChars.filter((char) => {
      return searchParam.some((param) => {
        return (
          char[param].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    });
  }
  const handleIncrement = (e) => {
    e.preventDefault();
    dispath(incrementPage(page));
  };
  const handleDecrement = (e) => {
    e.preventDefault();
    dispath(decrementPage(page));
  };
  return (
    <>
      <div className={styles.container}>
        <form className={styles.search_box}>
          <input
            type="search"
            placeholder="Search in this list of characters"
            name="sear-chars"
            className={styles.input_style}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </form>
      </div>
      {!loading ? (
        <>
          <div className={styles.card_wrapper}>
            {search(allChars).map((char) => {
              let liked = userFavChars.includes(char.id);
              return <Card char={char} key={char.id} liked={liked} />;
            })}
          </div>
          <div className={styles.pagination_box}>
            <button
              className={
                page === 1
                  ? styles.btn_pagination_disable
                  : styles.btn_pagination
              }
              disabled={page === 1}
              onClick={handleDecrement}
            >
              Previous
            </button>
            <button className={styles.btn_pagination} onClick={handleIncrement}>
              Next
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
