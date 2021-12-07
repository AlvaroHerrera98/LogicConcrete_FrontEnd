import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
//import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
//import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
      margin: theme.spacing(1,1.5),
    },
    toolbarTitle: {
      flexGrow: 1,
    }
}))

export default function Navbar() {
  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
          position="static" 
          style={{background: '#c67649'}}
          className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography 
              variant="h6" 
              color="inherit"
              component="div"
              noWrap 
              className={classes.toolbarTitle}
          >
            <Link
                to="/"
                underline="none"
                color="textPrimary"
                style={{textDecoration: 'none', color:'#ffffff' }}
            >
                Logic Concrete
            </Link>
          </Typography>
          {/* <nav>
            <Link
                style={{textDecoration: 'none', color:'#ffffff' }}
                color="textPrimary"
                href="#"
                className={classes.link}
                to="/register"
            >
            Registro
            </Link>
          </nav> */}
          {/* <Button 
              color="inherit"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/"
          >
              Login
          </Button>
          <Button 
              color="inherit"
              variant="outlined"
              className={classes.link}
              component={NavLink}
              to="/logout"
          >
              Logout
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}