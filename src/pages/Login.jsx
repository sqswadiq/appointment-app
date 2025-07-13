import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import DarkModeToggle from "../components/DarkModeToggle";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate("/calendar");
    }
  };

  return (
    <div className='flex flex-col h-screen bg-emerald-50 dark:bg-gray-800 p-5'>
      <div className='flex justify-end'>
        <div className='flex justify-start dark:justify-end w-14 bg-gray-300 dark:bg-gray-400 rounded-full transition-colors duration-150'>
          <DarkModeToggle/>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700  p-8  rounded-xl shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white tracking-wide">Staff Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-700 dark:focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-teal-950 dark:bg-teal-700 hover:bg-teal-900 dark:hover:bg-teal-600 text-teal-50
            font-semibold 
            dark:text-gray-200 py-2 rounded-md transition-colors duration-200 shadow hover:shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
