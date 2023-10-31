import { PropTypes } from 'prop-types';
import { Fragment } from 'react';

const propTypes = {
    address: PropTypes.object.isRequired
};

const AddressDisplay = ({ address }) => {
    return (
        <Fragment>
            <p>Street Address: {address.streetNumberAndName}, City: {address.city}, State: {address.stateAbbr}, Zip: {address.zipCode}</p>
        </Fragment>
    );
}

AddressDisplay.propTypes = propTypes;

export default AddressDisplay;