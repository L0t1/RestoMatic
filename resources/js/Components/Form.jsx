import * as React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';  // Import axios

export default function RestaurantForm() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [openingHours, setOpeningHours] = React.useState(null);
  const [cuisine, setCuisine] = React.useState('');
  const [priceRange, setPriceRange] = React.useState('');
  const [capacity, setCapacity] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const restaurantData = {
      name, description, address, city, state, zipcode, phone, website, 
      opening_hours: openingHours ? openingHours.toISOString() : null,
      cuisine, price_range: priceRange, capacity
    };
    
    axios.post('http://localhost:8000/api/restaurants', restaurantData)
    .then((response) => {
      console.log('Success:', response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h4">Register Restaurant</Typography>
      <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Description" fullWidth margin="normal" multiline value={description} onChange={(e) => setDescription(e.target.value)} />
      <TextField label="Address" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} />
      <TextField label="City" fullWidth margin="normal" value={city} onChange={(e) => setCity(e.target.value)} />
      <TextField label="State" fullWidth margin="normal" value={state} onChange={(e) => setState(e.target.value)} />
      <TextField label="Zip Code" fullWidth margin="normal" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      <TextField label="Phone Number" fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <TextField label="Website" fullWidth margin="normal" value={website} onChange={(e) => setWebsite(e.target.value)} />
      <TimePicker
        label="Opening Hours"
        value={openingHours}
        onChange={(newValue) => {
          setOpeningHours(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField label="Cuisine" fullWidth margin="normal" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      <TextField label="Price Range" fullWidth margin="normal" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
      <TextField label="Capacity" fullWidth margin="normal" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
      </Box>
    </LocalizationProvider>
  );
}
