import React, { Component } from 'react';

// FORMS
import DestinationForm from './DestinationForm';
import TransportationForm from './TransportationForm';
import AccommodationForm from './AccommodationForm';

// DATA DISPLAYS
import TransportationsData from './TransportationsData';
import AccommodationsData from './AccommodationsData';

// REDUX
import { connect } from 'react-redux';
import { addTransportation } from '../../../redux/transportations-reducer';
import { addReservation } from '../../../redux/reservations-reducer';

class DestinationsData extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            addingTransportation: false,
            addingAccommodation: false,
            editing: false
        }
        this.state = this.initialState;
    }

    openForm = (e) => {
        switch (e.target.name) {
            case 'trans':
                this.setState(prevState => ({addingTransportation: !prevState.addingTransportation}));
                break;
            case 'accom':
                this.setState(prevState => ({addingAccommodation: !prevState.addingAccommodation}));
                break;
            case 'editing':
                this.setState(prevState => ({editing: !prevState.editing}));
            default: break;
        }
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
        this.props.addTransportation(trans, this.props.destinations.currentDestination._id);
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
        console.log(this.props.destinations.currentDestination._id)        
        this.props.addReservation(accom, this.props.destinations.currentDestination._id);
    }

    render() {
        console.log(this.props.destinations.data)
        let { data } = this.props.destinations;
        let { addingTransportation,
            addingAccommodation,
            transportations,
            accommodations,
            editing } = this.state;
        return (
            <div className='destinationsData'>
                {data &&
                    data.map((dest, i) =>
                        <div className='destination' key={dest._id}>


                            <h4>{dest.name}</h4>
                            <div className="trip-list-dates">
                                {dest.startDate && <p>Start Date: {new Date(dest.startDate).toLocaleDateString()}</p>}
                                {dest.endDate && <p>End Date: {new Date(dest.endDate).toLocaleDateString()}</p>}
                            </div>
                            <div className='climate'>
                                {dest.climate && <p>Climate: {dest.climate}</p>}
                            </div>
                            <button name='editing' onClick={this.openForm}>Edit</button>

                            {editing && <DestinationForm {...dest} />}

                            {/* TRANSPORTATIONS OF DESTINATION DATA */}

                            <TransportationsData transportations={transportations} />

                            {/* ADD TRANSPORTATION FORM/TOGGLE */}

                            {addingTransportation ?
                                <TransportationForm addTransportation={this.addTransportation} closeForm={this.openForm} /> :
                                <button className='addFormButton' name="trans" onClick={this.openForm}>+ Transportation</button>}

                            {/* ACCOMMODATIONS OF DESTINATION DATA */}

                            <AccommodationsData accommodations={accommodations} />

                            {/* ADD ACCOMMODATION FORM/TOGGLE */}

                            {addingAccommodation ?
                                <AccommodationForm addAccommodation={this.addAccommodation} closeForm={this.openForm} /> :
                                <button className='addFormButton' name="accom" onClick={this.openForm}>+ Accommodation</button>}

                        </div>
                    )}
            </div>
        )
    }
}

export default connect(state => state, { addTransportation, addReservation })(DestinationsData);