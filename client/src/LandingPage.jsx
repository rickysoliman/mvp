import React from 'react';
import styled from 'styled-components';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import App from './App.jsx';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Music Theory Professor</h1>
                    <ul>
                        <li><NavLink exact to="/home">Home</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/home" component={App}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default LandingPage;