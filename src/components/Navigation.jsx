import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export function Navigation({ children }) {
  const navigate = useNavigate();

  const auth = useAuth();

  async function cerrarSesion(e) {
    e.preventDefault();

    try {
      auth.signOut();
      //const response = await logout(auth.refreshToken);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="" className="hover:text-gray-400">
              Tareas app
            </Link>
          </div>
          <ul className="flex space-x-4">
            {auth.isAuthenticated ? (
              <>
                <li>
                  <Link to="/tareas" className="hover:text-gray-400">
                    Tareas
                  </Link>
                </li>
                <li>
                  <Link to="/recursos" className="hover:text-gray-400">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link to="/tareas-crear" className="hover:text-gray-400">
                    Crear tarea
                  </Link>
                </li>
                <li>
                  <button
                    onClick={cerrarSesion}
                    className="hover:text-gray-400"
                  >
                    Cerrar sesión
                  </button>
                </li>
                <li className="no-underline hover:underline">
                  <span className="hover:text-gray-300 text-gray-200 ">
                    Bienvenido(a), {auth.username}
                  </span>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}
