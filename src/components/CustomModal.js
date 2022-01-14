import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useParams, useNavigate } from "react-router-dom";
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
  const currentURL = window.location.href;

  const { date } = useParams();
  const navigate = useNavigate();
  const { getCustomData } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    const data = await getCustomData(date);
    if (data.code === 400) {
      setError(true);
      return;
    }
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [date]);

  const closeModal = () => {
    navigate("/");
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

  const onPressShare = () => {
    window.alert(`Shareable URL : ${currentURL}`);
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
              </span>
              <span className={classes.icon} onClick={onPressShare}>
                <i className="fa fa-share-square"></i>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.spinner}>
            {error? <h1>No Data Found</h1> : <Spinner animation="border" />}
          </div>
        </>
      )}
    </Modal>
  );
};

export default CustomModal;
