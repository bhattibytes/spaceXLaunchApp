import React, { Component, Fragment } from 'react';
import styles from '../styles/Home.module.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export default class LaunchItem extends Component {
    constructor() {
        super();
        this.state = {
            showLaunchDetailsClicked: false 
        };
        this.showLaunchDetails = this.showLaunchDetails.bind(this);
    }

    showLaunchDetails (e) {
      this.setState({
        showLaunchDetailsClicked: !this.state.showLaunchDetailsClicked
      });
    }

    render(props) {
        const ROCKET_QUERY = gql`
        query RocketQuery {
            rocket(id: "${this.props.rocket}") {
                name
                first_flight
                active
                type
                description
            }
        }
        `
        return (
            <div className="card card-body mb-3">
                <h3>Mission: {this.props.launch.name}</h3>
                <p>Date: {this.props.launch.date_local}</p>
                <h6>Flight Number: {this.props.launch.flight_number}</h6>
                

                {this.props.launch.success ? <span className={styles.success}> Mission Succeeded!</span> : <span className={styles.fail}> Mission Failed!</span>}
                {this.props.launch.upcoming ? <span> New Future Missions!</span> : <span> No New Missions!</span>}
                <button onClick={this.showLaunchDetails}>Click to See Launch Details</button>
                { this.state.showLaunchDetailsClicked ? 
                
                <Query query={ROCKET_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return <h5>Loading....</h5>
                        }
                        if (error) {
                            console.log(error)
                        }
                        if (data) {
                            return <Fragment>
                            {
                                <div className="card card-body mb-3">
                                    <h3>Name: {data.rocket.name}</h3>
                                    <h5>First Flight Date: {data.rocket.first_flight}</h5>
                                    {this.props.launch.details ? <h5>Flight Details: {this.props.launch.details} </h5> : null }
                                    { data.rocket.active ? <h6 className={styles.success}>Rocket Active Duty</h6> : <h6 className={styles.fail}>Rocket Retired</h6>}
                                    <p>Description {data.rocket.description}</p>
                                </div> 
                            }
                        </Fragment>
                        } else {
                            return null
                        } 
                    }
                }
            </Query> : null }
            </div>
        )
    }
} 