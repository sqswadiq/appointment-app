import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { FiLogOut } from "react-icons/fi";


export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/"); 
};


  return (
    <header className="flex flex-col-reverse md:flex-row md:justify-between md:items-center p-4 bg-emerald-50 dark:bg-gray-900 shadow mb-4">
      <h1 className="text-xl md:text-2xl  font-semibold text-teal-950 dark:text-teal-50 mt-3 md:mt-0">
        Clinic Appointment Calendar
      </h1>

      <div className="flex justify-end">
        <div className="flex  items-center  gap-4">
          <DarkModeToggle />
          <button
            onClick={handleLogout}
            className="bg-teal-950 dark:bg-teal-50 text-white  dark:text-gray-900 p-2 rounded-full hover:bg-teal-900 dark:hover:bg-teal-100"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}
