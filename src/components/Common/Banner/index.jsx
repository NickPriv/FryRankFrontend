import { PropTypes } from 'prop-types';
import { Alert } from 'reactstrap';

const propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        'error',
        'success'
    ])
};

const typeToProperties = {
    'error': {"bannerPrefix": "Error: ", "color": "danger"},
    'success': {"bannerPrefix": "", "color": "success"}
}

const Banner = ({message, type}) => {
    return message
        ? <Alert className={"mt-3"} color={`${typeToProperties[type].color}`}>{typeToProperties[type].bannerPrefix}{message}</Alert>
        : null;
}

Banner.propTypes = propTypes;

export default Banner;