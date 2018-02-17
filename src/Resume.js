import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                {this.props.resumeItems.map(item => <Item key={item.place} {...item} />) || <div>...loading...</div>}
            </div>
        );
    }
}

Resume.propTypes = {
    resumeItems: PropTypes.arrayOf(PropTypes.shape({
        place: PropTypes.string,
        time: PropTypes.string,
        details: PropTypes.string,
    }))
};

export default Resume;