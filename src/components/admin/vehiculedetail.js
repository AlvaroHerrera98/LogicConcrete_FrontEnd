import React, {useState} from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { VehiculeCreate } from '../modals/create/vehiculeCreate'
import VehiculeEdit from '../admin/edit/vehiculeEdit'
import Delete from './delete/delete'
//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));



const OrderDetail = (props) => {
	const [open, setOpen] = useState(false)

	const history = useHistory();
	
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  
	const { allVehicules } = props;
	const { allEmploy } = props

	const [vehiculeId, setVehiculeId] = useState("");

	const [editOpen, setEditOpen] = useState(false)

	const initialFormData = Object.freeze({
		name: '',
        employees: '',

	});

	const [formData, updateFormData] = useState(initialFormData);
	
	const getVehicule = id => (e) =>{
		axiosInstance.get('vehicules/edit/vehiculesdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'name': res.data.name,
				'employees': res.data.employees,
				
			});
			console.log(res.data);
		},[updateFormData]);
		setVehiculeId(id)
		setEditOpen(true)
	}

	const onDelete = id => (e) => {
		e.preventDefault();
		axiosInstance
			.delete('vehicules/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/main/employees/',
					});
					window.location.reload();
			});
		setDeleteOpen(false)
	}

	const deleteVehicule = id => e => {
		setVehiculeId(id)
		setDeleteOpen(true)
	}
	const handleClose = () => setDeleteOpen(false)

	console.log(allVehicules)
	const classes = useStyles();
	if (!allVehicules || allVehicules.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
	return (
		<React.Fragment>
			<Box mt={3}>
				<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table aria-label="sticky table">
							<TableHead>
								<TableRow>
                                    <TableCell align="left">Nombre</TableCell>
									<TableCell align="left">Empleado</TableCell>
									<TableCell align="center">Accion</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allVehicules.map((vehicules) => {
									return (
										<TableRow key= {vehicules.id}>

                                            <TableCell align="left">
                                                {vehicules.name}
                                            </TableCell>

                                            <TableCell align="left">
                                                {vehicules.employees}
                                            </TableCell>

											<TableCell align="center">
												<Button
													className={classes.link}
													onClick={getVehicule(vehicules.id)}
												>
													<EditIcon></EditIcon>
												</Button>
												<Button
													className={classes.link}
													onClick={deleteVehicule(vehicules.id)}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={8} align="right">
										<Button
											// href={'/admin/create'}
											variant="contained"
											style={{background: '#c67649', 
													textAlign: 'center',}}
											color="primary"
											onClick={handleOpen}
										>
											Agregar Vehiculo
										</Button>
										<VehiculeCreate 
										open={open} 
										setOpen={setOpen} 
										allEmploy={allEmploy}/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<VehiculeEdit
					open={editOpen} 
					setOpen={setEditOpen} 
					initialFormData={initialFormData}	
					formData={formData}
					updateFormData={updateFormData}				
					vehiculeId={vehiculeId}
					allEmploy={allEmploy}
					/>
					<Delete
					open={deleteOpen}
					onClose={handleClose}
					clientId={vehiculeId}
					onDelete={onDelete(vehiculeId)}
					/>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default OrderDetail