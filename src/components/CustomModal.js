import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import classes from "./Modal.module.css";
import { Spinner } from "react-bootstrap";
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
    maxHeight: "80%",
    minHeight: "200px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
};

const CustomModal = () => {
  const { date } = useParams();
  const { getCustomData } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getData = async () => {
    console.log(await getCustomData(date));
    setData(await getCustomData(date));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [date]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const onPressLike = (object) => {
    object.like = !object.like;
    setData({ ...object });

    if (object.like) {
      localStorage.setItem(object.title, "liked");
    } else {
      localStorage.removeItem(object.title);
    }
  };

  return (
    <Modal
      isOpen={openModal}
      style={customStyles}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      {!loading ? (
        <div className={classes.modalContainer}>
          <img className={classes.image} src={data.hdurl} />
          <div className={classes.textContainer}>
            <h1>{data.title}</h1>
            <h5>{data.date}</h5>
            <div className={classes.explanation}>
              <p>{data.explanation}</p>
            </div>
            <span className={classes.heart}>
              <i
                style={{ color: data.like ? "red" : "black" }}
                className={data.like ? "fa fa-heart" : "fa fa-heart-o"}
                aria-hidden="true"
                onClick={(e) => {
                  onPressLike(data);
                }}
              ></i>{" "}
            </span>
          </div>
        </div>
      ) : (
        <div className={classes.spinner}>
          <Spinner animation="border" />
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
