import React, { useContext } from "react";
import classes from "./Header.module.css";
import DataContext from "../contexts/DataContext";

const Header = () => {
  const {
    state: { error },
  } = useContext(DataContext);

  return (
    <header className={classes.header}>
      <span>Spacestagram</span>
      <h3>Image-sharing from the final frontier</h3>
      {error.length !== 0 ? <p className={classes.error}>{error}</p> : null}
    </header>
  );
};

export default Header;
