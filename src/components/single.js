import React, {useState, useEffect} from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import  Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
}));

export default function Post() {
    const { slug } = useParams()
    const classes = useStyles()

    const[data, setData] = useState({post : [] });

    useEffect(() => {
        axiosInstance.get(slug).then((res) => {
            setData({post:res.data});
            console.log(res.data)
        });
    }, [setData]);



    return (
        <Container component="main" maxWidth="md">
            <CssBaseline/>
            <div className={classes.paper}></div>
            <div className={classes.heroContent}></div>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    {data.post.title}
                </Typography>
            </Container>
        </Container>
    )
}