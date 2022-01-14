import React, { useEffect, useState, useContext } from "react";
import Card from "./Card";
import classes from "./Cards.module.css";
import { Spinner } from "react-bootstrap";
import DataContext from "../contexts/DataContext";
import Button from "react-bootstrap/Button";

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const {
    state: { spaceData, error },
    getData,
    getMoreData,
  } = useContext(DataContext);

  const onPressLoadMore = ()=>{
    setLoadMoreLoading(true)
    getMoreData(() => setLoadMoreLoading(false))
  }

  useEffect(() => {
    getData(() => setLoading(false));
  }, []);

  return (
    <>
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
      {!loading ? (
        <Button
          className={classes.loadMore}
          onClick={onPressLoadMore}
          disabled = {loadMoreLoading}
        >
          {loadMoreLoading ? (
            <Spinner animation="border" variant="light"/>
          ) : (
            "Load More"
          )}
        </Button>
      ) : null}
    </>
  );
};

export default Cards;
