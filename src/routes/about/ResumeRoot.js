import React, {Component} from 'react';
import ResumeContainer from './ResumeContainer';
import { Provider } from 'react-redux';

import { makeHomeStore } from './redux/createStore';
import * as constants from './redux/HomeConstants';
import './Resume.css';

const store = makeHomeStore();


class HomeRoot extends Component {
    componentWillMount() {
        store.dispatch({
            type: constants.ADD_RESUME_ITEMS,
            resumeItems: [
                {
                    place: "University of British Columbia",
                    time: "Class of 2019 - Computer Science",
                    details: "Currently a 3rd year undergraduate studying Computer Science.",
                },
                {
                    place: "Cisco Umbrella (formerly OpenDNS)",
                    time: "September 2016 - September 2017",
                    details: "Developed in a React/Redux frontend alongside a Java backend in an agile environment, pushed production code \n" +
                    "live to client-facing products. Participated in design meetings and contributed to eliminating bugs, writing tests, \n" +
                    "and working with several other teams to coordinate product features.",
                }
            ]
        });
    }
    render() {
        return (
            <Provider store={store}>
                <div className="website-root">
                    <ResumeContainer />
                    <h2>Other</h2>
                    <div>If you want to contact me, email "me" at this domain</div>
                </div>
            </Provider>
        );
    }
}

export default HomeRoot;