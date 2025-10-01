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
import "remixicon/fonts/remixicon.css";
import Home from "./views/Home.tsx";
import Futsal from "./views/Futsal.tsx";
import Booking from "./views/Booking.tsx";
import SignIn from "./views/SignIn.tsx";
import SignUp from "./views/SignUp.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import baseApi from "./redux/api/base-api.ts";
import AdminDashboard from "./views/AdminDashboard.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route path="login" element={<Home />} />
      <Route path="signup" element={<Home />} /> */}
      <Route path="" element={<Home />} />
      <Route path="futsal" element={<Futsal />} />
      <Route path="booking/:id" element={<Booking />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="admin" element={<AdminDashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ApiProvider api={baseApi}>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </ApiProvider>
    </ClerkProvider>
  </StrictMode>
);
