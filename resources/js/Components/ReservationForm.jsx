import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';

const ReservationForm = () => {
  const [user_id, setUserId] = useState('');
  const [restaurant_id, setRestaurantId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedTime = time ? time.format('HH:mm:ss') : null;

    const reservationData = {
      user_id,
      restaurant_id,
      reservation_date: date,
      reservation_time: formattedTime,
      guest_name: name,
      guest_email: email,
      guest_phone: phone,
      party_size: partySize,
      special_requests: specialRequests,
    };

    axios
      .post('/api/reservations', reservationData)
      .then((response) => {
        console.log('Success:', response.data);
        // Handle successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4">Reservation Form</Typography>
        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          value={user_id}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="Restaurant ID"
          fullWidth
          margin="normal"
          value={restaurant_id}
          onChange={(e) => setRestaurantId(e.target.value)}
        />
        <TextField
          label="Reservation Date"
          fullWidth
          margin="normal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TimePicker
          label="Reservation Time"
          value={time}
          onChange={(newValue) => setTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Guest Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Guest Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Guest Phone"
          fullWidth
          margin="normal"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Party Size"
          fullWidth
          margin="normal"
          type="number"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        />
        <TextField
          label="Special Requests"
          fullWidth
          margin="normal"
          multiline
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default ReservationForm;
