"use client";

import "./globals.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </PrimeReactProvider>
  );
}
