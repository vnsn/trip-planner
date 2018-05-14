import React from 'react';

function NewTripData(props) {
    const { name, startDate, endDate } = props.trip;
    return (
        <div className='genData'>
            <h2 className='genTitle'>{name}</h2>
            {startDate ?
                <span className='genDates'>
                    <label className='genDate startDate'>
                        Start Date:
                                    <p>{startDate}</p>
                    </label>
                    {endDate ?
                        <label className='genDate  endDate'>
                            End Date:
                                        <p>{endDate}</p>
                        </label> : null}
                </span> : null}
        </div>
    )
}

export default NewTripData;
