import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axios';
import { useHistory, useParams } from 'react-router-dom';
import PageNavBar from '../../nav/pagenav';
//MaterialUI
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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

export default function Edit() {
	const history = useHistory();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		firstname: '',
        lastname: '',
		slug: '',
        phone_number: '',
        email: '',
		company: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('clients/edit/clientdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'firstname': res.data.firstname,
				'lastname': res.data.lastname,
				'slug': res.data.slug,
				'phone_number': res.data.phone_number,
                'email': res.data.email,
                'company': res.data.company,
			});
			console.log(res.data);
		});
	},// eslint-disable-next-line 
	[updateFormData]
	);
	const handleBack = (e) => {
		history.push('/main/clients')
	}
	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`clients/edit/` + id + '/', {
			firstname: formData.firstname,
			lastname: formData.lastname,
			slug: formData.slug,
			phone_number: formData.phone_number,
			email: formData.email,
			company: formData.company,
			
		});
		history.push({
			pathname: '/main/clients/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<React.StrictMode>
			<PageNavBar/>
			<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
				Modificación de Cliente
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="firstname"
								label="Nombre del Cliente"
								name="firstname"
								autoComplete="firstname"
								value={formData.firstname}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastname"
								label="Apellido del Cliente"
								name="lastname"
								autoComplete="lastname"
								value={formData.lastname}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phone_number"
								label="Numero Telefonico del Cliente"
								name="phone_number"
								autoComplete="phone_number"
								value={formData.phone_number}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email del Cliente"
								name="email"
								autoComplete="email"
								value={formData.email}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="Company"
								label="Compañia del Cliente"
								name="company"
								autoComplete="company"
								value={formData.company}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="Slug"
								name="slug"
								autoComplete="slug"
                                hidden
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={3}>
					<Box>
                        <Button
						    type="submit"
                            style={{background: '#c67649', textAlign: 'center',}}
						    fullWidth
						    variant="contained"
						    color="primary"
						    className={classes.submit}
						    onClick={handleBack}
					    >
						    Regreso
					    </Button>
                    </Box>
					</Grid>
					<Grid item xs={12} sm={9}>
					<Box>
                        <Button
						    type="submit"
                            style={{background: '#c67649', textAlign: 'center',}}
						    fullWidth
						    variant="contained"
						    color="primary"
						    className={classes.submit}
						    onClick={handleSubmit}
					    >
						    Modiciar Cliente
					    </Button>
                    </Box>
					</Grid>
					</Grid>
				</form>
			</div>
		</Container>			
		</React.StrictMode>
		
        
	);
}