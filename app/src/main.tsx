import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

import App from "./App.tsx";
import Home from "./views/Home.tsx";
import Futsal from "./views/Futsal.tsx";
import Booking from "./views/Booking.tsx";
import SignIn from "./views/SignIn.tsx";
import SignUp from "./views/SignUp.tsx";
import AdminDashboard from "./views/AdminDashboard.tsx";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import baseApi from "./redux/api/base-api.ts";

import { GoogleOAuthProvider } from "@react-oauth/google";

// Validate environment variable
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error(
    "Missing Google OAuth CLIENT_ID. Please set VITE_CLIENT_ID in your .env file."
  );
}

// Router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="futsal" element={<Futsal />} />
      <Route path="booking/:id" element={<Booking />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="admin" element={<AdminDashboard />} />
    </Route>
  )
);

// Render the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <ApiProvider api={baseApi}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </ApiProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
