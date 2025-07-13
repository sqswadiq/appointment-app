import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CalendarView from "./pages/CalendarView";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginRedirect />} />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <CalendarView />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Optional: Redirect logged-in users from / to /calendar
function LoginRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/calendar" /> : <Login />;
}

export default App;
