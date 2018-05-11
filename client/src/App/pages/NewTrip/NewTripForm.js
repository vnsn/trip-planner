import React from 'react';

function NewTripForm(props) {
    const { name, startDate, endDate } = props.trip;
    return (
        <form className='newTripForm' >
            <h2>+ New Trip</h2>
            {props.noName ? <p className='red'>Please enter a trip name</p> : null}
            {props.noStart ? <p className='red'>Please enter a start date</p> : null}
            <label htmlFor="tripName">Trip Name</label>
            <input onChange={props.handleChange} name="name" value={name} placeholder="Tour of Italy" type="text" />
            <label htmlFor="tripStartDate">Start Date</label>
            <input onChange={props.handleChange} name="startDate" value={startDate} placeholder="MM/DD/YYYY" type="text" />
            <label htmlFor="tripEndDate">End Date</label>
            <input onChange={props.handleChange} name="endDate" value={endDate} placeholder="MM/DD/YYYY" type="text" />
            <button onClick={props.createTrip}>Submit</button>
        </form>
    )
}


export default NewTripForm
