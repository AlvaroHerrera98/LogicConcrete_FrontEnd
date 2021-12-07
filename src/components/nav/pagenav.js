import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './pageside';
import './pagenav.css'
import * as MuiIcon from '@mui/icons-material/';



function PageNavBar () { 

    const [sidebar, setSideBar] = useState(false)

    const showSide = () => setSideBar(!sidebar)

    return (
        <>
        <div 
            className="navbar">
            <Link
                to="#"
                className="menu-bars"
            >
            <MuiIcon.Dehaze sx={{color:'#fff'}} onClick={showSide}/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSide}>
                <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                        <MuiIcon.Close sx={{color:'#fff'}} />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span className="ml">{item.title}</span>
                            </Link>
                            
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    )
}

export default PageNavBar