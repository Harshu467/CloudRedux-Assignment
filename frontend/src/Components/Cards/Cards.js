import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Cards = ({ event, onAttend, onRSVP }) => {
  const handleAttendClick = () => {
    onAttend(event.id);
  };

  const handleRSVPClick = () => {
    onRSVP(event.id);
  };

  return (
    <Card className="max-w-xs mx-auto mb-4 shadow-md rounded-lg">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="text-xl font-bold">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {event.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {event.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Time: {event.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Virtual Location: {event.virtualLocation}
        </Typography>
        <div className="mt-4 space-x-2">
          <Button variant="contained" color="primary" onClick={handleAttendClick} className="px-4 py-2">
            Attend
          </Button>
          <Button variant="contained" color="secondary" onClick={handleRSVPClick} className="px-4 py-2">
            RSVP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cards;
