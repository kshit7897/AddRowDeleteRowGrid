import React, { useState } from "react";
import axios from "axios";

function MyComponent() {
  const [pData, setPData] = useState({
    seQ_NO: "0",
    parA_TYPE: "TEST",
    nativE_VALUE: "TEST",
    description: "TEST",
    g_PARA_TYPE: "TEST",
    sorT_NO: "1",
    synonyM_LIST: "",
    starT_NO: "",
    enD_NO: "",
    columN_NAME: "",
    tranS_TYPE: "INSERT",
  });

  const [vData, setVData] = useState([
    {
      seQ_NO: "0",
      typE_SEQ: "0",
      parA_VALUE: "T1",
      description: "T1",
      caption: "T1",
      shorT_VALUE: "T1",
      nativE_VALUE: "T1",
      g_PARA_VALUE_1: "T1",
      g_PARA_VALUE_2: "T1",
      iS_REQUIRED: "",
      synonyM_LIST: "",
      sorT_NO: "1",
      iS_ACTIVE: "",
      filter: "",
      tranS_TYPE: "INSERT",
    },
  ]);

  const [newVData, setNewVData] = useState({
    seQ_NO: "",
    typE_SEQ: "",
    parA_VALUE: "",
    description: "",
    caption: "",
    shorT_VALUE: "",
    nativE_VALUE: "",
    g_PARA_VALUE_1: "",
    g_PARA_VALUE_2: "",
    iS_REQUIRED: "",
    synonyM_LIST: "",
    sorT_NO: "",
    iS_ACTIVE: "",
    filter: "",
    tranS_TYPE: "INSERT",
  });

  const [newpData, setNewpData] = useState({
    seQ_NO: "",
    parA_TYPE: "",
    nativE_VALUE: "",
    description: "",
    g_PARA_TYPE: "",
    sorT_NO: "",
    synonyM_LIST: "",
    starT_NO: "",
    enD_NO: "",
    columN_NAME: "",
    tranS_TYPE: "INSERT",
  });

  function handleClick() {
    fetch("http://f10/api/ParaTypeDemo/CRUDParaValueType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pData, vData }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function handleNewVDataChange(event) {
    const { name, value } = event.target;
    setNewVData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleNewpDataChange(event) {
    const { name, value } = event.target;
    setNewpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAddVData() {
    setVData((prevData) => [...prevData, newVData]);
    setNewVData({
      seQ_NO: "",
      typE_SEQ: "",
      parA_VALUE: "",
      description: "",
      caption: "",
      shorT_VALUE: "",
      nativE_VALUE: "",
      g_PARA_VALUE_1: "",
      g_PARA_VALUE_2: "",
      iS_REQUIRED: "",
      synonyM_LIST: "",
      sorT_NO: "",
      iS_ACTIVE: "",
      filter: "",
      tranS_TYPE: "INSERT",
    });
  }

  return (
    <div>
      <div>
        <h2>Add New vData Item</h2>
        <form>
          <label>seQ_NO:</label>
          <input
            type="text"
            name="seQ_NO"
            value={newVData.seQ_NO}
            onChange={handleNewVDataChange}
          />
          <label>typE_SEQ:</label>
          <input
            type="text"
            name="typE_SEQ"
            value={newVData.typE_SEQ}
            onChange={handleNewVDataChange}
          />
          <label>parA_VALUE:</label>
          <input
            type="text"
            name="parA_VALUE"
            value={newVData.parA_VALUE}
            onChange={handleNewVDataChange}
          />
          <label>description:</label>
          <input
            type="text"
            name="description"
            value={newVData.description}
            onChange={handleNewVDataChange}
          />
          <label>caption:</label>
          <input
            type="text"
            name="caption"
            value={newVData.caption}
            onChange={handleNewVDataChange}
          />
          <label>shorT_VALUE:</label>
          <input
            type="text"
            name="shorT_VALUE"
            value={newVData.shorT_VALUE}
            onChange={handleNewVDataChange}
          />
          <label>nativE_VALUE:</label>
          <input
            type="text"
            name="nativE_VALUE"
            value={newVData.nativE_VALUE}
            onChange={handleNewVDataChange}
          />
          <label>g_PARA_VALUE_1:</label>
          <input
            type="text"
            name="g_PARA_VALUE_1"
            value={newVData.g_PARA_VALUE_1}
            onChange={handleNewVDataChange}
          />
          <label>g_PARA_VALUE_2:</label>
          <input
            type="text"
            name="g_PARA_VALUE_2"
            value={newVData.g_PARA_VALUE_2}
            onChange={handleNewVDataChange}
          />
          <label>iS_REQUIRED:</label>
          <input
            type="text"
            name="iS_REQUIRED"
            value={newVData.iS_REQUIRED}
            onChange={handleNewVDataChange}
          />
          <label>synonyM_LIST:</label>
          <input
            type="text"
            name="synonyM_LIST"
            value={newVData.synonyM_LIST}
            onChange={handleNewVDataChange}
          />
          <label>sorT_NO:</label>
          <input
            type="text"
            name="sorT_NO"
            value={newVData.sorT_NO}
            onChange={handleNewVDataChange}
          />
          <label>iS_ACTIVE:</label>
          <input
            type="text"
            name="iS_ACTIVE"
            value={newVData.iS_ACTIVE}
            onChange={handleNewVDataChange}
          />
          <label>filter:</label>
          <input
            type="text"
            name="filter"
            value={newVData.filter}
            onChange={handleNewVDataChange}
          />
        </form>
        <button onClick={handleAddVData}>Add New vData Item</button>
      </div>
      <div>
        <h2>pData</h2>
        <p>{JSON.stringify(pData)}</p>
      </div>
      <div>
        <h2>vData</h2>
        <ul>
          {vData.map((data) => (
            <li key={data.seQ_NO}>{JSON.stringify(data)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Submit Data</h2>
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}
export default MyComponent;
