import React, { Component } from 'react'

function DestinationForm(props) {
    const { handleChange, handleSubmit, inputs, noName } = props;
    return (
        <form onSubmit={handleSubmit} className='genForm'>
            <button name='dest' className='closeButton' onClick={props.closeForm}>&times;</button>
            <h3>+ Destination</h3>
            {noName ? <p className='red'>Please enter a trip name</p> : null}
            <label>Name</label>
            <input onChange={handleChange} name="name" value={inputs.name} placeholder="Rome" type="text" />
            <label>Arrival Date</label>
            <input onChange={handleChange} name="startDate" value={inputs.startDate} type="date" />
            <label>Departure Date</label>
            <input onChange={handleChange} name="endDate" value={inputs.endDate} type="date" />
            <label>Climate</label>
            <input onChange={handleChange} name="climate" value={inputs.climate} placeholder="warm to hot" type="text" />
            <button className='saveButton'>Add</button>
        </form>
    )
}

export default DestinationForm
