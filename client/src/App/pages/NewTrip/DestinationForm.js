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
            <form onSubmit={this.props.addDestination} className='destForm'>
                <h3>Destination</h3>
                <label htmlFor="destName"></label>
                <input onChange={this.handleChange} name="destName" value={destName} type="text" />
                <label htmlFor="destStart"></label>
                <input onChange={this.handleChange} name="destStart" value={destStart} type="text" />
                <label htmlFor="destEnd"></label>
                <input onChange={this.handleChange} name="destEnd" value={destEnd} type="text" />
                <label htmlFor="climate"></label>
                <input onChange={this.handleChange} name="climate" value={climate} type="text" />
                <button>Submit</button>
            </form>
        )
    }
}

export default DestinationForm
