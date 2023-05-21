import * as React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Test({ auth }) {
  const [restaurants, setRestaurants] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const newRestaurantId = auth.newRestaurantId;

  useEffect(() => {
    axios
      .get('api/restaurants')
      .then((response) => {
        setRestaurants(response.data.restaurants);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <AuthenticatedLayout user={auth}>
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={3}>
            {restaurants.map((restaurant, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} style={{ backgroundColor: restaurant.id === newRestaurantId ? 'lightgreen' : 'initial' }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={restaurant.name}
                    subheader={restaurant.created_at}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'Address: ' + restaurant.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'Phone: ' + restaurant.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'Website: ' + restaurant.website}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {'Opening hours: ' + restaurant.opening_hours}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>
                        {'Cuisine: ' + restaurant.cuisine}
                      </Typography>
                      <Typography paragraph>
                        {'Price range: ' + restaurant.price_range}
                      </Typography>
                      <Typography paragraph>
                        {'Capacity: ' + restaurant.capacity}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </AuthenticatedLayout>
  );
}

export default Test;
