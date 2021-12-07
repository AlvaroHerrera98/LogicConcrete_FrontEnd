import React, { useState,} from 'react';
import axiosInstance from '../../../axios';
import { useHistory } from 'react-router-dom';
//Material-UI
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
	paper: {
		//marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
    select: {
            
    }
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export const EmployeeCreate = ({open, setOpen, allRols}) => {

  const handleClose = () => setOpen(false)

  const classes = useStyles();

  const history = useHistory();

  
    const initialFormData = Object.freeze({
		firstname: '',
        lastname: '',
        phone_number : '',
        email : '',
        address : '',
		rol: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	

	const handleChange = (e) => {
		if ([e.target.name] === 'name') {
			updateFormData({
				...formData,
				[e.target.name]: e.target.value
			});
		} else {
			updateFormData({
				...formData,
				[e.target.name]: e.target.value,
				
			});
		}

	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`employees/create/`, {
				firstname: formData.firstname,
                lastname: formData.lastname,
				phone_number: formData.phone_number,
				email: formData.email,
				address: formData.address,
                rol: formData.rol,
			})
			.then(function () {
				history.push({
					pathname: '/main/employees/',
				});
				window.location.reload();
			}).catch(err => console.log(err));
			
	};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Ingresar Nuevo Empleado
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="firstname"
								label="Nombre del Empleado"
								name="firstname"
								autoComplete="firstname"
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastname"
								label="Apellido del Empleado"
								name="lastname"
								autoComplete="lastname"
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								type="number"
								required
								fullWidth
								id="phone_number"
								label="Numero Telefonico del Empleado"
								name="phone_number"
								autoComplete="phone_number"
								onInput = {(e) =>{
									e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
								}}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="address"
								label="Direccion del Empleado"
								name="address"
								autoComplete="address"
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								type="email"
								required
								fullWidth
								id="email"
								label="Email del Cliente"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<FormControl fullWidth>
								<TextField
								select
								variant="outlined"
								required
								fullWidth
								id="rol"
								label="Rol"
								name="rol"
								autoComplete="rol" 
								onChange={handleChange}
								style={{display:"flex"}}
							>
								{allRols.map((rol) => {
									return (
										<MenuItem key={rol.id} value={rol.id}>
												{rol.name}
										</MenuItem>
									)
								})}
							
							</TextField>
							</FormControl>
						</Grid>
					</Grid>
                    <Box mt={2}>
                        <Button
						    type="submit"
                            style={{background: '#c67649', textAlign: 'center',}}
						    fullWidth
						    variant="contained"
						    color="primary"
						    className={classes.submit}
						    onClick={handleSubmit}
					    >
						    Agregar Empleado
					    </Button>
                    </Box>
					    
				</form>
			</div>
		</Container>
        </Box>
      </Modal>
    </div>
  );
}
