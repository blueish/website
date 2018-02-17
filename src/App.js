import React, { Component } from 'react';
import {Route, BrowserRouter, Link} from 'react-router-dom';

import HomeRoot from './HomeRoot';
import MatchingRoot from './MatchingRoot';


import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/matching' component={MatchingRoot}/>
                    <Route exact path='/' component={HomeRoot}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
