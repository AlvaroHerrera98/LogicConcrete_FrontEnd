import React from 'react';
import axiosInstance from '../../../axios';
import { useHistory } from 'react-router-dom';
//Material-UI

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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



export default function MixtureEdit ({open, setOpen, mixtureId, formData , updateFormData,}) {

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
			.put(`mixtures/edit/` + mixtureId + '/', {
				name: formData.name,
                agua: formData.agua,
				arena: formData.arena,
				grava: formData.grava,
				cemento: formData.cemento,
                aditivo: formData.aditivo,
			})
			.then(function () {
				history.push({
					pathname: '/main/mixtures/',
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
					Modificacion de Mezlcla
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Nombre de la Mezcla"
								name="name"
								autoComplete="name"
                                value={formData.name}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="agua"
								label="Porcentaje de Agua"
								name="agua"
								autoComplete="agua"
                                value={formData.agua}
                                onInput = {(e) =>{
									e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,4)
								}}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								type="number"
								required
								fullWidth
								id="arena"
								label="Porcentaje de Arena"
								name="arena"
								autoComplete="arena"
                                value={formData.arena}
								onInput = {(e) =>{
									e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,4)
								}}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="grava"
								label="Porcentaje de Grava"
								name="grava"
								autoComplete="grava"
                                value={formData.grava}
                                onInput = {(e) =>{
									e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,4)
								}}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="cemento"
								label="Porcentaje de Cemento "
								name="cemento"
								autoComplete="cemento"
                                value={formData.cemento}
                                onInput = {(e) =>{
									e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,4)
								}}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
                                type="number"
								required
								fullWidth
								id="aditivo"
								label="Porcentaje de Aditivo"
								name="aditivo"
								autoComplete="aditivo"
                                value={formData.aditivo}
                                onInput = {(e) =>{
									e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,4)
								}}
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
						    Modificar Mezcla
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