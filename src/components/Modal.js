import React, { useState, useContext } from "react";
import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import classes from "./Modal.module.css";
import ModalContext from "../contexts/ModalContext";


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
    maxHeight: "90%"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
};

const DetailsModal = () => {


  const {state : {openModal}, closeModal} = useContext(ModalContext)

  const data = openModal.data;

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
      <Button className = {classes.button}>Like</Button>
      </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
