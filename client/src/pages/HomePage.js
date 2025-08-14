import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../features/reviews/reviewSlice'; // <-- IMPORT a_c_t_i_o_n
import { Box, Typography, Container, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import TestimonialCard from '../components/TestimonialCard';

function HomePage() {
  const dispatch = useDispatch();

  // Get data from the new 'reviews' slice of the Redux state
  const { reviews, isLoading, isError, message } = useSelector(
    (state) => state.reviews
  );

  // When the page loads, dispatch the action to fetch reviews from the API
  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <Box>
      {/* --- Hero Section --- */}
      <Paper sx={{ p: { xs: 4, md: 8 }, mb: 4, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography component="h1" variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          LogiStudent
        </Typography>
        <Typography variant="h5" align="center" component="p">
          Your hassle-free luggage storage solution at VIT Bhopal.
        </Typography>
      </Paper>
      
      {/* --- Testimonials Section --- */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          What Our Users Say
        </Typography>

        {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
        {isError && <Alert severity="error">{message}</Alert>}
        
        {!isLoading && !isError && (
          <Grid container spacing={4}>
            {reviews.map((review) => (
              <Grid item key={review._id} xs={12} md={4}>
                <TestimonialCard 
                  name={review.name}
                  role={review.role}
                  quote={review.quote}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;