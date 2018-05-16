import React, { Component } from 'react';
import DestinationsData from '../pages/NewTrip/DestinationsData';
import NewTripData from '../pages/NewTrip/NewTripData';

// SHARED
import Loading from '../shared/Loading';
import ErrorHandler from '../shared/ErrorHandler';
import DataList from '../shared/DataList';
import Form from '../shared/Form';
import DestinationForm from './NewTrip/DestinationForm';
import TransportationForm from './NewTrip/TransportationForm';
import AccommodationForm from './NewTrip/AccommodationForm';

// REDUX
import { connect } from 'react-redux';
import { getOneTrip } from '../../redux/trips-reducer';
import { addDestination } from '../../redux/destinations-reducer';
import { addReservation } from '../../redux/reservations-reducer';

class TripDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: false,
            destNoName: false,
            transNoName: false,
            accomNoName: false,
            resNoName: false,
        }
        console.log(this.state.foundTrip)
    }

    componentDidMount(){
        this.props.getOneTrip(this.props.match.params.id);
    }

    addDest = (inputs) => {
        if (!inputs.name) return this.setState({ destNoName: true });
        this.props.addDestination(inputs, this.props.trips.newestTrip._id);
    }

    render() {
        const { loading, errMsg, data } = this.props.trips.data;
        console.log(this)
        return (
            <div>
                <Loading loading={loading} render={() => <div>...Loading</div>}>
                    <ErrorHandler err={errMsg} render={props => <div>Error {props.code}: {props.msg}</div>}>
                        newtripdata:
                        <NewTripData {...this.props.trips.data}/>
                        destdata:
                        <DestinationsData />
                        <Form
                            resetInputs
                            inputs={{
                                name: "",
                                startDate: "",
                                endDate: "",
                                climate: "",
                                transportation: [],
                                reservations: []
                            }}
                            submit={this.addDest}
                            render={props => <DestinationForm noName={this.state.noName}{...props} />} >
                            <Form
                                resetInputs
                                inputs={{
                                    name: "",
                                    startDate: "",
                                    endDate: "",
                                    destinations: []
                                }}
                                submit={this.createTrip}
                                render={props => <TransportationForm noName={this.state.noName}{...props} />} />
                            <Form
                                resetInputs
                                inputs={{
                                    name: "",
                                    startDate: "",
                                    endDate: "",
                                    destinations: []
                                }}
                                submit={this.createTrip}
                                render={props => <AccommodationForm noName={this.state.noName}{...props} />} />
                                test
                        </Form>
                    </ErrorHandler>
                </Loading>
            </div>
        )
    }
}

export default connect(state => state, { getOneTrip, addDestination })(TripDisplay);


