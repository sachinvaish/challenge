import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { onClose } from '../redux/features/alertSlice';

export default function AlertMessage() {

  const { open, severity, message } = useSelector((state) => ({ ...state.AlertReducer }));
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={onClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
