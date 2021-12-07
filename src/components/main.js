import React, { useEffect, useState } from 'react'
import '../App.css'
import PageNavBar from '../components/nav/pagenav';
import LoadingComponent from './loading'
import Detail from './admin/clientdetail';
import axiosInstance from '../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


function Main() {

    const Loading = LoadingComponent(Detail);
    const [ appState, setAppState] = useState({
        loading: true,
       
    })
   
    useEffect(() => {

        axiosInstance.get('').then((res) => {
            
            setAppState({ loading: false} )

        })
    }, [setAppState]);

    
    return (
        <React.StrictMode>
            <PageNavBar/>
            <Box mt={4}>
              <Container>
                <div>
                    <h1> Logic Concrete </h1>
                        <Loading isLoading={appState.loading}  />
                </div>  
              </Container>
            </Box>
        </React.StrictMode>
        

    )
}

export default Main;