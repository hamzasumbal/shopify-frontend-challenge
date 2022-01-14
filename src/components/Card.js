import React, { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./Card.module.css";
import ModalContext from "../contexts/ModalContext";
import DataContext from "../contexts/DataContext";

const HSCard = ({ data }) => {
  const { onPressCard } = useContext(ModalContext);
  const {state : {spaceData},  onPressLike } = useContext(DataContext);

  return (
    <Card
      style={{ width: "18rem" }}
      className={classes.card}
      onClick={(e) => onPressCard(spaceData.indexOf(data))}
    >
      <div className={classes.imageContainer}>
        <Card.Img className={classes.image} variant="top" src={data.url} />
      </div>
      <Card.Body className={classes.cardBody}>
        <Card.Title className={classes.title}>{data.title}</Card.Title>
        <Card.Text style={{ marginBottom: "5px" }}>{data.date}</Card.Text>
        <Card.Text>{data.explanation.substring(0, 150)} ...</Card.Text>
      </Card.Body>
      <span className={classes.heart}>
          <i
            style={{ color: data.like? "red" : "white" }}
            className={data.like? "fa fa-heart" : "fa fa-heart-o"}
            aria-hidden="true"
            onClick={(e) => {
              e.stopPropagation();
              onPressLike(data)}}
          ></i>{" "}
        </span>
        <span className={classes.seeMore}>Read more</span>
        
    </Card>
  );
};

export default HSCard;
