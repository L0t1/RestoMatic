import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [flashMessage, setFlashMessage] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/reservations')
      .then((response) => {
        setReservations(response.data.reservations);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        console.error('Error:', error);
        setFlashMessage('An error occurred while updating the reservation status');
      });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);
    setPage(0);
  };

  const sortedReservations = stableSort(reservations, getComparator(order, orderBy));
  const filteredReservations = filterStatus
    ? sortedReservations.filter((reservation) => reservation.status === filterStatus)
    : sortedReservations;
  const paginatedReservations = filteredReservations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div>
      <CSSTransition
        in={flashMessage !== ''}
        timeout={300}
        classNames="flash-message"
        unmountOnExit
        onEntered={() => setTimeout(() => setFlashMessage(''), 3000)}
      >
        <div className="flash-message">
          {flashMessage}
        </div>
      </CSSTransition>
      <TableContainer component={Paper}>
        <Table aria-label="Reservation List" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'guest_name'}
                  direction={orderBy === 'guest_name' ? order : 'asc'}
                  onClick={() => handleSortChange('guest_name')}
                >
                  Guest Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'reservation_date'}
                  direction={orderBy === 'reservation_date' ? order : 'asc'}
                  onClick={() => handleSortChange('reservation_date')}
                >
                  Reservation Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'reservation_time'}
                  direction={orderBy === 'reservation_time' ? order : 'asc'}
                  onClick={() => handleSortChange('reservation_time')}
                >
                  Reservation Time
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'party_size'}
                  direction={orderBy === 'party_size' ? order : 'asc'}
                  onClick={() => handleSortChange('party_size')}
                >
                  Party Size
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Status
                <select value={filterStatus} onChange={handleFilterStatusChange}>
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.guest_name}</TableCell>
                <TableCell>{reservation.reservation_date}</TableCell>
                <TableCell>{reservation.reservation_time}</TableCell>
                <TableCell>{reservation.party_size}</TableCell>
                <TableCell style={{ color: getStatusCellColor(reservation.status) }}>
                  <select
                    value={reservation.status}
                    onChange={(event) => handleStatusChange(reservation.id, event.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredReservations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

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

// Function to sort an array of objects based on a property
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

// Function to get comparator based on order and property
const getComparator = (order, property) => {
  if (order === 'desc') {
    return (a, b) => descendingComparator(a, b, property);
  }
  return (a, b) => -descendingComparator(a, b, property);
};

// Function to compare two values in descending order
const descendingComparator = (a, b, property) => {
  if (b[property] < a[property]) {
    return -1;
  }
  if (b[property] > a[property]) {
    return 1;
  }
  return 0;
};

export default ReservationList;
