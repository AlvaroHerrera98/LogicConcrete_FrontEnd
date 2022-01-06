import React from 'react'
//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
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
    tableContainer:{
        display:'block'
    },
    table:{
        display:'flex'
    },
    tableHead:{
        display:'flex',
        flexDirection:'column',
    },
    tableBody:{
        display:'flex',
        flexGrow:1,
    },
    tableRow:{
        display:'flex',
        flexDirection: 'column',
        flewGrow: 1,
    },
}));



const IngridientsDetail = (props) => {
	

	const { allIngridients } = props;
	console.log(allIngridients)
	const classes = useStyles();
	if (!allIngridients || allIngridients.length === 0) return <p>La informacion solicitada no fue encontrada, lo sentimos</p>;
	return (
		<React.Fragment>
			<Box mt={3}>
				<Container  maxWidth="md" component="main">
				<Paper className={classes.root}>
					<TableContainer  >
						<Table className={classes.table} aria-label="sticky table">
								<TableRow className={classes.tableHead}>
									<TableCell align="center">Agua</TableCell>
									<TableCell align="center">Arena</TableCell>
                                    <TableCell align="center">Grava</TableCell>
                                    <TableCell align="center">Cemento</TableCell>
                                    <TableCell align="center">Aditivo</TableCell>
								</TableRow>
							<TableBody className={classes.tableBody}>
								{allIngridients.map((ingridients) => {
									return (
										<TableRow className={classes.tableRow} key= {ingridients.id}>

											<TableCell align="center">
												{ingridients.agua} kg/m³
											</TableCell>

                                            <TableCell align="center">
												{ingridients.arena} kg/m³
											</TableCell>

                                            <TableCell align="center">
												{ingridients.grava} kg/m³
											</TableCell>

                                            <TableCell align="center">
												{ingridients.cemento} kg/m³
											</TableCell>

                                            <TableCell align="center">
												{ingridients.aditivo} kg/m³
											</TableCell>

											{/* <TableCell align="center">
												<Link
													color="textPrimary"
													href='#'
													className={classes.link}
												>
													<EditIcon></EditIcon>
												</Link>
											</TableCell> */}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
			</Box>
		</React.Fragment>
	);
};
export default IngridientsDetail