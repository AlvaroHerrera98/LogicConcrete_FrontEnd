import React from "react";
import Actions from './actions'
import OrderSelect from './orderselect'



import Container from '@material-ui/core/Container';




export default function Interface({allOrders, allVehicules, onStartProduction}) {

  

  return (
    <React.Fragment>
    <Container style={{display:'flex', flexDirection:'row', alignContent:'flex-end'}}>
        <Actions onStartProduction={onStartProduction}/>
		    <OrderSelect allOrders={allOrders} allVehicules={allVehicules}/>
    </Container>
    </React.Fragment>
  );
}