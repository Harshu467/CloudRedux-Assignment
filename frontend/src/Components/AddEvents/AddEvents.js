import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUserContext } from '../Context/UserContext';
import axios from 'axios';
import {Toaster,toast} from 'react-hot-toast';

const AddEvents = () => {
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
    <form className="max-w-md mt-[5rem] mx-auto mt-10 p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          variant="outlined"
          type="date"
          fullWidth
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          variant="outlined"
          type="time"
          fullWidth
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Virtual Location"
          variant="outlined"
          fullWidth
          name="virtualLocation"
          value={formData.virtualLocation}
          onChange={handleChange}
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
  );
};

export default AddEvents;
