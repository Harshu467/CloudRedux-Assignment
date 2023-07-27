import React, { useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useUserContext } from '../Context/UserContext';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddEvents from '../AddEvents/AddEvents';

const Profile = () => {
  const { user, events } = useUserContext(); // Access the user and events data from the UserContext
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleEventClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Container maxWidth="md" className="py-8">
        <Card className="bg-white p-8 shadow-md rounded-lg mb-8">
          <Typography variant="h4" component="h2" gutterBottom>
            User Profile
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            First Name: {user?.firstName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Last Name: {user?.lastName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {user?.email}
          </Typography>
          <Button variant="contained" color="primary" className="mt-4">
            Edit Profile
          </Button>
        </Card>

        <Card className="bg-white p-8 shadow-md rounded-lg mb-8">
          <Typography variant="h4" component="h2" gutterBottom>
            Hosted Events
          </Typography>
          {events.map((event) => (
            <CardContent key={event.id} className="mb-4">
              <Typography variant="subtitle1" onClick={() => handleEventClick(event)} style={{ cursor: 'pointer' }}>
                {event.title}
              </Typography>
              <Typography variant="subtitle2">{event.date}</Typography>
            </CardContent>
          ))}
        </Card>

        {/* AddEvents component to create new events */}

        {/* Event details pop-up */}
        <Dialog open={selectedEvent !== null} onClose={handleEventClose}>
          {selectedEvent && (
            <>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogContent>
                <Typography variant="body1">{selectedEvent.description}</Typography>
                <Typography variant="body2">{`Date: ${selectedEvent.date}, Time: ${selectedEvent.time}`}</Typography>
                <Typography variant="body2">{`Virtual Location: ${selectedEvent.virtual_location}`}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEventClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </div>
  );
};

export default Profile;
