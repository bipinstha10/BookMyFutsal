import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import { ToastContainer } from "react-toastify";
import Home from "./views/Home.tsx";
import Futsal from "./views/Futsal.tsx";
import Booking from "./views/Booking.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import baseApi from "./redux/api/base-api.ts";
import AdminDashboard from "./views/AdminDashboard.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="futsal" element={<Futsal />} />
      <Route path="booking/:id" element={<Booking />} />
      <Route path="admin" element={<AdminDashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={baseApi}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </ApiProvider>
  </StrictMode>
);
