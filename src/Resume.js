import React, { Component } from 'react';

const Item = ({ place, time, details }) => (
    <li className={"resume-item__wrapper"}>
        <div className={"resume-workplace"}>{place}</div>
        <div className={"resume-date"}>{time}</div>
        <div className={"resume-details"}>{details}</div>
    </li>
);

class Resume extends Component {
    render() {
        return (
            <div className={"resume"}>
                <h2>Resume</h2>
                <Item
                    place={"University of British Columbia"}
                    time={"Class of 2019 - Computer Science"}
                    details={"Currently a 3rd year undergraduate studying Computer Science."}
                />
                <Item
                    place={"Cisco Umbrella (formerly OpenDNS)"}
                    time={"September 2016 - September 2017"}
                    details={"Developed in a React/Redux frontend alongside a Java backend in an agile environment, pushed production code \n" +
                    "live to client-facing products. Participated in design meetings and contributed to eliminating bugs, writing tests, \n" +
                    "and working with several other teams to coordinate product features."}
                />
            </div>
        );
    }
}

export default Resume;
