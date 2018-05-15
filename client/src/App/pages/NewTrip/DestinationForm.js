import React, { Component } from 'react'

class DestinationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                startDate: "",
                endDate: "",
                climate: "",
                transportation: [],
                reservations: []
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

    render() {
        const { name, startDate, endDate, climate } = this.state.inputs;
        return (
            <form onSubmit={(e)=>this.props.addDestination(e, this.state.inputs)} className='genForm'>
                <button name='dest' className='closeButton' onClick={this.props.closeForm}>&times;</button>
                <h3>+ Destination</h3>
                <label htmlFor="destName">Name</label>
                <input onChange={this.handleChange} name="name" value={name} placeholder="Rome" type="text" />
                <label htmlFor="destStart">Arrival Date</label>
                <input onChange={this.handleChange} name="startDate" value={startDate} type="date" />
                <label htmlFor="destEnd">Departure Date</label>
                <input onChange={this.handleChange} name="endDate" value={endDate} type="date" />
                <label htmlFor="climate">Climate</label>
                <input onChange={this.handleChange} name="climate" value={climate} placeholder="warm to hot" type="text" />
                <button className='saveButton'>Add</button>
            </form>
        )
    }
}

export default DestinationForm
