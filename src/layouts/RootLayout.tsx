// src/layouts/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return <Outlet />; // ❗ nada de <Footer /> aqui
}
