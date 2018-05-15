import React from 'react';

function DestinationsData(props) {
    // console.log(props)
    let { destinations } = props;
    return (
        <div className='destinationsData'>
            {destinations &&
                destinations.map((dest, i) =>
                    <div className='destination' key={i}>
                        <h4>{dest.name}</h4>
                        <div className="trip-list-dates">
                            {dest.startDate && <p>Start Date: {new Date(dest.startDate).toLocaleDateString()}</p>}
                            {dest.endDate && <p>End Date: {new Date(dest.endDate).toLocaleDateString()}</p>}
                        </div>
                        <div className='climate'>
                            {dest.climate && <p>Climate: {dest.climate}</p>}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default DestinationsData;
