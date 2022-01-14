import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import classes from "./Modal.module.css";
import ModalContext from "../contexts/ModalContext";
import DataContext from "../contexts/DataContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    padding: "20px",
    maxHeight: "80%"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
};

const DetailsModal = () => {

  const {state : {openModal}, closeModal} = useContext(ModalContext);
  const {state : {spaceData}, onPressLike} = useContext(DataContext)

  const data = openModal.index > -1 ? spaceData[openModal.index] : {};

  return (
    <Modal
      isOpen={openModal.state}
      style={customStyles}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={classes.modalContainer}>
     <img className={classes.image} src = {data.hdurl}/>
     <div className={classes.textContainer}>
     <h1>{data.title}</h1>
     <h5>{data.date}</h5>
     <div className={classes.explanation}>
     <p>{data.explanation}</p>
     </div>
     <span className={classes.heart}>
          <i
            style={{ color: data.like? "red" : "black" }}
            className={data.like? "fa fa-heart" : "fa fa-heart-o"}
            aria-hidden="true"
            onClick={(e)=>{
              onPressLike(data)}}
          ></i>{" "}
        </span>
      </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
