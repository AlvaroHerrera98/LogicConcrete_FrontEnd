import React from "react";
import * as MuiIcon from "@mui/icons-material/";

export const SidebarData = [
  {
    title: "Planta Principal",
    path: "/main",
    icon: <MuiIcon.Home />,
    cName: "nav-text",
  },
  {
    title: "Mezclas",
    path: "/main/mixtures",
    icon: <MuiIcon.Assignment />,
    cName: "nav-text",
  },
  {
    title: "Ordenes",
    path: "/main/orders",
    icon: <MuiIcon.AutoAwesomeMotion />,
    cName: "nav-text",
  },
  {
    title: "Clientes",
    path: "/main/clients",
    icon: <MuiIcon.People />,
    cName: "nav-text",
  },
  {
    title: "Empleados",
    path: "/main/employees",
    icon: <MuiIcon.AssignmentInd />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <MuiIcon.Logout />,
    cName: "nav-text",
  },
];
