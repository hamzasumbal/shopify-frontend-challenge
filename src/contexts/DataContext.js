import React, { useState } from "react";

const DataContext = React.createContext();

const API_URL = "https://api.nasa.gov/planetary/apod?api_key=9wChezTPPYejHAnvpDCq6h3vbxSE58vagZEJVDLW"

export const Provider = ({ children }) => {
  //define States
  const [spaceData, setSpaceData] = useState([]);
  const [error, setError] = useState("");

  const getData = async (callback) => {
    try {
      const response = await fetch(`${API_URL}&count=8`);
      const data = await response.json();
      if(data.code === 500)
      {
        throw "Server Error"
      }
      const UpdatedData = addLikeToArray(data);
      
    
      setSpaceData(UpdatedData);
      callback();

    } catch(e) {
      setError("Request Failed, Please try again");
    }
  };

  const getMoreData = async (callback) => {
    try {
      const response = await fetch(`${API_URL}&count=8`);
      const data = await response.json();
      const UpdatedData = addLikeToArray(data);
      setSpaceData(prev => [...prev,...UpdatedData])
      callback()
    } catch {
      setError("Request Failed, Please try again");
    }
  };

  const getCustomData = async(date)=>{

    try {
      const response = await fetch(`${API_URL}&date=${date}`);
      const data = await response.json();
      const UpdatedData = addLikeToArray([data]);
      return UpdatedData[0]
    } catch {
      setError("Request Failed, Please try again");
    }
  }

  const addLikeToArray = (data) => {

    for (let i = 0; i < data.length; i++) {
      if (localStorage.getItem(data[i].title) === "liked") {
        data[i] = { ...data[i], like: true };
      } else {
        data[i] = { ...data[i], like: false };
      }
    }
    return data;
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
        state: {spaceData,error},
        getData,
        onPressLike,
        getMoreData,
        getCustomData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
