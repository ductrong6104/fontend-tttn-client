// components/Footer.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        p: 3,
        position: 'relative',
        bottom: 0,
        width: '100%',
        boxShadow: 1,
        
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
