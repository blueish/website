import React, { Component } from 'react';
import './App.css';
import Resume from './Resume';

class App extends Component {
    render() {
        return (
            <div className="website-root">
                <div className="splash-container">
                    <h2>Hi, I'm Sam Chow</h2>
                </div>
                <Resume />
                <h2>Other</h2>
                <div>If you want to contact me, email "me" at this domain</div>
            </div>
        );
    }
}

export default App;
