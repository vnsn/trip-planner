import React from 'react';

function NewTripForm(props) {
    const { handleChange, handleSubmit, inputs, noName } = props;
    return (
        <form onSubmit={handleSubmit} className='genForm' >
            <h2>+ New Trip</h2>
            {noName ? <p className='red'>Please enter a trip name</p> : null}
            <label>Trip Name</label>
            <input onChange={handleChange} name="name" value={inputs.name} placeholder="Tour of Italy" type="text" />
            <label>Start Date</label>
            <input onChange={handleChange} name="startDate" value={inputs.startDate} type="date" />
            <label>End Date</label>
            <input onChange={handleChange} name="endDate" value={inputs.endDate} type="date" />
            <button>Submit</button>
        </form>
    )
}

export default NewTripForm