import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialCard = ({ name, role, quote }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <FormatQuoteIcon color="action" sx={{ fontSize: 40, opacity: 0.5 }} />
        <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2, color: 'text.secondary' }}>
          "{quote}"
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, fontWeight: 'bold' }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;