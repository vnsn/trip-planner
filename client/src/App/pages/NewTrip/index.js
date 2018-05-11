import React, { Component } from 'react'
import NewTripForm from "./NewTripForm";
import DestinationForm from './DestinationForm';
import { connect } from 'react-redux';
import { addTrip,getTrips } from '../../../redux/trips-reducer';

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
            noName: false,
            noStart: false,
            initialSubmit: false
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
                trip: {
                    ...prevState.trip,
                    destinations: [...prevState.trip.destinations, dest]
                }
            }
        })
    }

    componentDidMount() {
        this.props.getTrips();
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
        const { name, startDate, endDate, destinations } = this.state.trip
        return (
            <div className='newTrip'>
                {!this.state.initialSubmit ?
                    <NewTripForm
                        createTrip={this.createTrip}
                        handleChange={this.handleChange}
                        trip={this.state.trip}
                        {...this.state}
                    /> :
                    <div className='newTripData'>
                        <h3>{name}</h3>
                        <div className='tripDates'>
                            <p>{startDate}</p>
                            <p>{endDate}</p>
                        </div>
                        {destinations.map((dest, i) =>
                            console.log(dest)

                        )}
                        <DestinationForm addDestination={this.addDestination} />
                    </div>}
            </div>
        )
    }
}

export default connect(state => state.trips, { addTrip,getTrips })(NewTrip);