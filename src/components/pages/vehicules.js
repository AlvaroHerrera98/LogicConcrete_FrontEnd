import React, { useEffect, useState } from 'react'
import '../../App.css'
import LoadingComponent from '../loading'
import VehiculeDetail from '../admin/vehiculedetail';
import axiosInstance from '../../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


function Orders() {

    const Loading = LoadingComponent(VehiculeDetail);
    const [ appState, setAppState] = useState({
        loading: true,
        vehicules: [],
    })

    const [employeesState, setEmployeesState] = useState({
        employ:[]
    })
    
   
    const fetchData = () =>{

        // eslint-disable-next-line no-unused-vars
        const employee = axiosInstance.get('vehicules/').then((res) => {
            const allVehicules = res.data
            setAppState({vehicules: allVehicules, loading: false} )

        })

        // eslint-disable-next-line no-unused-vars
        const rol = axiosInstance.get('employees/').then((res) => {
            const allEmploy = res.data
            setEmployeesState({employ: allEmploy } )

        })
    }

    useEffect(() => {
        fetchData()
        return () => {
            
            setAppState({}); 
            setEmployeesState({}); 
          }

    }, [setAppState],[setEmployeesState],[]);

    
    return (
        <React.StrictMode>
            <Box >
                <Container>
                    <div>
                        <h1 style={{textAlign: 'center'}}> Vehiculos </h1>
                            <Loading isLoading={appState.loading} allVehicules={appState.vehicules} allEmploy={employeesState.employ} />
                    </div>  
                </Container>  
            </Box>
            
        </React.StrictMode>
        

    )
}

export default Orders;