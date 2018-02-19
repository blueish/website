import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {
    render() {
        return (
            <nav className={'nav-bar__wrapper'}>
                <Link to={'/'}>Sam Chow</Link>
                <Link to={'matching'}>Matching</Link>
                <Link to={'about'}>About</Link>
            </nav>
        );
    }
}

export default NavBar;