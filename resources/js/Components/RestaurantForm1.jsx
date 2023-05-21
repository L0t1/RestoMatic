import React, { useState } from 'react';
import axios from 'axios';

const RestaurantForm = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [address, setAddress] = useState(initialValues.address);
  const [city, setCity] = useState(initialValues.city);
  const [state, setState] = useState(initialValues.state);
  const [zipcode, setZipcode] = useState(initialValues.zipcode);
  const [phone, setPhone] = useState(initialValues.phone);
  const [website, setWebsite] = useState(initialValues.website);
  const [openingHours, setOpeningHours] = useState(initialValues.opening_hours);
  const [cuisine, setCuisine] = useState(initialValues.cuisine);
  const [priceRange, setPriceRange] = useState(initialValues.price_range);
  const [capacity, setCapacity] = useState(initialValues.capacity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      address,
      city,
      state,
      zipcode,
      phone,
      website,
      opening_hours: openingHours,
      cuisine,
      price_range: priceRange,
      capacity,
    };

    if (initialValues.id) {
      // Update existing restaurant
      axios
        .put(`/api/restaurants/${initialValues.id}`, formData)
        .then((response) => {
          // Handle successful update
          console.log(response.data);
          onSubmit();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    } else {
      // Create new restaurant
      axios
        .post('/api/restaurants', formData)
        .then((response) => {
          // Handle successful creation
          console.log(response.data);
          onSubmit();
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </div>
      <div>
        <label>Zipcode:</label>
        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Website:</label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div>
        <label>Opening Hours:</label>
        <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)} />
      </div>
      <div>
        <label>Cuisine:</label>
        <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
      </div>
      <div>
        <label>Price Range:</label>
        <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
      </div>
      <div>
        <label>Capacity:</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RestaurantForm;
