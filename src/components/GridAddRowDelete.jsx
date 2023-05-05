import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import "./grid.css";

const GridAddRowDelete = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

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

  const handleSubmit = () => {
    axios
      .post("http://f10/api/ParaTypeDemo/CRUDParaValueType", {
        value1,
        value2,
      })
      .then(() => {
        axios
          .get("http://f10/api/ParaTypeDemo/GetParaTypeMas")
          .then((res) => {
            setRows(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        axios
          .get("http://f10/api/ParaTypeDemo/GetParaValueMas")
          .then((res) => {
            setRows2(res.data);
          })
          .catch((error) => {
            console.log(error);
          });

        setValue1("");
        setValue2("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 style={myStyles}>Parameter Type Master</h2>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Value 1"
          variant="outlined"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
        <TextField
          label="Value 2"
          variant="outlined"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Add Row
        </Button>
      </Box>
      <DataGrid
        rows={rows}
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

const getRowId2 = (row) => row.seQ_NO;

export default GridAddRowDelete;
