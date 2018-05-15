import React, { Component } from 'react'
import NewTripForm from "./NewTripForm";
import DestinationForm from './DestinationForm';
import TransportationForm from './TransportationForm';
import AccommodationForm from './AccommodationForm';
import NewTripData from './NewTripData';
import DestinationsData from './DestinationsData';
import TransportationsData from './TransportationsData';
import AccommodationsData from './AccommodationsData';
import { connect } from 'react-redux';
import { addTrip, getTrips, editTrip } from '../../../redux/trips-reducer';
import { addDestination } from '../../../redux/destinations-reducer';

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
            destinations: [],
            transportations: [],
            accommodations: [],
            reservations: [],
            noName: false,
            noStart: false,
            initialSubmit: true,
            addingDestination: true,
            addingTransportation: false,
            addingAccommodation: false
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
        this.props.addDestination(dest, this.props.currentTrip._id);
        this.props.editTrip(dest, this.props.currentTrip._id);
        this.setState(prevState => {
            return {
                ...prevState,
                destinations: [...prevState.destinations, dest],
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
    addAccommodation = (e, accom) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                accommodations: [...prevState.accommodations, accom],
                addingAccommodation: false
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
                this.setState(prevState => ({addingAccommodation: !prevState.addingAccommodation}));
                break;
            default: break;
        }
    }

    createTrip = (e) => {
        e.preventDefault();
        const { name, startDate } = this.state.inputs;
        if (!name && !startDate) return this.setState({ noName: true, noStart: false });
        if (name && !startDate) return this.setState({ noName: false, noStart: true });
        if (!name && startDate) return this.setState({ noName: true, noStart: false });
        this.props.addTrip(this.state.inputs);
        this.setState({ initialSubmit: true });
    }

    render() {
        const { inputs,
            destinations,
            transportations,
            accommodations,
            noName,
            noStart,
            initialSubmit,
            addingDestination,
            addingTransportation,
            addingAccommodation } = this.state;
            console.log(this.props)
        return (
            <div className='newTrip'>

                {/* INITIAL ADD TRIP FORM */}

                {!initialSubmit ?
                    <NewTripForm
                        createTrip={this.createTrip}
                        handleChange={this.handleChange}
                        inputs={inputs}
                        noName={noName}
                        noStart={noStart}
                    /> :

                    // ADDED TRIP DATA //

                    <div className='newTripData'>
                        
                        {/* GEN NEW TRIP DATA */}

                        <NewTripData {...this.props.currentTrip} />

                        {/* DESTINATIONS DATA */}

                        <DestinationsData destinations={destinations} />
                        
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

                        {/* ACCOMMODATIONS DATA */}

                        <AccommodationsData accommodations={accommodations} />
                        
                        {/* ADD ACCOMMODATION FORM/TOGGLE */}
                        
                        {addingAccommodation ?
                        <AccommodationForm addAccommodation={this.addAccommodation} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="accom" onClick={this.openForm}>+ Accommodation</button>}

                        

                    </div>}
            </div>
        )
    }
}

export default connect(state => state.trips, { addTrip, getTrips, editTrip, addDestination })(NewTrip);