import React, { Component } from 'react'

class AccomodationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                arriveDate: "",
                departDate: ""
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
        const { name, arriveDate, departDate } = this.state.inputs;
        return (
            <form onSubmit={(e)=>this.props.addAccomodation(e, this.state.inputs)} className='genForm'>
                <button name='accom' className='closeButton' onClick={this.props.closeForm}>&times;</button>
                <h3>+ Accomodation</h3>
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChange} name="name" value={name} placeholder="Train" type="text" />
                <label htmlFor="departDate">Depart Date</label>
                <input onChange={this.handleChange} name="arriveDate" value={arriveDate} type="date" />
                <label htmlFor="arriveDate">Arrive Date</label>
                <input onChange={this.handleChange} name="departDate" value={departDate} type="date" />
                <button>Add</button>
            </form>
        )
    }
}

export default AccomodationForm;
