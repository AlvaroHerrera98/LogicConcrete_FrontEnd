import React from 'react';
//MaterialUI
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Delete({open, onClose, onDelete}) {
    
    return (
        <Dialog
          open={open}
          onClose={onClose}
          onDelete={onDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Estas  Seguro que quieres eliminar a este Elemento ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Al confirmar estara eliminando este Elemento.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              No
            </Button>
            <Button onClick={onDelete} color="primary" autoFocus>
              Confirma
            </Button>
          </DialogActions>
        </Dialog>
      );
}