import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Events = () => {
  useEffect(() => {
    // Fetch all virtual events from the backend
    axios.get('http://localhost:5000/api/v1/events')
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching virtual events:', error);
        
      });
  }, []);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Virtual Event 1',
      description: 'Join us for a virtual event on React!',
      date: '2023-07-28',
      time: '10:00 AM',
      location: 'Online',
      isParticipated: false,
    },
    {
      id: 2,
      title: 'Virtual Event 2',
      description: 'Learn about Full-stack Development!',
      date: '2023-08-05',
      time: '2:00 PM',
      location: 'Virtual Platform',
      isParticipated: false,
    },
    // Add more events as needed
  ]);
  const handleParticipate = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, isParticipated: true } : event
      )
    );
    setParticipatedEvents((prevEvents) =>
      events.filter((event) => event.id === eventId)
    );
  };

  const handleRSVP = (eventId) => {
    setParticipatedEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, isRSVPed: true } : event
      )
    );
  };
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    if (eventToEdit) {
      setEditEventId(eventId);
      setFormData({
        title: eventToEdit.title,
        description: eventToEdit.description,
        date: eventToEdit.date,
        time: eventToEdit.time,
        location: eventToEdit.location,
      });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditEventId(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    });
  };

  const handleSaveEdit = () => {
    // Update the event details in the events state based on editEventId and formData
    // For example: const updatedEvents = events.map((event) =>
    //   event.id === editEventId ? { ...event, ...formData } : event
    // );
    // setEvents(updatedEvents);
    setIsEditing(false);
    setEditEventId(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mt-8 mb-4 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-4 py-2 text-white font-bold text-center">
              {event.title}
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              {event.isHost ? (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                  {isEditing && editEventId === event.id && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Title"
                        className="block w-full rounded-md border-gray-300 py-2 px-4"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                      {/* Add similar input fields for description, date, time, and location */}
                      <div className="flex mt-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : event.isParticipated ? (
                event.isRSVPed ? (
                  <p className="text-green-500 font-bold">You have RSVPed to this event.</p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                    onClick={() => handleRSVP(event.id)}
                  >
                    RSVP
                  </button>
                )
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                  onClick={() => handleParticipate(event.id)}
                >
                  Participate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;