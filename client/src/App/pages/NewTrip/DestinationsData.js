import React from 'react'

function DestinationsData(props) {
    let {destinations} = props
    return (
        <div className='destinationsData'>
            {destinations.map((dest, i) =>
                <div className='destination' key={i}>
                    <h4>{dest.name}</h4>
                    {dest.startDate ?
                        <span className='destDates'>
                            <label className='destDate startDate'>
                                Destination Start:
                                            <p>{dest.startDate}</p>
                            </label>
                            {dest.endDate ?
                                <label className='destDate endDate'>
                                    Destination End:
                                                <p>{dest.endDate}</p>
                                </label> : null}
                        </span> : null}
                    {dest.climate ?
                        <label className='climate'>
                            Climate:
                                        <p>{dest.climate}</p>
                        </label> : null}
                </div>
            )}
        </div>
    )
}

export default DestinationsData
