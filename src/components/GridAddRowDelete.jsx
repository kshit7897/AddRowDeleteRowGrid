
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const GridAddRowDelete = () => {
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newRow, setNewRow] = useState(null)

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


  useEffect(() => {
    if (newRow) {
      axios
        .post("http://f10/api/ParaTypeDemo/CRUDParaValueType", newRow)
        .then((response) => {
          setNewRow(setNewRow({
            seQ_NO: "",
            parA_VALUE: "",
            description: "",
            caption: "", 
            shorT_VALUE: "",
            nativE_VALUE: "",
            g_PARA_TYPE: "",
            // typE_SEQ: selectedRow.seQ_NO,
            typE_SEQ: "",
            tranS_TYPE: "INSERT"
          }));
          // Reload data after adding new row
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newRow]);

  const handleAddRowClick = () => {
    const newId = rows.length + 1;
    setNewRow({
      seQ_NO: "0",
      parA_VALUE: "",
      description: "",
      caption: "",
      shorT_VALUE: "",
      nativE_VALUE: "",
      g_PARA_TYPE: "",
      // typE_SEQ: selectedRow.seQ_NO,
    typE_SEQ: "",
      tranS_TYPE: "INSERT"
    });
  };


  const columns = [
    { field: "parA_TYPE", headerName: "Parameter", flex: 1},
    { field: "description", headerName: "Description", flex: 1},
    { field: "nativE_VALUE", headerName: "Native Value", flex: 1},
    { field: "g_PARA_TYPE", headerName: "Group Name", flex: 1},
    { field: "sorT_NO", headerName: "Sort No.", flex: 1},
    { field: "seQ_NO", headerName: "Seq No.", flex: 1},
  ];

  const columns2 = [
    { field: "parA_VALUE", headerName: "Value", flex: 1,},
    { field: "description", headerName: "Description", flex: 1},
    { field: "caption", headerName: "Caption", flex: 1,},
    { field: "shorT_VALUE", headerName: "Short Name", flex: 1},
    { field: "nativE_VALUE", headerName: "Native Value", flex: 1},
    { field: "g_PARA_VALUE_1", headerName: "G Para Value 1", flex: 1},
    { field: "g_PARA_VALUE_2", headerName: "G Para Value 2", flex: 1},
    { field: "sorT_NO", headerName: "Sort No.", flex: 1},
    { field: "typE_SEQ", headerName: "Type Seq", flex: 1},
  ];

  return (  
    <>
      <Box>
     
        <div className="table">
          <h4 style={myStyles}>Parameter Type</h4>
          <div
            className="datatable-container"
            style={{ height: 350, width: "100%" }}
          >
            <DataGrid
              rows={rows}
              density="compact"
              columns={columns}
              loading={isLoad}
              getRowId={getRowId}
              onRowClick={handleRowClick}
              components={{ Toolbar: GridToolbar }}
            />
                    <button onClick={handleAddRowClick}>Add Row</button>
          </div>
        </div>
        <div className="table">
          <h4 style={myStyles}>Parameter Value</h4>
          <div
            className="datatable-container"
            style={{ height: 350, width: "100%" }}
          >
            <DataGrid
              rows={rows2}
              columns={columns2}
              loading={isLoad}
              density="compact"
              getRowId={getRowId}
              pagination
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </div>

      </Box>
    </>
  );
}
export default GridAddRowDelete

