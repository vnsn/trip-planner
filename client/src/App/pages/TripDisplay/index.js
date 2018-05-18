import React, { Component } from 'react';
import DestinationsData from './DestinationsData';
import TripData from './TripData';
import { Redirect, withRouter } from 'react-router-dom';

// SHARED
import Loading from '../../shared/Loading';
import ErrorHandler from '../../shared/ErrorHandler';

// FORMS
import DestinationForm from '../../pages/TripDisplay/DestinationForm';

// REDUX
import { connect } from 'react-redux';
import { getOneTrip, deleteTrip } from '../../../redux/trips-reducer';
import { addDestination } from '../../../redux/destinations-reducer';

class TripDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: false,
            destNoName: false,
            transNoName: false,
            accomNoName: false,
            resNoName: false,
            addingDestination: false,
            editingTrip: false,
            isDeleted: false
        }
    }

    componentDidMount() {
        this.props.getOneTrip(this.props.match.params.id);
    }

    removeTrip = (e) => {

        this.props.deleteTrip(this.props.match.params.id, this.props.history.push);
    }
    createDest = inputs => {
        this.props.addDestination(inputs);
        this.setState(prevState => ({ addingDestination: false }));
    }
    openForm = (e) => {
        switch (e.target.name) {
            case 'dest':
                this.setState(prevState => ({ addingDestination: !prevState.addingDestination }));
                break;
            case 'trip':
                this.setState(prevState => ({ editingTrip: false }));
                break;
            default: break;
        }
    }

    render() {
        const { errMsg, currentTrip, currentLoading } = this.props.trips;
        const { addingDestination } = this.state;
        if (this.state.isDeleted) return <Redirect to="/home" />
        return (
            <div>
                {/* /trip display/ */}
                <Loading loading={currentLoading} render={() => <div>...Loading</div>}>
                    <ErrorHandler err={errMsg} render={props => <div>Error {props.code}: {props.msg}</div>}>
                        <div className='newTripData'>

                            {/* GEN NEW TRIP DATA */}

                            <TripData {...currentTrip} removeTrip={this.removeTrip} />

                            {/* DESTINATIONS DATA */}

                            <DestinationsData submit={inputs => this.createDest(inputs)} tripID={currentTrip._id} />

                            {/* ADD DESTINATION FORM/TOGGLE BUTTON */}

                            {addingDestination ?
                                <DestinationForm submit={this.createDest} tripID={this.props.match.params.id} formCode ="dest"toggle={this.openForm} /> :
                                <button className='addFormButton' name="dest" onClick={this.openForm}>+ Destination</button>}

                        </div>
                    </ErrorHandler>
                </Loading>
            </div>
        )
    }
}

export default withRouter(connect(state => state, { getOneTrip, deleteTrip, addDestination })(TripDisplay));


