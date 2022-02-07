import React from 'react';
// import { useDispatch } from 'react-redux';
// import { clearMessageError } from '../../actions/message';
import styles from './Notification.module.css';

function Notification(props) {
  const { message, error, clear } = props;
  //   const dispatch = useDispatch();

  return (
    <div className={error ? styles.notification_error : styles.notification}>
      <p className={styles.notification_text}>{message}</p>
    </div>
  );
}

export default Notification;
