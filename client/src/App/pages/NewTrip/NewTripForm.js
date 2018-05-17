import React from 'react';

function NewTripForm(props) {
    const { name, startDate, endDate } = props.inputs;
    return (
        <form className='newTripForm' >
            <h2>+ New Trip</h2>
            {props.noName ? <p className='red'>Please enter a trip name</p> : null}
            {props.noStart ? <p className='red'>Please enter a start date</p> : null}
            <label>Trip Name</label>
            <input onChange={props.handleChange} name="name" value={name} placeholder="Tour of Italy" type="text" />
            <label>Start Date</label>
            <input onChange={props.handleChange} name="startDate" value={startDate} type="date" />
            <label>End Date</label>
            <input onChange={props.handleChange} name="endDate" value={endDate} type="date" />
            <button onClick={props.createTrip}>Submit</button>
        </form>
    )
}


export default NewTripForm
