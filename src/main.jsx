import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import { TareasList } from "./pages/TareasPage.jsx";
import { TareasFormPage } from "./pages/TareasFormPage.jsx";
import { RecursosPage } from "./pages/RecursosPage.jsx";
import { ProtectedRoute } from "./pages/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/tareas",
        element: <TareasList />,
      },
      {
        path: "/tareas-crear",
        element: <TareasFormPage />,
      },
      {
        path: "/tareas/:id",
        element: <TareasFormPage />,
      },
      {
        path: "/recursos",
        element: <RecursosPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);
