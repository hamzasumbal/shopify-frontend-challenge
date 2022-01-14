import React, { useState } from "react";

const DataContext = React.createContext();

export const Provider = ({ children }) => {
  //define States
  const [spaceData, setSpaceData] = useState([]);
  const [error, setError] = useState("");

  const getData = async (callback) => {
    try {
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=9wChezTPPYejHAnvpDCq6h3vbxSE58vagZEJVDLW&count=8"
        /* "https://api.nasa.gov/planetary/apod?api_key=9wChezTPPYejHAnvpDCq6h3vbxSE58vagZEJVDLW&date=2006-08-10" */
      );
      const data = await response.json();
      addLikeToArray(data, callback);
    } catch {
      setError("Request Failed, Please try again");
    }
  };

  const addLikeToArray = (data, callback) => {

    for (let i = 0; i < data.length; i++) {
      if (localStorage.getItem(data[i].title) === "liked") {
        data[i] = { ...data[i], like: true };
      } else {
        data[i] = { ...data[i], like: false };
      }
    }
    setSpaceData(data);
    callback();
  };

  const onPressLike = (object) => {
      if(!object.like)
      {
        localStorage.setItem(object.title, "liked");
      }
      else
      {
        localStorage.removeItem(object.title);
      }
    

    setSpaceData((prev) => {
      const index = prev.indexOf(object);
      prev[index] = { ...object, like: !object.like };
      return [...prev];
    });
  };

  return (
    <DataContext.Provider
      value={{
        state: spaceData,
        error,
        getData,
        onPressLike,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
