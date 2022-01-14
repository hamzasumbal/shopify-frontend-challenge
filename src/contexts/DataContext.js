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
      );
      const data = await response.json();
      console.log(data);
      addLikeToArray(data, callback)
    } catch {
      setError("Request Failed, Please try again")
    }
  };

  const addLikeToArray = (data, callback)=>{

    for(let i = 0; i < data.length ; i++)
    {
        data[i] = {...data[i], like : false}
    }
    setSpaceData(data);
    callback();
    console.log(data);
  };

  const onPressLike = (object)=>{

    setSpaceData(prev => {
        const index = prev.indexOf(object);
        prev[index] = {...object, like : !object.like};
        return [...prev];
    })

  }



  return (
    <DataContext.Provider
      value={{
        state:  spaceData, error,
        getData,
        onPressLike
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
