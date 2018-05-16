import React, { Component } from 'react';

// FROM SHARED
import Form from '../../shared/Form';
import Loading from '../../shared/Loading';

// FORMS
import NewTripForm from "./NewTripForm";

// REDUX
import { connect } from 'react-redux';
import { addTrip } from '../../../redux/trips-reducer';

// REACT-ROUTER
import { Redirect } from "react-router";

class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noName: false,
            initialSubmit: false
        }
    }

    createTrip = (inputs) => {
        if (!inputs.name) return this.setState({ noName: true });
        this.props.addTrip(inputs);
        this.setState({ initialSubmit: true });
    }

    render() {
        console.log(this.props)
        const { newestLoading } = this.props.trips
        if (!this.state.initialSubmit)
            return (
                <div>
                    <Form
                        resetInputs
                        inputs={{
                            name: "",
                            startDate: "",
                            endDate: "",
                            destinations: []
                        }}
                        submit={this.createTrip}
                        render={props => <NewTripForm noName={this.state.noName}{...props} />} />
                </div>
            )
        return (
            <Loading loading={newestLoading} render={() => <div>...loading</div>}>
                <Redirect to={'/trip/' + this.props.trips.newestTrip._id} />
            </Loading>
        )
    }
}

export default connect(state => state, { addTrip })(NewTrip)
