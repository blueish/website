import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import HomeRoot from './routes/home/HomeRoot';
import MatchingRoot from './routes/matching/MatchingRoot';

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
