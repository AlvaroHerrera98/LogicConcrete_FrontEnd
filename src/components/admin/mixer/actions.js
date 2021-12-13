import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import * as MuiIcon from '@mui/icons-material/';
import Typography from '@mui/material/Typography';

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

export default function Actions() {

    
  return (
    <React.Fragment>
    <Container>
        <Box mt={15} style={{style}}>
        <Card>
            <CardContent>
            <Typography style={{display: 'flex', justifyContent:'center', alignContent:'center'}} variant="h4" component="div">
            Planta
            </Typography>
			<Paper style={{display: 'flex', justifyContent:'center', alignContent:'center'}}>
				<Grid container style={{justifyContent:'center'}}>
                <Grid item >
                    <Button
                    
                    >
                    <MuiIcon.PowerSettingsNew></MuiIcon.PowerSettingsNew>
                    </Button>
                </Grid>
                {/* <Grid item xs={2} sm={6} md={3}>
                    <Button
                    
                    >
                    <MuiIcon.StopCircle></MuiIcon.StopCircle>
                    </Button>
                </Grid> */}
                <Grid item >
                    <Button
                    
                    >
                    <MuiIcon.PlayArrow></MuiIcon.PlayArrow>
                    </Button>
                </Grid>
                {/* <Grid item xs={2} sm={6} md={3}>
                    <Button
                    
                    >
                    <MuiIcon.Pause></MuiIcon.Pause>
                    </Button>
                </Grid> */}
            </Grid>
			</Paper> 
            </CardContent>
        </Card>
        
        </Box>
    </Container>
    </React.Fragment>
  );
}