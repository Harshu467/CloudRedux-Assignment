import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Toaster,toast } from 'react-hot-toast';
import axios from 'axios';
import { useUserContext } from '../Context/UserContext';
const CreateEvent= () => {
  const { addEvent, user } = useUserContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    virtualLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '', 
      date: '',
      time: '',
      virtualLocation: '',
    };

    let formIsValid = true;

    if (!formData.title) {
      newErrors.title = 'Title is required';
      toast.error(newErrors.title);
      formIsValid = false;
    }
    if(!formData.description){
      newErrors.description = 'Description is required';
      toast.error(newErrors.description);
      formIsValid = false;
    }
    if(!formData.date){
      newErrors.date = 'Date is required';
      toast.error(newErrors.date);
      formIsValid = false;
    }
    else if(formData.date < Date.now()){
      newErrors.date = 'Date is invalid';
      toast.error(newErrors.date);
      formIsValid = false;
    }
    if(!formData.time){
      newErrors.time = 'Time is required';
      toast.error(newErrors.time);
      formIsValid = false;
    }
    else if(formData.time < Date.now()){
      newErrors.time = 'Time is invalid';
      toast.error(newErrors.time);
      formIsValid = false;
    }
    if(!formData.virtualLocation){
      newErrors.virtualLocation = 'Virtual Location is required';
      toast.error(newErrors.virtualLocation);
      formIsValid = false;
    }
    return formIsValid;
  }
  const handleSubmit = async (e) => {
     e.preventDefault();
    console.log("Handle Submit")
    const formIsValid = validateForm();
    if (!formIsValid) {
      return;
    }

    try {
      // Create an event object with the form data
      const newEvent = { ...formData, id: Date.now(), organizer: user.id };
      // Send the event data to the backend
      const response = await axios.post(`http://localhost:5000/api/v1/createVirtualEvent/${user.id}`, newEvent);
      // Call the addEvent function from the context to add the event to the user's events
      addEvent(response.data.data);
      // Reset the form after submission
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        virtualLocation: '',
      });
      // Show success message using toaster
      toast.success('Event created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while adding the event.');
    }
  };


  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-8 mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Event Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="virtualLocation" className="block text-gray-700 font-bold mb-2">Virtual Location (URL or Platform Link)</label>
          <input
            type="text"
            id="virtualLocation"
            name="virtualLocation"
            value={formData.virtualLocation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Event
      </Button>
      <Toaster
            position="top-center"
            reverseOrder={false}
          />
      </form>
    </div>
  );
};

export default CreateEvent;
