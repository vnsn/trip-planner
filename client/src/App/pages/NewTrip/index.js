import React, { Component } from 'react'
import NewTripForm from "./NewTripForm";
import DestinationForm from './DestinationForm';
import TransportationForm from './TransportationForm';
import AccomodationForm from './AccomodationForm';
import NewTripData from './NewTripData';
import DestinationsData from './DestinationsData';
import TransportationsData from './TransportationsData';
import AccomodationsData from './AccomodationsData';
import { connect } from 'react-redux';
import { addTrip, getTrips } from '../../../redux/trips-reducer';

class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                startDate: "",
                endDate: "",
                destinations: []
            },
            trip: {},
            transportations: [],
            accomodations: [],
            reservations: [],
            noName: false,
            noStart: false,
            initialSubmit: false,
            addingDestination: true,
            addingTransportation: false,
            addingAccomodation: false
        }
        this.state = this.initialState;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }
    addDestination = (e, dest) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                trip: {
                    ...prevState.trip,
                    destinations: [...prevState.trip.destinations, dest]
                },
                addingDestination: false
            }
        })
    }
    addTransportation = (e, trans) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                transportations: [...prevState.transportations, trans],
                addingTransportation: false
            }
        })
    }
    addAccomodation = (e, accom) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                accomodations: [...prevState.accomodations, accom],
                addingAccomodation: false
            }
        })
    }
    openForm = (e) => {
        switch (e.target.name) {
            case 'dest': 
                this.setState(prevState => ({addingDestination: !prevState.addingDestination}));
                break;
            case 'trans':
                this.setState(prevState => ({addingTransportation: !prevState.addingTransportation}));
                break;
            case 'accom':
                this.setState(prevState => ({addingAccomodation: !prevState.addingAccomodation}));
                break;
            default: break;
        }
    }

    createTrip = (e) => {
        e.preventDefault();
        const { name, startDate } = this.state.trip;
        if (!name && !startDate) return this.setState({ noName: true, noStart: false });
        if (name && !startDate) return this.setState({ noName: false, noStart: true });
        if (!name && startDate) return this.setState({ noName: true, noStart: false })
        this.props.addTrip(this.state.trip)
        this.setState({ initialSubmit: true })
    }

    render() {
        const { trip, 
            transportations,
            accomodations,
            noName,
            noStart,
            initialSubmit,
            addingDestination,
            addingTransportation,
            addingAccomodation } = this.state;
        return (
            <div className='newTrip'>

                {/* INITIAL ADD TRIP FORM */}

                {!initialSubmit ?
                    <NewTripForm
                        createTrip={this.createTrip}
                        handleChange={this.handleChange}
                        trip={trip}
                        noName={noName}
                        noStart={noStart}
                    /> :

                    // ADDED TRIP DATA //

                    <div className='newTripData'>
                        
                        {/* GEN NEW TRIP DATA */}

                        <NewTripData trip={trip} />

                        {/* DESTINATIONS DATA */}

                        <DestinationsData destinations={trip.destinations} />
                        
                        {/* ADD DESTINATION FORM/TOGGLE BUTTON */}
                        
                        {addingDestination ?
                        <DestinationForm addDestination={this.addDestination} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="dest" onClick={this.openForm}>+ Destination</button>}

                        {/* TRANSPORTATIONS DATA */}

                        <TransportationsData transportations={transportations} />
                        
                        {/* ADD TRANSPORTATION FORM/TOGGLE */}
                        
                        {addingTransportation ?
                        <TransportationForm addTransportation={this.addTransportation} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="trans" onClick={this.openForm}>+ Transportation</button>}

                        {/* ACCOMODATIONS DATA */}

                        <AccomodationsData accomodations={accomodations} />
                        
                        {/* ADD ACCOMODATION FORM/TOGGLE */}
                        
                        {addingAccomodation ?
                        <AccomodationForm addAccomodation={this.addAccomodation} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="accom" onClick={this.openForm}>+ Accomodation</button>}

                        

                    </div>}
            </div>
        )
    }
}

export default connect(state => state.trips, { addTrip, getTrips })(NewTrip);