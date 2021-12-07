import React from 'react';
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

const dateNow = new Date(); 

const year = dateNow.getFullYear(); 

const monthWithOffset = dateNow.getUTCMonth() + 1; 

const month = 
  monthWithOffset.toString().length < 2 
    ? `0${monthWithOffset}`
    : monthWithOffset;

const date =
  dateNow.getUTCDate().toString().length < 2 
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; 


export default function OrderEdit ({open, setOpen, orderId, formData , updateFormData, allClients, allMixtures}) {

  const handleClose = () => setOpen(false)

  const classes = useStyles();

  const history = useHistory();
	

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
			.put(`orders/edit/` + orderId + '/', {
				name: formData.name,
                client: formData.client,
				mixture: formData.mixture,
				measure: formData.measure,
				destination: formData.destination,
                date: formData.date,
			})
			.then(function () {
				history.push({
					pathname: '/main/orders/',
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
					Modificacion de Orden
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Nombre de la Orden"
								name="name"
								autoComplete="name"
								value={formData.name}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<TextField
								select
								variant="outlined"
								required
								fullWidth
								id="client"
								label="Clientes"
								name="client"
								autoComplete="client" 
								onChange={handleChange}
								value={formData.client}
								style={{display:"flex"}}
							>
								{allClients.map((cli) => {
									return (
										<MenuItem key={cli.id} value={cli.id}>
												{cli.firstname}
										</MenuItem>
									)
								})}
							
							</TextField>
							</FormControl>
							
						</Grid>
                        <Grid item xs={12} sm={6}>
							<FormControl fullWidth>
							<TextField
								select
								variant="outlined"
								required
								fullWidth
								id="mixture"
								label="Mezcla"
								name="mixture"
								autoComplete="mixture"
								value={formData.mixture}
								onChange={handleChange}
							>
								{allMixtures.map((mix) => {
									return (
										<MenuItem key={mix.id} value={mix.id}>
												{mix.name}
										</MenuItem>
									)
								})}
							</TextField>
							</FormControl>	
						</Grid>
						<Grid item xs={12} sm={4}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="measure"
								label="Cantidad"
								name="measure"
								autoComplete="measure"
								value={formData.measure}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12} sm={8}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="destination"
								label="Destino del Vehiculo"
								name="destination"
								autoComplete="destination"
								value={formData.destination}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
						<TextField
								variant="outlined"
								required
								type="date"
								fullWidth
								id="date"
								label="Fecha de Entrega"
								defaultValue={materialDateInput}
								name="date"
								value={formData.date}
								onChange={handleChange}
							/>
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
						    Agregar Orden
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
