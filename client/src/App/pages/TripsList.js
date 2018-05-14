import React from 'react';
import { Link } from "react-router-dom";

function TripsList(props) {

    console.log(props);

    const { data } = props;

    const dataList = data.map(item => {
        return (
            <div key={item._id} className="trip-list-card">
                <h2 className="trip-list-name"><Link to={`/trip/${item._id}`}>{item.name}</Link></h2>

                <div className="trip-list-dates">

{/* I put the dates in a div so they can be styled more easily. */}

                   {item.startDate && <p>Start Date: {new Date(item.startDate).toLocaleDateString()}</p> }
                   {item.endDate && <p>End Date: {new Date(item.endDate).toLocaleDateString()}</p> }
                   
                </div>
                
                <p>Created: {new Date(item.createdAt).toLocaleDateString()}</p>

            </div>
        );
    });

    return (
        <div>
            <h2>Saved Trips</h2>
            {dataList}
        </div>
    )
}

export default TripsList;
