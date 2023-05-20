import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/reservations')
      .then((response) => {
        setReservations(response.data.reservations);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Function to determine the cell color based on the status
  const getStatusCellColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FFC107'; // Yellow color for 'Pending' status
      case 'Confirmed':
        return '#4CAF50'; // Green color for 'Confirmed' status
      case 'Cancelled':
        return '#F44336'; // Red color for 'Cancelled' status
      default:
        return '#000000'; // Black color for other statuses
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Reservation List" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Guest Name</TableCell>
            <TableCell>Reservation Date</TableCell>
            <TableCell>Reservation Time</TableCell>
            <TableCell>Party Size</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.guest_name}</TableCell>
              <TableCell>{reservation.reservation_date}</TableCell>
              <TableCell>{reservation.reservation_time}</TableCell>
              <TableCell>{reservation.party_size}</TableCell>
              <TableCell style={{ color: getStatusCellColor(reservation.status) }}>
                {reservation.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationList;
