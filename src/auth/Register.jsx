import { Link, Navigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { register } from "../api/tareas.api";
import { toast } from "react-hot-toast";

export function Register() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (usuario == "" || email == "" || password == "") {
      toast.error("Todos los campos son requeridos", {
        duration: 2000,
      });
      return;
    }

    try {
      const userData = { username: usuario, email, password };
      const response = await register(userData);
      console.log(response);

      if (response.status === 200) {
        toast.success("Usuario registrado correctamente", {
          duration: 3000,
        });

        setUsuario("");
        setEmail("");
        setPassword("");
      } else {
        console.log("Error al registrar el usuario");
      }
    } catch (error) {
      toast.error("Error al registrar el usuario", {
        duration: 2000,
      });
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/tareas" />;
  }

  return (
    <Navigation>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto border border-gray-300 rounded-lg p-5 form"
      >
        <h1 className="font-bold text-center mb-10">REGISTRARSE</h1>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Correo
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="prueba@example.com"
            required
          />
        </div>
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
          onClick={handleSubmit}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
        >
          Registrarse
        </button>
        <Link to="/login">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-blue-800"
          >
            Iniciar sesion
          </button>
        </Link>
      </form>
    </Navigation>
  );
}
