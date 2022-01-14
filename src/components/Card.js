import React,{useContext, useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import classes from './Card.module.css'
import ModalContext from '../contexts/ModalContext';

const HSCard = ({data})=>{


    const {onPressCard} = useContext(ModalContext);


    return<Card style={{ width: '18rem' }} className={classes.card} onClick = {()=>onPressCard(data)} >
      <div className = {classes.imageContainer}>
    <Card.Img className={classes.image} variant="top" src={data.url} />
    </div>
    <Card.Body className = {classes.cardBody}>
      <Card.Title className = {classes.title}>{data.title}</Card.Title>
      <Card.Text style = {{marginBottom : "5px"}}>
        {data.date}
      </Card.Text>
      <Card.Text>
        {data.explanation.substring(0,150)} ...
      </Card.Text>
      <Button className = {classes.button}>Like</Button>
    </Card.Body>
  </Card>
}


export default HSCard;