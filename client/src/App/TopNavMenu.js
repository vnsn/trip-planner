import React from 'react';
import {Link} from 'react-router-dom';

function TopNavMenu(props) {
    return (
        <div onClick={props.toggleMenu} className='topNavMenuContainer'>
            <ul className='topNavMenu'>
                <Link to='/home' className='topNavMenuItem'>Home</Link>
                <Link to='/new-trip' className='topNavMenuItem'>+ New Trip</Link>
                <Link to='/about' className='topNavMenuItem'>About</Link>
                <button className='topNavMenuItem'>Logout</button>
            </ul>
        </div>
    )
}

export default TopNavMenu
