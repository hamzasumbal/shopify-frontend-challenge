import React, { useEffect, useState } from "react";
import Card from "./Card";
import classes from "./Cards.module.css";
import { Spinner } from "react-bootstrap";

const Cards = () => {
  const [spaceData, setSpaceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=9wChezTPPYejHAnvpDCq6h3vbxSE58vagZEJVDLW&count=8"
        );
        const data = await response.json();
        console.log(data);
        setSpaceData(data);
        setLoading(false);
      } catch {
        console.log("Error");
      }
    };

    getData();
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
