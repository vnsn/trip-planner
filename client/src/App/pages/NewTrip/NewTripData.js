import React, { Component } from 'react';
import NewTripForm from './NewTripForm';
import { connect } from 'react-redux';
import { getOneTrip, editTrip, deleteTrip } from '../../../redux/trips-reducer';
import { Redirect } from 'react-router-dom';

class NewTripData extends Component {
    constructor(props) {
        super(props);
        const trip = props.trips.data.find(trip => trip._id === props.id);
        console.log(trip.startDate);
        this.state = {
            inputs: {
                name: trip.name || "",
                startDate: trip.startDate || "",
                endDate: trip.endDate || ""
            },
            form: false,
            noName: false,
            noStart: false,
            deleted: false,
        }
    }

    componentDidMount() {
        // this.props.getOneTrip(this.props.id)
    }

    handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editTrip(this.state.inputs, this.props.id)
    }
    deleteTrip = (e) => {
        console.log(this.props.id)
        this.props.deleteTrip(this.props.id);
        this.setState(prevState => ({deleted: true}));
    }
    showForm = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ form: true }))
    }

    render() {
        const { form, inputs, noName, noStart, deleted,  } = this.state;
        const startDate = new Date(inputs.startDate);
        const displayStartDate = `${startDate.getUTCFullYear()}-${startDate.getUTCMonth() + 1}-${startDate.getUTCDay()}`
        if (!form)
            return (
                <div className='genData'>
                    <h2 className='genTitle'>{inputs.name}</h2>
                    <div className="trip-list-dates">
                        {inputs.startDate && <p>Start Date: {new Date(inputs.startDate).toLocaleDateString()}</p>}
                        {inputs.endDate && <p>End Date: {new Date(inputs.endDate).toLocaleDateString()}</p>}
                    </div>
                    <button onClick={this.showForm}>Edit</button>
                    <button onClick={this.deleteTrip}>Delete</button>
                </div>
            )
        if (deleted) return <Redirect to="/home" />
        return (
            <form className='newTripForm' >
                <h2>+ Edit Trip</h2>
                {noName ? <p className='red'>Please enter a trip name</p> : null}
                {noStart ? <p className='red'>Please enter a start date</p> : null}
                <label>Trip Name</label>
                <input onChange={this.handleChange} name="name" value={inputs.name} placeholder="Tour of Italy" type="text" />
                <label>Start Date</label>
                <input onChange={this.handleChange} name="startDate" value={displayStartDate} type="date" />
                <label>End Date</label>
                <input onChange={this.handleChange} name="endDate" value={inputs.endDate} type="date" />
                <button onClick={this.createTrip}>Submit</button>
            </form>
        )
    }
}

export default connect(state => state, { getOneTrip, editTrip, deleteTrip })(NewTripData);
