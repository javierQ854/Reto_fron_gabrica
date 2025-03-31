import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Lista.css"
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Typography, Button } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icono de salida
import FileDownloadIcon from "@mui/icons-material/FileDownload"; // Icono de Excel

const localeText = {
  noRowsLabel: "No hay datos disponibles",
  columnMenuSortAsc: "Ordenar ascendente",
  columnMenuSortDesc: "Ordenar descendente",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar columna",
  columnMenuShowColumns: "Mostrar columnas",
  footerRowSelected: (count) =>
    count === 1 ? "1 fila seleccionada" : `${count} filas seleccionadas`,
  toolbarExport: "Exportar",
  toolbarExportCSV: "Exportar a CSV",
  toolbarExportExcel: "Exportar a Excel",
  MuiTablePagination: {
    labelRowsPerPage: "Filas por página:",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
  },
};

const Lista = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:8000/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(res.data.data);
        setFilteredLeads(res.data.data);
      } catch (error) {
        console.error("Error al obtener los leads:", error);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredLeads(leads);
      return;
    }

    const filtered = leads.filter((lead) => {
      const leadDate = new Date(lead.fecha);
      return leadDate >= new Date(startDate) && leadDate <= new Date(endDate);
    });

    setFilteredLeads(filtered);
  }, [startDate, endDate, leads]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelFile, "Lista_Clientes.xlsx");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Cliente", width: 150 },
    { field: "nit", headerName: "NIT", width: 100 },
    { field: "nombre_punto", headerName: "Punto", width: 150 },
    { field: "nombre_equipo", headerName: "Equipo", width: 150 },
    { field: "ciudad", headerName: "Ciudad", width: 120 },
    { field: "promotor", headerName: "Promotor", width: 150 },
    { field: "rtc", headerName: "RTC", width: 100 },
    { field: "capitan_usuario", headerName: "Capitán", width: 150 },
    { field: "ip", headerName: "IP", width: 120 },
    { field: "fecha", headerName: "Fecha", width: 120 },
    { field: "hora", headerName: "Hora", width: 100 },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    navigate("/"); // Redirige al login
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "#37095A",display:"flex", justifyContent:"space-between",alignItems:"center", paddingLeft: 3, paddingTop: 2, paddingBottom: 1 }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: "white" }}>
          Lista de Clientes
        </Typography>
        <Button startIcon={<ExitToAppIcon sx={{ fill: "white" }}/>} sx={{
            marginRight:3,
            backgroundColor: "#860000", // Color de fondo normal
            color: "white", // Color del texto
            "&:hover": {
              backgroundColor: "#D33B3B", // Color al pasar el mouse
            },
          }} variant="contained"  onClick={handleLogout}>
            Salir
          </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2, padding: 3, justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Fecha Inicio"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Fecha Fin"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <Button startIcon={<FileDownloadIcon sx={{fill: "white" }} />} sx={{
            backgroundColor: "#007E49", // Color de fondo normal
            color: "white", // Color del texto
            "&:hover": {
              backgroundColor: "#02A661", // Color al pasar el mouse
            },
          }} variant="contained" color="primary" onClick={exportToExcel}>
            Exportar Excel
          </Button>
        </Box>

      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <DataGrid
          rows={filteredLeads}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
          getRowId={(row) => row.id}
          localeText={localeText}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "black",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
          
        />

      </Box>

    </Box>
  );
};

export default Lista;
