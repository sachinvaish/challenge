import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

export default function ConfirmDialogue(props) {
    const { open, onClose, data, method } = props;

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle id="alert-dialog-title">
          "Delete Challenge"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to DELETE this Challenge ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={()=>method(data)} color='error' variant='contained' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}
