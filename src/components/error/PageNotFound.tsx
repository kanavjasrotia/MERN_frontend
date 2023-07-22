import React from "react";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={`${styles.not_found}`}>
      <h1 className={`${styles.h}`}>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for could not be found.</p>
    </div>
  );
};

export default NotFound;
