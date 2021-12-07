import React, { useEffect, useState } from 'react'
import '../../App.css'
import LoadingComponent from '../loading'
import IngridientsDetail from '../admin/ingridientsdetail';
import axiosInstance from '../../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


function Ingridients() {

    const Loading = LoadingComponent(IngridientsDetail);
    const [ appState, setAppState] = useState({
        loading: true,
        ingridients: [],
    })
   
    useEffect(() => {

        axiosInstance.get('ingridients/').then((res) => {
            const allIngridients = res.data
            setAppState({ingridients: allIngridients, loading: false} )

        })
    }, [setAppState]);

    
    return (
        <React.StrictMode>
            <Box >
                <Container>
                    <div>
                        <h1 style={{textAlign: 'center'}}> Ingredientes </h1>
                            <Loading isLoading={appState.loading} allIngridients={appState.ingridients} />
                    </div>  
                </Container>  
            </Box>
            
        </React.StrictMode>
        

    )
}

export default Ingridients;