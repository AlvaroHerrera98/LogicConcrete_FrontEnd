import React, {useState} from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { EmployeeCreate } from '../modals/create/employeeCreate'
import EmployeeEdit from '../admin/edit/employeeEdit'
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



const EmployeeDetail = (props) => {
	const [open, setOpen] = useState(false)

	const history = useHistory();
	
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  
	const { allEmployees } = props;

	const { allRols } = props;

	const [employeeId, setEmployeeId] = useState("");

	const [editOpen, setEditOpen] = useState(false)

	const initialFormData = Object.freeze({
		firstname: '',
        lastname: '',
        phone_number : '',
        email : '',
        address : '',
		rol: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	
	const getEmployee = id => (e) =>{
		axiosInstance.get('employees/edit/employeesdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'firstname': res.data.firstname,
				'lastname': res.data.lastname,
				'phone_number':res.data.phone_number,
				'email': res.data.email,
                'address': res.data.address,
                'rol': res.data.rol,
			});
			console.log(res.data);
		},[updateFormData]);
		setEmployeeId(id)
		setEditOpen(true)
	}


	const onDelete = id => (e) => {
		e.preventDefault();
		axiosInstance
			.delete('employees/delete/' + id)
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

	const deleteEmployee = id => e => {
		setEmployeeId(id)
		setDeleteOpen(true)
	}
	const handleClose = () => setDeleteOpen(false)

	console.log(allRols)
	console.log(allEmployees)
	const classes = useStyles();
	if (!allEmployees || allEmployees.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
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
									<TableCell align="left">Apellido</TableCell>
									<TableCell align="left">Numero Telefonico</TableCell>
									<TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Residencia</TableCell>
                                    <TableCell align="left">Rol</TableCell>
									<TableCell align="center">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allEmployees.map((employees) => {
									return (
										<TableRow key= {employees.id}>

                                            <TableCell align="left">
                                                {employees.firstname}
                                            </TableCell>

											<TableCell align="left">
                                                {employees.lastname}
                                            </TableCell>

											<TableCell align="left">
												{employees.phone_number}
											</TableCell>

                                            <TableCell align="left">
												{employees.email}
											</TableCell>

                                            <TableCell align="left">
												{employees.address}
											</TableCell>

                                            <TableCell align="left">
												{employees.rol}
											</TableCell>

											<TableCell align="left">
												<Button
													className={classes.link}
													onClick={getEmployee(employees.id)}
												>
													<EditIcon></EditIcon>
												</Button>
												<Button
													className={classes.link}
													onClick={deleteEmployee(employees.id)}
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
											Agregar Empleado
										</Button>
										<EmployeeCreate 
										open={open} 
										setOpen={setOpen} 
										allRols={allRols}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<EmployeeEdit
					open={editOpen} 
					setOpen={setEditOpen} 
					initialFormData={initialFormData}	
					formData={formData}
					updateFormData={updateFormData}				
					employeeId={employeeId}					
					allRols={allRols}
					/>
					<Delete
					open={deleteOpen}
					onClose={handleClose}
					clientId={employeeId}
					onDelete={onDelete(employeeId)}
					/>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default EmployeeDetail