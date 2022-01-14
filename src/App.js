import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cards from "./components/Cards";
import DetailsModal from "./components/Modal";
import CustomModal from "./components/CustomModal";

function App() {
  return (
    <div className="App">
      <Header />
      <Cards />
      <DetailsModal />
      <Routes>
        <Route path={"/:date"} element={<CustomModal />} />
      </Routes>
    </div>
  );
}

export default App;
