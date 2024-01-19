import { PropTypes } from 'prop-types';
import { Alert } from 'reactstrap';

const propTypes = {
    error: PropTypes.string.isRequired
};

const ErrorBanner = ({ error }) => {
    return error
        ? <Alert color="danger">Error: {error}</Alert>
        : null;
}

ErrorBanner.propTypes = propTypes;

export default ErrorBanner;