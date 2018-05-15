import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReservation } from '../../../redux/reservations-reducer';

class ReservationModal extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                dateIn: "",
                dateOut: "",
                timeIn: "",
                timeOut: "",
                confirmationNumber: "",
                howEarly: "",
                seatNumber: "",
                phone: "",
                address: ""
            }
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
    closeModal = (e) => {
        this.props.toggleResModal();
    }
    submitReservation = (e) => {
        if (this.state.inputs.name && this.state.inputs.confirmationNumber) {
            this.props.addReservation(this.state.inputs);
        }
        this.props.toggleResModal();
    }

    render() {
        let { name, dateIn, dateOut, confirmationNumber, phone } = this.state.inputs;
        return (
            <div id="resModal" className='resModal'>
                <div className='genForm resModalInner'>
                    <h4>+ Reservation</h4>
                    <button onClick={this.closeModal} className='closeButton'>&times;</button>
                    <label htmlFor="name">Name:</label>
                    <input onChange={this.handleChange} name="name" value={name} type="text" placeholder="Name" />
                    <label htmlFor="dateIn">Date In:</label>
                    <input onChange={this.handleChange} name="dateIn" value={dateIn} type="date" />
                    <label htmlFor="dateOut">Date Out:</label>
                    <input onChange={this.handleChange} name="dateOut" value={dateOut} type="date" />
                    <label htmlFor="confirmationNumber">Confirmation Number:</label>
                    <input onChange={this.handleChange} name="confirmationNumber" value={confirmationNumber} type="text" placeholder="Confirmation Number" />
                    <label htmlFor="phone">Phone:</label>
                    <input onChange={this.handleChange} name="phone" value={phone} type="text" placeholder="Phone" />
                    <button className='saveButton' onClick={this.submitReservation}>Done</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { addReservation })(ReservationModal);