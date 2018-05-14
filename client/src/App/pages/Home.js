import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { getTrips } from "../../redux/trips-reducer";
import TripDisplay from './TripDisplay';
import TripsList from "./TripsList";

class Home extends Component {

    componentDidMount() {
        this.props.getTrips();
    }

    render() {
        const { data, loading, errMsg } = this.props.trips;

        console.log(this.props.trips.data);

        if (loading) {
            return <p>Loading... please wait.</p>
        } else if (errMsg) {
            return <p>Can't get list of trips.</p>
        } else {


            if (data.length > 1) {
                return (
                    <TripsList data={data} />
                )
            } else if (data.length === 1) {
                return (
                    <TripDisplay data={data} />
                )
            } else {
                return (
                    <Redirect to="/new-trip" />
                )
            }
        }
    }
}

export default connect(state => state, { getTrips })(Home);
