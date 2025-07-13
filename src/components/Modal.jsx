import { IoClose } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-teal-50 dark:bg-gray-700 rounded-lg shadow-xl p-4 w-full max-w-md mx-4">
        <div className="flex  justify-end items-center">
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 hover:text-teal-950 text-xl"
          >
            <IoClose className="text-2xl"/>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
