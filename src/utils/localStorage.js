const KEY = "appointments";

export const getAppointments = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveAppointments = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
