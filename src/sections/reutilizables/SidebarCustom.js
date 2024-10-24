import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { BusinessCenterOutlined } from "@mui/icons-material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "./theme";

const Item = ({ title, to, icon, selected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      icon={React.cloneElement(icon, {
        style: { fontSize: "24px", color: colors.greenAccent[400] }, // Icono más grande y con color vibrante
      })}
      onClick={onClick} // Agregar la funcionalidad onClick aquí
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [name, setName] = useState(""); // Estado para almacenar el nombre

  // useEffect para obtener el nombre de localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName); // Actualizar el estado con el nombre almacenado
    }
  }, []);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <br /><br /><br />
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  Aj Arin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name || "Abel"} {/* Mostrar el nombre del localStorage o "Abel" como valor por defecto */}
                </Typography>
                <Typography
                  variant="h6"
                  color={colors.greenAccent[500]}
                  fontWeight="bold"
                  letterSpacing="0.05em"
                  lineHeight="1.5"
                  sx={{
                    m: "10px 0 0 0",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  Administrador
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon style={{ fontSize: "24px", color: "#FFD700" }} />}
            />
            <Item
              title="Reportes"
              to="/reports"
              icon={<BusinessCenterOutlined style={{ fontSize: "24px", color: "#32CD32" }} />}
            />
            <Item
              title="Administradores"
              to="/admins"
              icon={<PeopleOutlinedIcon style={{ fontSize: "24px", color: "#00BFFF" }} />}
            />

            <Item
              title="Cerrar Sesión"
              to="/"
              icon={<HomeOutlinedIcon style={{ fontSize: "24px", color: "#FFD700" }} />}
              onClick={() => {
                // Elimina el token del localStorage
                localStorage.removeItem("name");
                localStorage.removeItem("dpi");
              }}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
