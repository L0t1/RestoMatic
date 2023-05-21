import React from 'react';
import { Typography, Box, Button, Container, Grid } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReservationIcon from '@mui/icons-material/EventNote';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RestaurantForm from '@/Components/RestaurantForm';
import { styled } from '@mui/material/styles';

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
}));

function Index({ auth }) {
  return (
    <AuthenticatedLayout user={auth}>
      <Container maxWidth="md" style={{ backgroundColor: '#f5f5f5', marginTop: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Our Platform!
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Create your restaurant here and allow users to reserve directly from our platform.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <IconWrapper>
              <RestaurantMenuIcon style={{ fontSize: 50 }} color="primary" />
              <Typography variant="h6" color="inherit" gutterBottom>
                Create Your Restaurant
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Start your online presence by creating your restaurant page with us.
              </Typography>
            </IconWrapper>
          </Grid>
          <Grid item>
            <IconWrapper>
              <ReservationIcon style={{ fontSize: 50 }} color="primary" />
              <Typography variant="h6" color="inherit" gutterBottom>
                User Reservations
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Users can reserve directly from your restaurant page.
              </Typography>
            </IconWrapper>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={5}>
          <Button variant="contained" color="primary" size="large">
            Create Your Restaurant Now
          </Button>
        </Box>
        <Box marginTop={5}>
          <RestaurantForm />
        </Box>
      </Container>
    </AuthenticatedLayout>
  );
}

export default Index;
