import React, { useEffect, useState } from 'react'
import '../../App.css'
import PageNavBar from '../nav/pagenav';
import LoadingComponent from '../loading'
import EmployeeDetail from '../admin/employeedetail';
import axiosInstance from '../../axios';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import Vehicules from './vehicules';


function Employees() {

    const Loading = LoadingComponent(EmployeeDetail);
    const [ appState, setAppState] = useState({
        loading: true,
        employees: [],
    })

    const [rolState, setRolState] = useState({
        rols: [],
    })

    const fetchData = () =>{

        // eslint-disable-next-line no-unused-vars
        const employee = axiosInstance.get('employees/').then((res) => {
            const allEmployees = res.data
            setAppState({employees: allEmployees, loading: false} )

        })

        // eslint-disable-next-line no-unused-vars
        const rol = axiosInstance.get('rols/').then((res) => {
            const allRols = res.data
            setRolState({rols: allRols } )

        })
    }

    useEffect(() => {
        fetchData()
        return () => {
            
            setAppState({}); 
            setRolState({}); 
          }

    }, [setAppState],[setRolState],[]);

    
    return (
        <React.Fragment>
            <PageNavBar/>
            <Box mt={5}>
                <Container maxWidth="lg" style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                    <div>
                        <h1 style={{textAlign: 'center'}}> Empleados </h1>
                            <Loading isLoading={appState.loading} allEmployees={appState.employees} allRols={rolState.rols} />
                            
                    </div>
                    <div>
                        <Vehicules />
                    </div>  
                </Container>  
            </Box>
            
        </React.Fragment>
        

    )
}

export default Employees;