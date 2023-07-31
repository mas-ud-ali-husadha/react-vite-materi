import { lazy } from "react";

export default [
  {
    key: "setting",
    path: "/",
    component: lazy(() => import("@/views/Setting/Users")),
    authority: [],
  },
  {
    key: "category",
    path: "/category",
    component: lazy(() => import("@/views/Setting/Category")),
    authority: [],
  },
  {
    key: "menu",
    path: "/menu",
    component: lazy(() => import("@/views/Setting/Product")),
    authority: [],
  },
  {
    key: "menu-add",
    path: "/menu/add",
    component: lazy(() => import("@/views/Setting/Product/Add")),
    authority: [],
  },
];
