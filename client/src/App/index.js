import React from "react";

// REACT ROUTER ELEMENTS
import { Switch, Route } from "react-router-dom";

// STATIC
import TopNav from "./TopNav";
import Footer from "./Footer";

// ROUTES
import Login from "./pages/Login";
import Home from './pages/Home';
import TripDisplay from './pages/TripDisplay';
import NewTrip from './pages/NewTrip';
import LoggedOut from './pages/LoggedOut';
import About from './pages/About';

function App() {
    return (
        <div className='app'>
            <TopNav />
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/home' component={Home} />
                <Route path='/trip/:id' component={TripDisplay} />
                <Route path='/current-trip' component={TripDisplay} />
                <Route path='/new-trip' component={NewTrip} />
                <Route path='/logged-out' component={LoggedOut} />
                <Route path='/about' component={About} />
            </Switch>
            <Footer />
        </div>
    )
}

export default App;