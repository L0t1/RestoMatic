import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, MenuItem, Select } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/reservations')
      .then((response) => {
        setReservations(response.data.reservations);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setFlashMessage('An error occurred while fetching reservations');
      });
  }, []);

  const handleStatusChange = (reservationId, newStatus) => {
    axios
      .put(`http://localhost:8000/api/reservations/${reservationId}/update-status`, { status: newStatus })
      .then(() => {
        const updatedReservations = reservations.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, status: newStatus };
          }
          return reservation;
        });
        setReservations(updatedReservations);
        setFlashMessage('Reservation status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating reservation status:', error);
        setFlashMessage('An error occurred while updating the reservation status');
      });
  };

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'guest_name', headerName: 'Guest Name', width: 200 },
    { field: 'reservation_date', headerName: 'Reservation Date', width: 150 },
    { field: 'reservation_time', headerName: 'Reservation Time', width: 150 },
    { field: 'party_size', headerName: 'Party Size', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <FormControl variant="standard">
          <Select
            value={params.value}
            onChange={(event) => handleStatusChange(params.row.id, event.target.value)}
            style={{ color: getStatusCellColor(params.value) }}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
      <CSSTransition
        in={flashMessage !== ''}
        timeout={300}
        classNames="flash-message"
        unmountOnExit
        onEntered={() => setTimeout(() => setFlashMessage(''), 3000)}
      >
        <div className="flash-message">{flashMessage}</div>
      </CSSTransition>
      <div style={{ flex: 1, position: 'relative' }}>
        <DataGrid
          rows={reservations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          autoHeight
        />
      </div>
    </div>
  );
};

export default ReservationList;
