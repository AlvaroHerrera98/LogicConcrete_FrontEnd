import React,  { useState, useEffect }  from "react";
import Container from '@material-ui/core/Container';
import './progressbar.css'
import ProgressBar from 'react-customizable-progressbar'
import Interface from '../mixer/interface'

export default function Progress(props) {

  const [value, setValue] = useState(0)

  useEffect (()=>{
    const interval = setInterval(() =>{
      setValue( oldValue => {
        const newValue = oldValue + 10;

        if (newValue === 100){
          clearInterval(interval)
        }

        return newValue
      })
    }, 100)
  },[])

  const { allOrders } = props;
  const { allVehicules } = props;


  return (
    <>
    <Container style={{display: "inline-flex"}}>
    <ProgressBar
        progress={value}
        radius={100}
        strokeColor="#c67649"
      >
        <div className="indicator">
                <div><h2>{value}%</h2></div>
            </div>
      </ProgressBar>
      <ProgressBar
        progress={value}
        radius={100}
        strokeColor="#c67649"
      >
        <div className="indicator">
          <div><h2>{value}%</h2></div>
            </div>
      </ProgressBar>
      <ProgressBar
        progress={value}
        radius={100}
        strokeColor="#c67649"
      >
        <div className="indicator">
          <div><h2>{value}%</h2></div>
            </div>
      </ProgressBar>
      <ProgressBar
        progress={value}
        radius={100}
        strokeColor="#c67649"
      >
        <div className="indicator">
          <div><h2>{value}%</h2></div>
            </div>
      </ProgressBar>
      <ProgressBar
        progress={value}
        radius={100}
        strokeColor="#c67649"
      >
        <div className="indicator">
          <div><h2>{value}%</h2></div>
            </div>
      </ProgressBar>
    </Container>
    <Interface
    allOrders={allOrders}
    allVehicules={allVehicules}
    />
    </>
  );
}


//style={{ width: 1100, display: "inline-flex", gap: "50px" }}
//style={{ width: 180, display:'inline-flex' }}
