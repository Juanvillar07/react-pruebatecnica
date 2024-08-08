import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  saveUser: () => {},
  signOut: () => {},
  username: "",
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // Obtener el nombre de usuario almacenado
    if (token) {
      setAccessToken(token);
      setUsername(storedUsername); // Establecer el nombre de usuario
      setIsAuthenticated(true);
    }
  }, []);

  function getAccessToken() {
    return accessToken;
  }

  function saveUser(userData) {
    setAccessToken(userData.access);
    setRefreshToken(userData.refresh);
    setUsername(userData.username);

    localStorage.setItem("token", JSON.stringify(userData.access));
    setIsAuthenticated(true);
  }

  function signOut() {
    setIsAuthenticated(false);
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, signOut, username }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
