import { Link, Navigate, useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { toast } from "react-hot-toast";
import { login } from "../api/tareas.api";

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  async function iniciarSesion(e) {
    e.preventDefault();

    if (usuario == "" || password == "") {
      toast.error("Todos los campos son requeridos", {
        duration: 2000,
      });
      return;
    }

    try {
      const userData = { username: usuario, password };
      const response = await login(userData);
      console.log(response);

      if (response.status === 200) {
        toast.success("usuario logueado correctamente", {
          duration: 2000,
        });
        const json = await response.data;

        if (json.access && json.refresh) {
          auth.saveUser({ ...json, username: usuario });
        }

        navigate("/tareas");
      } else {
        toast.error(response.request.response, {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      if (
        error.request.status == 401 ||
        error.request.status == 400 ||
        error.request.status == 404
      ) {
        toast.error("Credenciales invalidas, vuevla a intentarlo", {
          duration: 2000,
        });
      } else {
        console.log(error);
        toast.error("Error al iniciar sesion", {
          duration: 2000,
        });
      }
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/tareas" />;
  }

  return (
    <Navigation>
      <form className="max-w-sm mx-auto border border-gray-300 rounded-lg p-5">
        <h1 className="text-center mb-10 font-bold">INICIO DE SESION</h1>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="button"
          onClick={iniciarSesion}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
        >
          Inciar sesion
        </button>
        <Link to="/register">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-700 dark:hover:bg-green-900 dark:focus:ring-blue-800 mt-4"
          >
            Registrarse
          </button>
        </Link>
      </form>
    </Navigation>
  );
}
