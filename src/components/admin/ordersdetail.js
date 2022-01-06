import React, {useState} from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { OrderCreate } from '../modals/create/orderCreate'
import OrderEdit from '../admin/edit/orderedit'
import Delete from './delete/delete'
//Material-UI 
import CssBaseline from '@mui/material/CssBaseline';
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

	const [editOpen, setEditOpen] = useState(false)

	const history = useHistory();
	
	const [deleteOpen, setDeleteOpen] = useState(false);

	const [orderId, setOrderId] = useState("");

	const initialFormData = Object.freeze({
		name: '',
        client: '',
        mixture: '',
        measure: '',
        destination: '',
		date: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	
	const getOrder = id => (e) =>{
		axiosInstance.get('orders/edit/orderdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'name': res.data.name,
				'client': res.data.client,
				'mixture':res.data.mixture,
				'measure': res.data.measure,
                'destination': res.data.destination,
                'date': res.data.date,
			});
			console.log(res.data);
		},[updateFormData]);
		setOrderId(id)
		setEditOpen(true)
	}


	const onDelete = id => (e) => {
		e.preventDefault();
		axiosInstance
			.delete('orders/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/main/orders/',
					});
					window.location.reload();
			});
		setDeleteOpen(false)
	}

	const deleteOrder = id => e => {
		setOrderId(id)
		setDeleteOpen(true)
	}
	const handleClose = () => setDeleteOpen(false)


	const handleOpen = () => setOpen(true);
  
	const { allOrders } = props;
	const { allClients } = props;
	const { allMixtures } = props;
	
	const classes = useStyles();
	if (!allOrders || allOrders.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
	return (
		<React.Fragment>
			<CssBaseline />
			<Box mt={3}>
				<Container maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer className={classes.container}>
						<Table aria-label="sticky table">
							<TableHead>
								<TableRow>
                                    <TableCell align="left">Nombre</TableCell>
									<TableCell align="left">Cliente</TableCell>
									<TableCell align="left">Mezcla</TableCell>
									<TableCell align="left">Cantidad</TableCell>
                                    <TableCell align="left">Destino</TableCell>
                                    <TableCell align="left">Fecha</TableCell>
									<TableCell align="center">Accion</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allOrders.map((orders) => {
									return (
										<TableRow key= {orders.id}>

                                            <TableCell align="left">
                                                {orders.name}
                                            </TableCell>

											<TableCell align="left">
                                                {orders.client}
                                            </TableCell>

											<TableCell align="left">
												{orders.mixture}
											</TableCell>

                                            <TableCell align="left">
												{orders.measure} M³
											</TableCell>

                                            <TableCell align="left">
												{orders.destination}
											</TableCell>

                                            <TableCell align="left">
												{orders.date}
											</TableCell>

											<TableCell align="left">
												<Button
													className={classes.link}
													onClick={getOrder(orders.id)}
												>
													<EditIcon></EditIcon>
												</Button>
												<Button
													className={classes.link}
													onClick={deleteOrder(orders.id)}
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
											Agregar Orden
										</Button>
										<OrderCreate 
										open={open} 
										setOpen={setOpen} 
										allClients={allClients}
										allMixtures={allMixtures}
										/>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<OrderEdit
					open={editOpen} 
					setOpen={setEditOpen} 
					initialFormData={initialFormData}	
					formData={formData}
					updateFormData={updateFormData}				
					orderId={orderId}					
					allClients={allClients}
					allMixtures={allMixtures}
					/>
					<Delete
					open={deleteOpen}
					onClose={handleClose}
					clientId={orderId}
					onDelete={onDelete(orderId)}
					/>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default OrderDetail