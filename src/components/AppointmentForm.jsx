import { useEffect, useState } from "react";
import doctors from "../data/doctors";
import patients from "../data/patients";

export default function AppointmentForm({
  slotInfo,
  onSave,
  onCancel,
  onDelete,
  isEdit = false,
}) {
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isEdit && slotInfo) {
      const [p, , d] = slotInfo.title?.split(" ") || [];
      setPatient(p || "");
      setDoctor(d || "");
      const start = new Date(slotInfo.start);
      const hours = String(start.getHours()).padStart(2, "0");
      const minutes = String(start.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    } else if (slotInfo && slotInfo.start) {
      //  default time
      setTime("09:00");
    }
  }, [slotInfo, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDate = new Date(`${slotInfo.start.toDateString()} ${time}`);
    const endDate = new Date(startDate); 
    onSave({
      id: slotInfo.id,
      title: `${patient} with ${doctor}`,
      start: startDate,
      end: endDate,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-teal-50 dark:bg-gray-700 p-6 rounded w-full max-w-md"
    >
      <h3 className="mb-4 font-semibold text-xl  text-teal-950 dark:text-teal-50">
        {isEdit ? "Edit Appointment" : "Add Appointment"}
      </h3>

      <select
        className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-900 dark:focus:ring-gray-500"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
        required
      >
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <select
        className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-900 dark:focus:ring-gray-500"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        required
      >
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        type="time"
        className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-900 dark:focus:ring-gray-500 "
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <div className="flex justify-between items-center mt-4">
        <button
          type="submit"
          className="bg-teal-950 dark:bg-teal-700 text-white dark:text-gray-200 px-5 py-2 rounded hover:bg-teal-900 dark:hover:bg-teal-600 w-max"
        >
          Save
        </button>
        {isEdit && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 dark:bg-red-700 text-white dark:text-gray-200 px-4 py-2 rounded hover:bg-red-800 dark:hover:bg-red-600"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-400 text-gray-700 dark:text-gray-800 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
