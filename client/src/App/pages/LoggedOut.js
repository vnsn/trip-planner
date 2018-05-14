import React from 'react';
import { Link } from "react-router-dom";

function LoggedOut() {
    return (
        <div>
            <h2>Thank you for using the JAM Trip Organizer.</h2>
            <h2>Happy Travels!</h2>
            <p><Link to='/' >Log in again?</Link></p>
        </div>
    )
}

export default LoggedOut
