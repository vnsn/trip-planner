import React from 'react';

function NewTripData(props) {
    const { name, startDate, endDate } = props;
    return (
        <div className='genData'>
            <h2 className='genTitle'>{name}</h2>
            <div className="trip-list-dates">
                {startDate && <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>}
                {endDate && <p>End Date: {new Date(endDate).toLocaleDateString()}</p>}
            </div>
        </div>
    )
}

export default NewTripData;
