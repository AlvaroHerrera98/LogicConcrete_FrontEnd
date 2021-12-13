import React, { useEffect, useState } from 'react'
import '../App.css'
import PageNavBar from '../components/nav/pagenav';
import Progress from '../components/admin/progress/progress'
import LoadingComponent from './loading'
import axiosInstance from '../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


function Main() {

    const Loading = LoadingComponent(Progress);
    const [ appState, setAppState] = useState({
        loading: true,
        orders: [],
       
    })

    const [ clientsState, setClientsState] = useState({
        clients: [],
    })
    const [mixtureState, setMixtureState] = useState({
        mixtures: [],
    }) 
    const [vehiculesState, setVehiculesState] = useState({
        vehicules:[]
    })

    const fetchData = async () => {

        // eslint-disable-next-line no-unused-vars
        const order =  axiosInstance.get('orders/').then((res) => {
            const allOrders = res.data
            setAppState({orders: allOrders, loading: false} )
            console.log(res.data)
        })

        // eslint-disable-next-line no-unused-vars
        const client = axiosInstance.get('clients/').then((res) => {
            const allClients = res.data
            setClientsState({clients: allClients, loading: false} )
            console.log(res.data)
        })

        // eslint-disable-next-line no-unused-vars
        const mixture =axiosInstance.get('mixtures/').then((res) => {
            const allMixtures = res.data
            setMixtureState({mixtures: allMixtures, loading: false} )

        })

        // eslint-disable-next-line no-unused-vars
        const employee = axiosInstance.get('vehicules/').then((res) => {
            const allVehicules = res.data
            setVehiculesState({vehicules: allVehicules, loading: false} )

        })
        
        

    }

    useEffect(() => {

        fetchData()
        return () => {
            setAppState({}); 
            setClientsState({}); 
            setMixtureState({});
            setVehiculesState({});
          }
        
    }, []);

    
    return (
        <React.StrictMode>
            <PageNavBar/>
            
            <Box mt={4}>
              
              <Container>
                <div>
                    <Loading isLoading={appState.loading} allOrders={appState.orders} allClients={clientsState.clients} allMixtures={mixtureState.mixtures} allVehicules={vehiculesState.vehicules} />
                </div>  
              </Container>
            </Box>
        </React.StrictMode>
        

    )
}

export default Main;