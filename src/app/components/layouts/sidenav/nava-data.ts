import { INavBarData } from "./helper";

export const navbarData: INavBarData[] = [
  {
    routeLink: "dashboard",
    icon: "fa-solid fa-chart-line",
    label: "Dashboard",
  },
  {
    icon: "fa-regular fa-folder-open",
    routeLink: "ticket",
    label: "Gestión de tickets",
    items: [
      {
        routeLink: "ticket/registro",
        label: "Nuevo ticket",
      },
      {
        routeLink: "ticket",
        label: "Consultar tickets",
      },
    ],
  },
  {
    routeLink: "reportes",
    icon: "fa-regular fa-file-lines",
    label: "Reportes",
    items: [
      {
        routeLink: "reportes/categoria",
        label: "Por categoría",
      },
      {
        routeLink: "reportes/tipo-solicitud",
        label: "Por Tipo de solicitud",
      },

      {
        routeLink: "reportes/agente",
        label: "Agente asignado",
      },
      {
        routeLink: "reportes/agente-registra",
        label: "Agente que registra",
      },
      {
        routeLink: "reportes/ubicacion",
        label: "Por ubicacion",
      },
    ],
  },
];
