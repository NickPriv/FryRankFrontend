import { Fragment } from 'react';

const AddressDisplay = ({ address }) => {
    return (
        <Fragment>
            <p>Street Address: {address.streetNumberAndName}, City: {address.city}, State: {address.stateAbbr}, Zip: {address.zipCode}</p>
        </Fragment>
    );
}

export default AddressDisplay;