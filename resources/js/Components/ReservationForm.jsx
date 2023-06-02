import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';
import * as yup from 'yup';

const validationSchema = yup.object({
    user_id: yup.string().required('User ID is required'),
    restaurant_id: yup.string().required('Restaurant ID is required'),
    date: yup.string().required('Reservation Date is required'),
    time: yup.string().required('Reservation Time is required'),
    name: yup.string().required('Guest Name is required'),
    email: yup.string().email('Invalid email').required('Guest Email is required'),
    phone: yup.string().required('Guest Phone is required'),
    partySize: yup
      .number()
      .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
      .required('Party Size is required'),
  });



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
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
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

    try {
      await validationSchema.validate(reservationData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      // Submit the form
      axios.post('/api/reservations', reservationData).then((response) => {
        console.log('Success:', response.data);
        // Handle successful submission
      });
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
    }
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
          error={!!errors.user_id}
          helperText={errors.user_id}
        />
        <TextField
          label="Restaurant ID"
          fullWidth
          margin="normal"
          value={restaurant_id}
          onChange={(e) => setRestaurantId(e.target.value)}
          error={!!errors.restaurant_id}
          helperText={errors.restaurant_id}
        />
        <TextField
          label="Reservation Date"
          fullWidth
          margin="normal"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={!!errors.date}
          helperText={errors.date}
        />
        <TimePicker
          label="Reservation Time"
          value={time}
          onChange={(newValue) => setTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
          error={!!errors.time}
          helperText={errors.time}
        />
        <TextField
          label="Guest Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Guest Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Guest Phone"
          fullWidth
          margin="normal"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Party Size"
          fullWidth
          margin="normal"
          type="number"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          error={!!errors.party_size}
          helperText={errors.party_size}
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
