import React, { createContext, useState } from "react";

const MainContext = createContext();

function MainStateProvider({ children }) {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <MainContext.Provider
      value={{
        rows,
        setRows,
        rows2,
        setRows2,
        isLoad,
        setIsLoad,
        selectedRow,
        setSelectedRow,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export { MainContext, MainStateProvider };
