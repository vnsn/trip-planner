import React, { Component } from 'react'
import NewTripForm from "./NewTripForm";
import DestinationForm from './DestinationForm';
import TransportationForm from './TransportationForm';
import AccomodationForm from './AccomodationForm';
import DestinationsData from './DestinationsData';
import TransportationsData from './TransportationsData';
import AccomodationsData from './AccomodationsData';
import { connect } from 'react-redux';
import { addTrip, getTrips } from '../../../redux/trips-reducer';

class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            trip: {
                name: "",
                startDate: "",
                endDate: "",
                destinations: []
            },
            transportations: [],
            accomodations: [],
            noName: false,
            noStart: false,
            initialSubmit: false,
            addingDestination: true,
            addingTransportation: true,
            addingAccomodation: true
        }
        this.state = this.initialState;
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                trip: {
                    ...prevState.trip,
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
        this.setState(prevState => ({transportations: [...prevState.transportations, trans]}))
    }
    addAccomodation = (e, accom) => {
        e.preventDefault();
        this.setState(prevState => ({accomodations: [...prevState.accomodations, accom]}))
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
        const { transportations, accomodations } = this.state;
        const { name, startDate, endDate, destinations } = this.state.trip;
        return (
            <div className='newTrip'>

                {/* ADD TRIP FORM */}

                {!this.state.initialSubmit ?
                    <NewTripForm
                        createTrip={this.createTrip}
                        handleChange={this.handleChange}
                        trip={this.state.trip}
                        {...this.state}
                    /> :

                    // ADDED TRIP DATA //

                    <div className='newTripData'>
                        <h2 className='newTripTitle'>{name}</h2>
                        {startDate ?
                            <span className='tripDates'>
                                <label className='tripDate startDate'>
                                    Start Date:
                                    <p>{startDate}</p>
                                </label>
                                {endDate ?
                                    <label className='tripDate  endDate'>
                                        End Date:
                                            <p>{endDate}</p>
                                    </label> : null}
                            </span> : null}

                        {/* DESTINATIONS DATA */}

                        <DestinationsData destinations={destinations} />
                        
                        {/* ADD DESTINATION FORM/TOGGLE BUTTON */}
                        
                        {this.state.addingDestination ?
                        <DestinationForm addDestination={this.addDestination} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="dest" onClick={this.openForm}>+ Destination</button>}

                        {/* TRANSPORTATIONS DATA */}

                        <TransportationsData transportations={transportations} />
                        
                        {/* ADD TRANSPORTATION FORM/TOGGLE */}
                        
                        {this.state.addingTransportation ?
                        <TransportationForm addTransportation={this.addTransportation} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="trans" onClick={this.openForm}>+ Transportation</button>}

                        {/* ACCOMODATIONS DATA */}

                        <AccomodationsData accomodations={accomodations} />
                        
                        {/* ADD ACCOMODATION FORM/TOGGLE */}
                        
                        {this.state.addingAccomodation ?
                        <AccomodationForm addAccomodation={this.addAccomodation} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="accom" onClick={this.openForm}>+ Accomodation</button>}

                        

                    </div>}
            </div>
        )
    }
}

export default connect(state => state.trips, { addTrip, getTrips })(NewTrip);