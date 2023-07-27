import React, { useState } from 'react';
import Cards from '../Cards/Cards';
import events from '../Data/data';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Dashboard = () => {
  const handleAttend = (eventId) => {
    // Find the event with the matching ID in the events array
    const attendedEvent = events.find((event) => event.id === eventId);
    // Perform the action for attending the event
    console.log(`Attending event: ${attendedEvent.title}`);
  };

  const handleRSVP = (eventId) => {
    // Find the event with the matching ID in the events array
    const rsvpedEvent = events.find((event) => event.id === eventId);
    // Perform the action for RSVPing to the event
    console.log(`RSVPing for event: ${rsvpedEvent.title}`);
  };
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    date: '',
    location: '',
  });

  const handleFilterChange = (name, value) => {
    setFilterCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilterCriteria({
      category: '',
      date: '',
      location: '',
    });
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(filterCriteria.category.toLowerCase()) &&
      event.date.includes(filterCriteria.date) &&
      event.virtual_location.toLowerCase().includes(filterCriteria.location.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">Upcoming Events</h1>
      <div className="flex flex-wrap gap-4 mb-4">
        <TextField
          label="Category"
          variant="outlined"
          size="small"
          value={filterCriteria.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-60"
        />
        <TextField
          label="Date"
          variant="outlined"
          size="small"
          type="date"
          value={filterCriteria.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-60"
        />
        <TextField
          label="Location"
          variant="outlined"
          size="small"
          value={filterCriteria.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-60"
        />
        <Button variant="contained" color="primary" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <Cards
            key={event.id}
            event={event}
            onAttend={() => handleAttend(event.id)}
            onRSVP={() => handleRSVP(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
