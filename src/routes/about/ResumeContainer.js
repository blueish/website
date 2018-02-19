import {connect} from 'react-redux';
import Resume from './Resume';

const mapStateToProps = state => {
    const { resumeItems } = state;

    return {
        resumeItems,
    }
};

export default connect(mapStateToProps)(Resume);