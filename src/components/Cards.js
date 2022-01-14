import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import classes from "./Cards.module.css";
import { Spinner } from "react-bootstrap";
import DataContext from "../contexts/DataContext";

const Cards = () => {

  const [loading, setLoading] = useState(true);
  const {state : spaceData , getData} = useContext(DataContext)

  useEffect(() => {
    getData(()=>setLoading(false));
  }, []);

  return (
    <section className={classes.cardsContainer}>
      {loading ? (
        <div className={classes.spinner}>
        <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <>
          {spaceData.map((item, index) => {
            return <Card key={index} data={item} />;
          })}
        </>
      )}
    </section>
  );
};

export default Cards;
