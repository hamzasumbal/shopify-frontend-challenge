import React, { useState } from "react";

const ModalContext = React.createContext();

export const Provider = ({ children }) => {
  //define States
  const [openModal, setOpenModal] = useState({ state: false, index: -1 });

  const onPressCard = (index) => {
    setOpenModal({state: true, index : index});
  };

  const closeModal = () => {
    setOpenModal({state: false, index : -1 });
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
