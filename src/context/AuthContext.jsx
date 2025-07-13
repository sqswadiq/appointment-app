import { createContext, useState } from 'react';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    sessionStorage.getItem("auth") === "true"
  );

  const login = (email, password) => {
    if (email === "staff@clinic.com" && password === "123456") {
      sessionStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      return true; 
    } else {
      alert("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
