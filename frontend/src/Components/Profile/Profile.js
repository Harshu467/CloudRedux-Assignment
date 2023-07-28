import React, { useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { useUserContext } from '../Context/UserContext';

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
    <div className="bg-gray-100 min-h-screen py-8">
      <Container maxWidth="md">
        <Card className="bg-white p-8 shadow-md rounded-lg mb-8">
          <Typography variant="h4" component="h2" gutterBottom>
            User Profile
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                First Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                {user?.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Last Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                {user?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                {user?.email}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <Card className="bg-white p-8 shadow-md rounded-lg mb-8">
          <Typography variant="h4" component="h2" gutterBottom>
            Hosted Events
          </Typography>
          {events.map((event) => (
            <Button key={event.id} onClick={() => handleEventClick(event)} className="mb-4">
              <Typography variant="subtitle1">{event.title}</Typography>
              <Typography variant="subtitle2">{event.date}</Typography>
            </Button>
          ))}
        </Card>
        <Dialog open={selectedEvent !== null} onClose={handleEventClose}>
          {selectedEvent && (
            <>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
              <DialogContent>
                <Typography variant="body1">{`Description :${selectedEvent.description}`}</Typography>
                <Typography variant="body2">{`Date: ${selectedEvent.date}, `}</Typography>
                <Typography variant="body2">{`Time: ${selectedEvent.time}`}</Typography>
                <Typography variant="body2">{`Virtual Location: ${selectedEvent.virtualLocation}`}</Typography>
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
