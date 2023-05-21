import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios"; // Import axios

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipcode: yup.string().required("Zip code is required"),
  phone: yup.string().required("Phone number is required"),
  website: yup.string().url("Invalid URL").required("Website is required"),
  cuisine: yup.string().required("Cuisine is required"),
  priceRange: yup.string().required("Price range is required"),
  capacity: yup
    .number()
    .positive()
    .integer()
    .required("Capacity is required"),
});

export default function RestaurantForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
  
    const [openingHours, setOpeningHours] = React.useState(null); // For TimePicker
  
    const onSubmit = (data) => {
        data.opening_hours = openingHours
          ? openingHours.toISOString()
          : null;
        axios.post("http://localhost:8000/api/restaurants", data)
          .then((response) => {
              console.log("Success:", response.data);
              // Assuming response.data contains the created restaurant's id
              // Navigate to /test page and pass the newly created restaurant id
              window.location.replace('/test');
            })
          .catch((error) => {
              console.error("Error:", error);
          });
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Typography variant="h4">Register Restaurant</Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          {...register("description")}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          {...register("address")}
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
        />
        <TextField
          label="City"
          fullWidth
          margin="normal"
          {...register("city")}
          error={Boolean(errors.city)}
          helperText={errors.city?.message}
        />
        <TextField
          label="State"
          fullWidth
          margin="normal"
          {...register("state")}
          error={Boolean(errors.state)}
          helperText={errors.state?.message}
        />
        <TextField
          label="Zip Code"
          fullWidth
          margin="normal"
          {...register("zipcode")}
          error={Boolean(errors.zipcode)}
          helperText={errors.zipcode?.message}
        />
        <TextField
          label="Phone Number"
          fullWidth
          margin="normal"
          {...register("phone")}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
        <TextField
          label="Website"
          fullWidth
          margin="normal"
          {...register("website")}
          error={Boolean(errors.website)}
          helperText={errors.website?.message}
        />
        <TimePicker
          label="Opening Hours"
          value={openingHours}
          onChange={(newValue) => {
            setOpeningHours(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Cuisine"
          fullWidth
          margin="normal"
          {...register("cuisine")}
          error={Boolean(errors.cuisine)}
          helperText={errors.cuisine?.message}
        />
        <TextField
          label="Price Range"
          fullWidth
          margin="normal"
          {...register("priceRange")}
          error={Boolean(errors.priceRange)}
          helperText={errors.priceRange?.message}
        />
        <TextField
          label="Capacity"
          fullWidth
          margin="normal"
          {...register("capacity")}
          error={Boolean(errors.capacity)}
          helperText={errors.capacity?.message}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
