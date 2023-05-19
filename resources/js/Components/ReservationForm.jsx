import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ onSubmit, initialValues }) => {
  const [user_id, setUserId] = useState(initialValues.user_id);
  const [restaurant_id, setRestaurantId] = useState(initialValues.restaurant_id);
  const [date, setDate] = useState(initialValues.reservation_date);
  const [time, setTime] = useState(initialValues.reservation_time);
  const [name, setName] = useState(initialValues.guest_name);
  const [email, setEmail] = useState(initialValues.guest_email);
  const [phone, setPhone] = useState(initialValues.guest_phone);
  const [partySize, setPartySize] = useState(initialValues.party_size);
  const [specialRequests, setSpecialRequests] = useState(initialValues.special_requests);
  const [status, setStatus] = useState(initialValues.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      user_id,
      restaurant_id,
      reservation_date: date,
      reservation_time: time,
      guest_name: name,
      guest_email: email,
      guest_phone: phone,
      party_size: partySize,
      special_requests: specialRequests,
      status,
    };

    if (initialValues.id) {
      // Update existing reservation
      axios
        .put(`/api/reservations/${initialValues.id}`, formData)
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
      // Create new reservation
      axios
        .post('/api/reservations', formData)
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
        <label htmlFor="user_id">User ID</label>
        <input type="text" id="user_id" value={user_id} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="restaurant_id">Restaurant ID</label>
        <input type="text" id="restaurant_id" value={restaurant_id} onChange={(e) => setRestaurantId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="date">Reservation Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="time">Reservation Time</label>
        <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">Guest Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Guest Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phone">Guest Phone</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="partySize">Party Size</label>
        <input type="number" id="partySize" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
      </div>
      <div>
        <label htmlFor="specialRequests">Special Requests</label>
        <textarea id="specialRequests" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationForm;
