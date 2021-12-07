import React, {useState} from 'react'
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { MixtureCreate } from '../modals/create/mixtureCreate'
import MixtureEdit from '../admin/edit/mixtureEdit'
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



const MixtureDetail = (props) => {
	const [open, setOpen] = useState(false)

	const history = useHistory();
	
	const [deleteOpen, setDeleteOpen] = useState(false);

	const handleOpen = () => setOpen(true);
  
	const { allMixtures } = props;

	const [mixtureId, setMixtureId] = useState("");

	const [editOpen, setEditOpen] = useState(false)

	const initialFormData = Object.freeze({
		name: '',
        agua: '',
        arena: '',
        grava: '',
		cemento: '',
        aditivo: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
	
	const getMixture = id => (e) =>{
		axiosInstance.get('mixtures/edit/mixturesdetail/' + id).then((res) => {
			updateFormData({
				...formData,
				'name': res.data.name,
				'agua': res.data.agua,
				'arena':res.data.arena,
				'grava': res.data.grava,
                'cemento': res.data.cemento,
                'aditivo': res.data.aditivo,
			});
			console.log(res.data);
		},[updateFormData]);
		setMixtureId(id)
		setEditOpen(true)
	}

	const onDelete = id => (e) => {
		e.preventDefault();
		axiosInstance
			.delete('mixtures/delete/' + id)
			.catch(function (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/main/mixtures/',
					});
					window.location.reload();
			});
		setDeleteOpen(false)
	}

	const deleteMixture = id => e => {
		setMixtureId(id)
		setDeleteOpen(true)
	}
	const handleClose = () => setDeleteOpen(false)

	console.log(allMixtures)
	const classes = useStyles();
	if (!allMixtures || allMixtures.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
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
									<TableCell align="left">Agua</TableCell>
									<TableCell align="left">Arena</TableCell>
                                    <TableCell align="left">Grava</TableCell>
                                    <TableCell align="left">Cemento</TableCell>
                                    <TableCell align="left">Aditivo</TableCell>
									<TableCell align="center">Accion</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allMixtures.map((mixtures) => {
									return (
										<TableRow key= {mixtures.id}>

											<TableCell align="left">
                                                {mixtures.name}
                                            </TableCell>

											<TableCell align="left">
												{mixtures.agua}
											</TableCell>

                                            <TableCell align="left">
												{mixtures.arena}
											</TableCell>

                                            <TableCell align="left">
												{mixtures.grava}
											</TableCell>

                                            <TableCell align="left">
												{mixtures.cemento}
											</TableCell>

                                            <TableCell align="left">
												{mixtures.aditivo}
											</TableCell>

											<TableCell align="left">
												<Button
													className={classes.link}
													onClick={getMixture(mixtures.id)}
												>
													<EditIcon></EditIcon>
												</Button>
												<Button
													className={classes.link}
													onClick={deleteMixture(mixtures.id)}
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
											variant="contained"
											style={{background: '#c67649', 
													textAlign: 'center',}}
											color="primary"
											onClick={handleOpen}
										>
											Agregar Mezcla
										</Button>
										<MixtureCreate open={open} setOpen={setOpen} />
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<MixtureEdit
					open={editOpen} 
					setOpen={setEditOpen} 
					initialFormData={initialFormData}
					mixtureId={mixtureId}
					formData={formData}
					updateFormData={updateFormData}					
					/>
					<Delete
					open={deleteOpen}
					onClose={handleClose}
					clientId={mixtureId}
					onDelete={onDelete(mixtureId)}
					/>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default MixtureDetail