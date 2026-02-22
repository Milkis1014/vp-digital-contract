import { useState, useEffect } from "react";
import { supabase } from "../supabase/createClient";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  type DateClickArg,
} from "@fullcalendar/interaction";
import type { EventInput, DateSelectArg } from "@fullcalendar/core";
import { ContractModal } from "../components/ContractModal";

const toDateTimeLocal = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventInput[]>([]);

  // ─── Modal state ─────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const { data, error } = await supabase
        .from("contracts")
        .select("*, contract_versions(contract_snapshot)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const calendarEvents: EventInput[] =
        data?.map((contract) => {
          const snapshot = contract.contract_versions?.[0]?.contract_snapshot;
          return {
            id: contract.id,
            title: `${snapshot?.clientOccasion}`,
            start: snapshot?.checkInDate,
            end: snapshot?.checkOutDate,
            backgroundColor:
              snapshot?.selectedResort === "Villa Prescilla 1"
                ? "#678cb3"
                : "#f16d21",
            borderColor:
              snapshot?.selectedResort === "Villa Prescilla 1"
                ? "#678cb3"
                : "#f16d21",
            extendedProps: {
              clientName: snapshot?.clientName,
              occasion: snapshot?.clientOccasion,
              resort: snapshot?.selectedResort,
              status: contract.status,
            },
          };
        }) || [];

      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  // * ============================== * //
  //           EVENT HANDLERS
  // * ============================== * //

  // Single click on a time slot — both dates set to the same time
  const handleDateClick = (info: DateClickArg) => {
    const time = toDateTimeLocal(info.date);
    setCheckIn(time);
    setCheckOut(time);
    setIsModalOpen(true);
  };

  // Click-drag across a time range
  const handleSelect = (info: DateSelectArg) => {
    setCheckIn(toDateTimeLocal(info.start));
    setCheckOut(toDateTimeLocal(info.end));
    setIsModalOpen(true);
  };

  // Close modal and refresh calendar so the new contract appears
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCheckIn("");
    setCheckOut("");
    fetchContracts();
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error signing out: " + error.message);
    } else {
      navigate("/login");
    }
  };

  const handleEventClick = (info: EventInput) => {
    const { extendedProps } = info.event;
    alert(`
      Client: ${extendedProps.clientName}
      Occasion: ${extendedProps.occasion}
      Resort: ${extendedProps.resort}
      Status: ${extendedProps.status}
    `);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Villa Prescilla Bookings
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setCheckIn("");
                setCheckOut("");
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              New Contract
            </button>
            <button
              onClick={handleSignOut}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,today,next",
              center: "title",
              right: "timeGridDay,timeGridWeek,dayGridMonth",
            }}
            events={events}
            eventClick={handleEventClick}
            dateClick={handleDateClick}
            editable={true}
            selectable={true}
            select={handleSelect}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height="auto"
          />
        </div>
      </div>

      {/* Contract Modal */}
      <ContractModal
        isOpen={isModalOpen}
        checkIn={checkIn}
        checkOut={checkOut}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default HomePage;
