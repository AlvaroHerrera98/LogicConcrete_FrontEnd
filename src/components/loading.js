import React from 'react'


function Loading(Component) {
    return function LoadingComponent ({ isLoading, ...props }) {
       if (!isLoading) return <Component {...props} />; 
       return (
           <React.StrictMode>
           <p style={{fontSize: '25px'}}>
               Espera la informacion esta siendo cargada!...
           </p>   
           </React.StrictMode> 
       );
    };
}

export default Loading;