import React, { Component } from 'react'

class DestinationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                destName: "",
                destStart: "",
                destEnd: "",
                climate: "",
                transportations: [],
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
        const { destName, destStart, destEnd, climate } = this.state.inputs;
        return (
            <form onSubmit={(e)=>this.props.addDestination(e, this.state.inputs)} className='destForm'>
                <button name='dest' className='closeButton' onClick={this.props.closeForm}>&times;</button>
                <h3>+ Destination</h3>
                <label htmlFor="destName">Name</label>
                <input onChange={this.handleChange} name="destName" value={destName} placeholder="Rome" type="text" />
                <label htmlFor="destStart">Arrival Date</label>
                <input onChange={this.handleChange} name="destStart" value={destStart} placeholder="MM/DD/YYYY" type="text" />
                <label htmlFor="destEnd">Departure Date</label>
                <input onChange={this.handleChange} name="destEnd" value={destEnd} placeholder="MM/DD/YYYY" type="text" />
                <label htmlFor="climate">Climate</label>
                <input onChange={this.handleChange} name="climate" value={climate} placeholder="warm to hot" type="text" />
                <button>Add</button>
            </form>
        )
    }
}

export default DestinationForm
