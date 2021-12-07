import React, { useEffect, useState } from 'react'
import '../../App.css'
import PageNavBar from '../nav/pagenav';
import LoadingComponent from '../loading'
import OrderDetail from '../admin/ordersdetail';
import axiosInstance from '../../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';


function Orders() {

    const Loading = LoadingComponent(OrderDetail);
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
        
        

    }
    useEffect(() => {
        fetchData()
        return () => {
            setAppState({}); 
            setClientsState({}); 
            setMixtureState({});
          }
        
    },[]);

    
    return (
        <React.Fragment>
            <PageNavBar/>
            <Box mt={4}>
                <Container>
                    <div>
                        <h1 style={{textAlign: 'center'}}> Ordenes </h1>
                            <Loading isLoading={appState.loading} allOrders={appState.orders} allClients={clientsState.clients} allMixtures={mixtureState.mixtures} />
                    </div>  
                </Container>  
            </Box>
            
        </React.Fragment>
        

    )
}

export default Orders;