import React, { useContext } from "react";
import Modal from "react-modal";
import classes from "./Modal.module.css";
import ModalContext from "../contexts/ModalContext";
import DataContext from "../contexts/DataContext";
import { Alert } from "bootstrap";


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
    maxHeight: "80%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
};

const DetailsModal = () => {

  const currentURL = window.location.href
  const {
    state: { openModal },
    closeModal,
  } = useContext(ModalContext);
  const {
    state: { spaceData },
    onPressLike,
  } = useContext(DataContext);

  const data = openModal.index > -1 ? spaceData[openModal.index] : {};

  const onPressShare = ()=>{
    window.alert(`Shareable URL : ${currentURL}${data.date}`)
  }

  return (
    <Modal
      isOpen={openModal.state}
      style={customStyles}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className={classes.modalContainer}>
        <img className={classes.image} src={data.hdurl} />
        <div className={classes.textContainer}>
          <h1>{data.title}</h1>
          <h5>{data.date}</h5>
          <div className={classes.explanation}>
            <p>{data.explanation}</p>
          </div>
          <div className={classes.buttonContainer}>
          <span className={classes.icon}>
            <i
              style={{ color: data.like ? "red" : "black" }}
              className={data.like ? "fa fa-heart" : "fa fa-heart-o"}
              aria-hidden="true"
              onClick={(e) => {
                onPressLike(data);
              }}
            ></i>{" "}
          </span >
          <span className={classes.icon} onClick={onPressShare}>
          <i className="fa fa-share-square"></i>
          </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
