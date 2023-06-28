import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem.jsx';
import styles from '../styles/Home.module.css';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
        id
        flight_number
        name
        date_local
        upcoming 
        success
        rocket
        details
    }
  }
`

class Launches extends Component {
    constructor () {
        super();
        this.state = {
            launchClicked: false,
            rocketAnimation: true
        };
        this.handleLaunchClick = this.handleLaunchClick.bind(this);
    }

    handleLaunchClick (e) {
        this.setState({
            launchClicked: !this.state.launchClicked
        })
    }  

    render () {
        setTimeout(() => {
            this.setState({
                rocketAnimation: false
            })
        }, 5000)
        return (
          <Fragment>
            <Query query={LAUNCHES_QUERY}>
                {
                    ({ loading, error, data }) => {
                        if (loading) {
                            return <h5>Loading....</h5>
                        }
                        if (error) {
                            console.log(error)
                        }
                        if (this.state.launchClicked) {
                            return (
                                <Fragment>
                                    {
                                        data.launches.map(launch => {
                                            return <LaunchItem key={launch.id} launch={launch} rocket={launch.rocket}/>
                                        })
                                    }
                                </Fragment>
                            )    
                        } 
                        if (this.state.rocketAnimation) {
                            return (
                                <span className={styles.rocketSuccess + ' ' + styles.animateRocketSuccess}>🚀</span>
                                )
                        } else {
                            return <h1 className="display-4 my-3" style={{border: "solid white 1px", borderRadius: "15px", padding: "5px 15px 5px 15px", boxShadow: "3px 2px 2px white", cursor: "pointer"}} onClick={this.handleLaunchClick}>Click To See Launches</h1>
                            } 
                        }
                }
            </Query>
          </Fragment>
        )
    }
}

export default Launches; 