import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
import { useUserContext } from '../Context/UserContext';
const Dashboard = () => {
  // const [events, setEvents] = useState([]);
  const {user,events,setEvents} = useUserContext()
  const [data,setdata] = useState({
   user:""
  })
  useEffect(()=>{
    setdata({
      user:user
    })
  })

  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    date: '',
    location: '',
  });
  // console.log(events)
  const [participatedEvents, setParticipatedEvents] = useState([]);
  const handleAttend = async (eventId) => {
    try {

      if (!user.token) {
        // Show toast notification for unauthenticated user
        toast.error('Please Login to Attend');
        return;
      }
      const eventId = events?.organizer?;
  
      // Make API call to participate in the event using Axios
      const response = await axios.post(`http://localhost:5000/api/v1/participateInEvent/${eventId}`, {data});
  
      if (!response.ok) {
        throw new Error(response.data.message || 'Failed to participate in the event');
      }
  
      // Update the events list to mark the event as participated
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? { ...event, isParticipated: true } : event))
      );
  
      // Show toast notification for successful attendance
      toast.success('Successfully attended the event!');
    } catch (error) {
      console.error('Error participating in the event:', error.message);
      // Handle error, e.g., show a toast or an error message to the user
      toast.error('Error participating in the event');
    }
  };
  
  
  const handleRSVP = async (eventId) => {
    try {
      // Make API call to RSVP for the event
      const response = await fetch(`http://localhost:5000/api/v1/rsvpForEvent/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any required authorization headers if your backend requires authentication
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to RSVP for the event');
      }
  
      // Update the participatedEvents list to mark the event as RSVPed
      setParticipatedEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventId ? { ...event, isRSVPed: true } : event))
      );
    } catch (error) {
      console.error('Error RSVPing for the event:', error.message);
      // Handle error, e.g., show a toast or an error message to the user
    }
  };
  
  // Function to fetch virtual events data from the API
  

  // Fetch virtual events data when the component mounts
  useEffect(() => {
    fetchVirtualEvents();
  }, []);

  


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
      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Cards
              event={event}
              onAttend={() => handleAttend(event.id)}
              onRSVP={() => handleRSVP(event.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Toaster
            position="top-center"
            reverseOrder={false}
          />
    </div>
  );
};

export default Dashboard;
