import React from "react";

// REACT ROUTER ELEMENTS
import { Switch, Route } from "react-router-dom";

// STATIC
import TopNav from "./TopNav";
import Footer from "./Footer";

// ROUTES
import Login from "./Login";
import About from './About';
import Home from './Home';
import NewTrip from './NewTrip';
import TripDisplay from './TripDisplay';
import LoggedOut from './LoggedOut';

function App() {
    return (
        <div className='app'>
            <TopNav />
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/about' component={About} />
                <Route path='/home' component={Home} />
                <Route path='/new-trip' component={NewTrip} />
                <Route path='/trip-display' component={TripDisplay} />
                <Route path='/logged-out' component={LoggedOut} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App;