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
  reservation_date: yup.string().required('Reservation Date is required'),
  reservation_time: yup.string().required('Reservation Time is required'),
  guest_name: yup.string().required('Guest Name is required'),
  guest_email: yup.string().email('Invalid email').required('Guest Email is required'),
  guest_phone: yup.string().required('Guest Phone is required'),
  party_size: yup
    .number()
    .transform((value, originalValue) => (originalValue.trim() === '' ? null : value))
    .required('Party Size is required'),
});

const ReservationForm = () => {
  const [user_id, setUserId] = useState('');
  const [restaurant_id, setRestaurantId] = useState('');
  const [reservation_date, setReservationDate] = useState('');
  const [reservation_time, setReservationTime] = useState(null);
  const [guest_name, setGuestName] = useState('');
  const [guest_email, setGuestEmail] = useState('');
  const [guest_phone, setGuestPhone] = useState('');
  const [party_size, setPartySize] = useState('');
  const [special_requests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedTime = reservation_time ? reservation_time.format('HH:mm:ss') : null;

    const reservationData = {
      user_id,
      restaurant_id,
      reservation_date,
      reservation_time: formattedTime,
      guest_name,
      guest_email,
      guest_phone,
      party_size,
      special_requests,
    };

    try {
      await validationSchema.validate(reservationData, { abortEarly: false });
      setErrors({}); // Clear previous errors

      // Submit the form
      axios.post('/api/reservations', reservationData)
        .then((response) => {
          console.log('Success:', response.data);
          // Handle successful submission
        })
        .catch((error) => {
          console.error('Error:', error.response.data);
          // Handle error
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
          value={reservation_date}
          onChange={(e) => setReservationDate(e.target.value)}
          error={!!errors.reservation_date}
          helperText={errors.reservation_date}
        />
        <TimePicker
          label="Reservation Time"
          value={reservation_time}
          onChange={(newValue) => setReservationTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
          error={!!errors.reservation_time}
          helperText={errors.reservation_time}
        />
        <TextField
          label="Guest Name"
          fullWidth
          margin="normal"
          value={guest_name}
          onChange={(e) => setGuestName(e.target.value)}
          error={!!errors.guest_name}
          helperText={errors.guest_name}
        />
        <TextField
          label="Guest Email"
          fullWidth
          margin="normal"
          type="email"
          value={guest_email}
          onChange={(e) => setGuestEmail(e.target.value)}
          error={!!errors.guest_email}
          helperText={errors.guest_email}
        />
        <TextField
          label="Guest Phone"
          fullWidth
          margin="normal"
          type="tel"
          value={guest_phone}
          onChange={(e) => setGuestPhone(e.target.value)}
          error={!!errors.guest_phone}
          helperText={errors.guest_phone}
        />
        <TextField
          label="Party Size"
          fullWidth
          margin="normal"
          type="number"
          value={party_size}
          onChange={(e) => setPartySize(e.target.value)}
          error={!!errors.party_size}
          helperText={errors.party_size}
        />
        <TextField
          label="Special Requests"
          fullWidth
          margin="normal"
          multiline
          value={special_requests}
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
