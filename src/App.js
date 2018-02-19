import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ResumeRoot from './routes/about/ResumeRoot';
import MatchingRoot from './routes/matching/MatchingRoot';
import NavBar from "./NavBar";
import HomeRoot from "./routes/home/HomeRoot";

import './Global.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavBar/>
                    <Route exact path='/' component={HomeRoot}/>
                    <Route path='/matching' component={MatchingRoot}/>
                    <Route path='/about' component={ResumeRoot}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
