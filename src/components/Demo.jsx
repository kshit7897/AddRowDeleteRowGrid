import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import "./grid.css";

const Demo = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const getRowId2 = (row) => row.seQ_NO;

  const myStyles = {
    backgroundColor: "skyBlue",
    padding: "2px",
  };

  const getRowId = (row) => row.seQ_NO;

  useEffect(() => {
    axios
      .get("http://f10/api/ParaTypeDemo/GetParaTypeMas")
      .then((res) => {
        setRows(res.data);
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://f10/api/ParaTypeDemo/GetParaValueMas")
      .then((response) => {
        setRows2(response.data);
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRowClick = (params) => {
    const seQ_NO = params.row.seQ_NO;
    setSelectedRow(params.row);

    const filteredRows = rows2.filter((row) => row.typE_SEQ === seQ_NO);
    setRows2(filteredRows);
  };

  useEffect(() => {
    if (selectedRow) {
      axios
        .get(`http://f10/api/ParaTypeDemo/GetParaValueMas`)
        .then((response) => {
          const filteredRows = response.data.filter(
            (row) => row.typE_SEQ === selectedRow.seQ_NO
          );
          setRows2(filteredRows);
          setIsLoad(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setRows2([]);
    }
  }, [selectedRow]);

  // ===========================================================================

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
  // ====================================================================================

  const columns = [
    { field: "parA_TYPE", headerName: "Parameter", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "nativE_VALUE", headerName: "Native Value", flex: 1 },
    { field: "g_PARA_TYPE", headerName: "Group Name", flex: 1 },
    { field: "sorT_NO", headerName: "Sort No.", flex: 1 },
    { field: "seQ_NO", headerName: "Seq No.", flex: 1 },
  ];

  const columns2 = [
    { field: "parA_VALUE", headerName: "Value", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "caption", headerName: "Caption", flex: 1 },
    { field: "shorT_VALUE", headerName: "Short Name", flex: 1 },
    { field: "nativE_VALUE", headerName: "Native Value", flex: 1 },
    { field: "g_PARA_VALUE_1", headerName: "G Para Value 1", flex: 1 },
    { field: "g_PARA_VALUE_2", headerName: "G Para Value 2", flex: 1 },
    { field: "sorT_NO", headerName: "Sort No.", flex: 1 },
    { field: "typE_SEQ", headerName: "Type Seq", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 style={myStyles}>Parameter Type Master</h2>
      <DataGrid
        rows={rows}
        density="compact"
        columns={columns}
        getRowId={getRowId}
        onRowClick={handleRowClick}
        loading={isLoad}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <h2 style={myStyles}>Parameter Value Master</h2>
      <DataGrid
        rows={rows2}
        density="compact"
        columns={columns2}
        getRowId={getRowId2}
        loading={isLoad}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default Demo;
