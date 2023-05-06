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

  return (
    <div>
      <button onClick={handleClick}>Submit</button>
      <div>
        <h2>pData Grid</h2>
        <table>
          <thead>
            <tr>
              <th>seQ_NO</th>
              <th>parA_TYPE</th>
              <th>nativE_VALUE</th>
              <th>description</th>
              <th>g_PARA_TYPE</th>
              <th>sorT_NO</th>
              <th>synonyM_LIST</th>
              <th>starT_NO</th>
              <th>enD_NO</th>
              <th>columN_NAME</th>
              <th>tranS_TYPE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{pData.seQ_NO}</td>
              <td>{pData.parA_TYPE}</td>
              <td>{pData.nativE_VALUE}</td>
              <td>{pData.description}</td>
              <td>{pData.g_PARA_TYPE}</td>
              <td>{pData.sorT_NO}</td>
              <td>{pData.synonyM_LIST}</td>
              <td>{pData.starT_NO}</td>
              <td>{pData.enD_NO}</td>
              <td>{pData.columN_NAME}</td>
              <td>{pData.tranS_TYPE}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>vData Grid</h2>
        <table>
          <thead>
            <tr>
              <th>seQ_NO</th>
              <th>typE_SEQ</th>
              <th>parA_VALUE</th>
              <th>description</th>
              <th>caption</th>
              <th>shortT_VALUE</th>
              <th>nativE_VALUE</th>
              <th>g_PARA_VALUE_1</th>
              <th>g_PARA_VALUE_2</th>
              <th>iS_REQUIRED</th>
              <th>synonyM_LIST</th>
              <th>sorT_NO</th>
              <th>iS_ACTIVE</th>
              <th>filter</th>
              <th>tranS_TYPE</th>
            </tr>
          </thead>
          <tbody>
            {vData.map((item, index) => (
              <tr key={index}>
                <td>{item.seQ_NO}</td>
                <td>{item.typE_SEQ}</td>
                <td>{item.parA_VALUE}</td>
                <td>{item.description}</td>
                <td>{item.caption}</td>
                <td>{item.shorT_VALUE}</td>
                <td>{item.nativE_VALUE}</td>
                <td>{item.g_PARA_VALUE_1}</td>
                <td>{item.g_PARA_VALUE_2}</td>
                <td>{item.iS_REQUIRED}</td>
                <td>{item.synonyM_LIST}</td>
                <td>{item.sorT_NO}</td>
                <td>{item.iS_ACTIVE}</td>
                <td>{item.filter}</td>
                <td>{item.tranS_TYPE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyComponent;
