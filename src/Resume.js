import React, { Component } from 'react';

const Item = ({ place, time, details }) => (
    <div className={"resume-item__wrapper"}>
        <div className={"resume-workplace"}>{place}</div>
        <div className={"resume-date"}>{time}</div>
        <div className={"resume-details"}>{details}</div>
    </div>
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
            </div>
        );
    }
}

export default Resume;