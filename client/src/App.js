// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NewBookingPage from './pages/NewBookingPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage'; 
import AdminDashboardPage from './pages/AdminDashboardPage'; 
import AdminRoute from './components/AdminRoute'; 

function App() {
  return (
    <Router>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* --- Private Route Layout --- */}
          {/* This wrapper route has NO PATH. It just applies the 
              PrivateRoute logic to all of its children. */}
          <Route element={<PrivateRoute />}>
            
            {/* These are the protected child routes. They are now SIBLINGS. */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/new-booking" element={<NewBookingPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
          </Route>
           {/* --- ADMIN ONLY ROUTE --- */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;