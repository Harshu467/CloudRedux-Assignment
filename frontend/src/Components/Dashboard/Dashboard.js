import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    date: '',
    location: '',
  });

  // Function to fetch virtual events data from the API
  const fetchVirtualEvents = async () => {
    try {
      // Make API call to fetch all virtual events
      const response = await fetch('http://localhost:5000/api/v1/getAllVirtualEvents');
      const data = await response.json();
      console.log(data.data)
      setEvents(data.data); // Assuming the virtual events are available in the 'payload' field of the response
    } catch (error) {
      console.error('Error fetching virtual events:', error);
    }
  };

  // Fetch virtual events data when the component mounts
  useEffect(() => {
    fetchVirtualEvents();
  }, []);

  const handleAttend = (eventId) => {
    // Perform the action for  label="Date"attending the event
    console.log(`Attending event with ID: ${eventId}`);
  };

  const handleRSVP = (eventId) => {
    // Perform the action for RSVPing to the event
    console.log(`RSVPing for event with ID: ${eventId}`);
  };

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

  const filteredEvents = events?.filter((event) => {
    const category = event.title?.toLowerCase() || '';
    const date = event.date || '';
    const location = event.virtual_location?.toLowerCase() || '';

    return (
      category.includes(filterCriteria.category.toLowerCase()) &&
      date.includes(filterCriteria.date) &&
      location.includes(filterCriteria.location.toLowerCase())
    );
  }) ?? [];

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
