import React, { useState } from "react";

const ModalContext = React.createContext();

export const Provider = ({ children }) => {
  //define States
  const [openModal, setOpenModal] = useState({ state: false, data: {} });

  const onPressCard = (data) => {
    setOpenModal({state : true, data: data});
  };

  const closeModal = () => {
    setOpenModal({state: false, data: {} });
  };



  return (
    <ModalContext.Provider
      value={{
        state: { openModal},
        onPressCard,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
