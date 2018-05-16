import React, {Component} from 'react';

class NewTripData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: false
        }
    }

    render() {
        const { name, startDate, endDate } = this.props;
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
}

export default NewTripData;
