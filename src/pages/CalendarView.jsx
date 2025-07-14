import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import Modal from "../components/Modal";
import { getAppointments, saveAppointments } from "../utils/localStorage";
import AppointmentForm from "../components/AppointmentForm";
import Header from "../components/Header";
import patients from "../data/patients";
import doctors from "../data/doctors";
import FilterDropdown from "../components/FilterDropdown";
import { useMediaQuery } from "usehooks-ts";

const localizer = momentLocalizer(moment);

export default function CalendarView() {
  const [events, setEvents] = useState(getAppointments());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");

  const filteredEvents = events.filter((event) => {
    const title = event.title.toLowerCase();
    const matchesDoctor = filterDoctor
      ? title.includes(filterDoctor.toLowerCase())
      : true;
    const matchesPatient = filterPatient
      ? title.includes(filterPatient.toLowerCase())
      : true;
    return matchesDoctor && matchesPatient;
  });

  const handleSave = (appointment) => {
    let updated;
    if (selectedEvent) {
      updated = events.map((e) =>
        e.id === selectedEvent.id ? { ...appointment, id: selectedEvent.id } : e
      );
    } else {
      updated = [...events, { ...appointment, id: Date.now() }];
    }
    setEvents(updated);
    saveAppointments(updated);
    setSelectedSlot(null);
    setSelectedEvent(null);
  };

  const handleDelete = () => {
    if (!selectedEvent) return;
    const updated = events.filter((e) => e.id !== selectedEvent.id);
    setEvents(updated);
    saveAppointments(updated);
    setSelectedEvent(null);
  };

  const daysInMonth = moment(currentDate).daysInMonth();
  const month = moment(currentDate).format("MMMM");
  const year = moment(currentDate).format("YYYY");

  const renderEvent = ({ event }) => {
    const time = moment(event.start).format("hh:mm A");
    return (
      <div className="bg-green-200 text-slate-900 dark:bg-gray-300 dark:text-slate-950 text-sm px-2 py-1 rounded shadow-sm hover:bg-green-300 hover:shadow-md transition duration-200 cursor-pointer md:mx-1 md:mt-1">
        <span className="font-semibold">{event.title}</span>
        <span className="text-xs block opacity-90">{time}</span>
      </div>
    );
  };

  const customEventStyle = () => {
    return {
      style: {
        border: "none",
        backgroundColor: "transparent",
        padding: 0,
      },
    };
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-teal-50">
      <Header />
      <div className="flex flex-wrap justify-end gap-4 mb-4 mx-6">
        <FilterDropdown
          label="Doctors"
          options={doctors}
          selected={filterDoctor}
          setSelected={setFilterDoctor}
        />
        <FilterDropdown
          label="Patients"
          options={patients}
          selected={filterPatient}
          setSelected={setFilterPatient}
        />
      </div>

      <div className="p-4">
        {!isMobile ? (
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            date={currentDate}
            onNavigate={setCurrentDate}
            defaultView="month"
            views={["month"]}
            selectable
            onSelectSlot={(slot) => {
              setSelectedSlot(slot);
              setSelectedEvent(null);
            }}
            onSelectEvent={(event) => {
              setSelectedEvent(event);
              setSelectedSlot(null);
            }}
            startAccessor="start"
            endAccessor="end"
            components={{
              event: renderEvent,
            }}
            eventPropGetter={customEventStyle}
            style={{ height: "80vh" }}
          />
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-4">
              <button
                className="text-2xl"
                onClick={() =>
                  setCurrentDate(moment(currentDate).subtract(1, "month").toDate())
                }
              >
                &larr;
              </button>
              <div className="text-lg font-semibold">{month} {year}</div>
              <button
                className="text-2xl"
                onClick={() =>
                  setCurrentDate(moment(currentDate).add(1, "month").toDate())
                }
              >
                &rarr;
              </button>
            </div>

            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const date = moment(currentDate).date(day).toDate();
              const dayEvents = filteredEvents.filter(event =>
                moment(event.start).isSame(date, "day")
              );

              return (
                <div key={day} className="border-b pb-2">
                  <div className="flex justify-between items-center py-2">
                    <div className="font-medium">Appointments for {month} {day}</div>
                    <button
                      className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => {
                        setSelectedSlot({ start: date, end: date });
                        setSelectedEvent(null);
                      }}
                    >
                      +
                    </button>
                  </div>

                  {dayEvents.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className="flex justify-between items-center bg-teal-700 text-white px-3 py-1 rounded w-56"
                        >
                          <div className="text-sm">
                            {moment(event.start).format("HH:mm")} - {event.title}
                          </div>
                          {/* edit,delete button  */}
                          <div className="flex space-x-2 text-xs">
                            <button
                              onClick={() => {
                                setSelectedEvent(event);
                                setSelectedSlot(null);
                              }}
                              className="text-teal-50 hover:text-blue-900 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEvent(event);
                                handleDelete();
                              }}
                              className=" text-red-400 hover:text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {(selectedSlot || selectedEvent) && (
          <Modal
            isOpen={true}
            onClose={() => {
              setSelectedSlot(null);
              setSelectedEvent(null);
            }}
            title={selectedEvent ? "Edit Appointment" : "Add Appointment"}
          >
            <AppointmentForm
              slotInfo={selectedSlot || selectedEvent}
              onSave={handleSave}
              onCancel={() => {
                setSelectedSlot(null);
                setSelectedEvent(null);
              }}
              onDelete={selectedEvent ? handleDelete : null}
              isEdit={!!selectedEvent}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}