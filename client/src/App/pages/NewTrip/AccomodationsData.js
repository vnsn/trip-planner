import React from 'react';

function AccomodationsData(props) {
    let {accomodations} = props
    return (
        <div className='accomodationData'>
            {accomodations.map((accom, i) =>
                <div className='accomodation' key={i}>
                    <h4>{accom.name}</h4>
                    {accom.arriveDate ?
                        <span className='accomDates'>
                            <label className='accomStart startDate'>
                                Accomodation Arrive:
                                            <p>{accom.arriveDate}</p>
                            </label>
                            {accom.departDate ?
                                <label className='accomEnd endDate'>
                                    Accomodation Depart:
                                                <p>{accom.departDate}</p>
                                </label> : null}
                        </span> : null}
                </div>
            )}
        </div>
    )
}

export default AccomodationsData;
