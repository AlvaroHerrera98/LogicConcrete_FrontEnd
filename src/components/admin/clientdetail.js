import React, {useState} from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { ClientCreate } from '../modals/create/clientCreate'
import ClientEdit from './edit/edit'
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



const Detail = (props) => {

	const [open, setOpen] = useState(false)

	const history = useHistory();

	const [editOpen, setEditOpen] = useState(false)
	
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleOpen = () => setOpen(true);

	const { allClients } = props;

	const {setAppState} = props;

	const [clientId, setClientId] = useState("");

	const initialFormData = Object.freeze({
		firstname: '',
        lastname: '',
        phone_number: '',
        email: '',
		company: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const onDelete = id => (e) => {
		e.preventDefault();
		axiosInstance
			.delete('clients/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/main/clients/',
					});
					window.location.reload();
			});
		setDeleteOpen(false)
	}

	const getClient = id => (e) =>{
		axiosInstance.get('clients/edit/clientdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'firstname': res.data.firstname,
				'lastname': res.data.lastname,
				'phone_number': res.data.phone_number,
                'email': res.data.email,
                'company': res.data.company,
			});
			console.log(res.data);
		},[updateFormData]);
		setClientId(id)
		setEditOpen(true)
	}

	const deleteClient = id => e => {
		setClientId(id)
		setDeleteOpen(true)
	}

	const handleClose = () => setDeleteOpen(false)

	console.log(allClients)
	const classes = useStyles();
	if (!allClients || allClients.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
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
                                    <TableCell align="left">Compañia</TableCell>
									<TableCell align="center">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allClients.map((client) => {
									return (
										<TableRow key= {client.id}>

											<TableCell align="left">
                                                {client.firstname}
                                            </TableCell>

											<TableCell align="left">
												{client.lastname}
											</TableCell>

                                            <TableCell align="left">
													{client.phone_number}
											</TableCell>

                                            <TableCell align="left">
													{client.email}
											</TableCell>

                                            <TableCell align="left">
													{client.company}
											</TableCell>

											<TableCell align="left">
												<Button
													className={classes.link}
													onClick={getClient(client.id)}
												>
													<EditIcon></EditIcon>
												</Button>
												<Button
													className={classes.link}
													onClick={deleteClient(client.id)}
												>
													<DeleteForeverIcon></DeleteForeverIcon>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={7} align="right">
										<Button
											// href={'/admin/create'}
											variant="contained"
											style={{background: '#c67649', 
													textAlign: 'center',}}
											color="primary"
											onClick={handleOpen}
										>
											Agregar Cliente
										</Button>
										<ClientCreate 
										open={open} 
										setOpen={setOpen} 
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<ClientEdit
					open={editOpen}
					onClose={handleClose}
					clientId={clientId}
					initialFormData={initialFormData}
					formData={formData}
					updateFormData={updateFormData}
					setAppState={setAppState}
					/>
					<Delete
					open={deleteOpen}
					onClose={handleClose}
					clientId={clientId}
					onDelete={onDelete(clientId)}
					/>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default Detail