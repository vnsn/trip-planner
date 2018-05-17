import React, { Component } from 'react';
import DestinationsData from '../../pages/TripDisplay/DestinationsData';
import NewTripData from '../../pages/NewTrip/NewTripData';

// SHARED
import Loading from '../../shared/Loading';
import ErrorHandler from '../../shared/ErrorHandler';
// import DataList from '../shared/DataList';

// FORMS
import DestinationForm from '../../pages/TripDisplay/DestinationForm';
// import TransportationForm from './NewTrip/TransportationForm';
// import AccommodationForm from './NewTrip/AccommodationForm';

// REDUX
import { connect } from 'react-redux';
import { getOneTrip } from '../../../redux/trips-reducer';
import { addDestination } from '../../../redux/destinations-reducer';
// import { addReservation } from '../../redux/reservations-reducer';

class TripDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: false,
            destNoName: false,
            transNoName: false,
            accomNoName: false,
            resNoName: false,
            addingDestination: true,
            editingTrip: false
        }
        console.log(this.state.foundTrip)
    }

    // componentDidMount(){
    //     this.props.getOneTrip(this.props.match.params.id);
    // }

    addDestination = (e, dest) => {
        e.preventDefault();
        this.setState(prevState => ({ addingDestination: false }));
        this.props.addDestination(dest, this.props.match.params.id);
    }

    render() {
        const { loading, errMsg, data } = this.props.trips.data;
        const { addingDestination } = this.state;
        return (
            <div>
                trip display
                <Loading loading={loading} render={() => <div>...Loading</div>}>
                    <ErrorHandler err={errMsg} render={props => <div>Error {props.code}: {props.msg}</div>}>
                    <div className='newTripData'>
                        
                        {/* GEN NEW TRIP DATA */}

                        <NewTripData id={this.props.match.params.id} />

                        {/* DESTINATIONS DATA */}

                        <DestinationsData />
                        
                        {/* ADD DESTINATION FORM/TOGGLE BUTTON */}
                        
                        {addingDestination ?
                        <DestinationForm addDestination={this.addDestination} closeForm={this.openForm} /> :
                        <button className='addFormButton' name="dest" onClick={this.openForm}>+ Destination</button>}

                    </div>
                    </ErrorHandler>
                </Loading>
            </div>
        )
    }
}

export default connect(state => state, { getOneTrip, addDestination })(TripDisplay);


