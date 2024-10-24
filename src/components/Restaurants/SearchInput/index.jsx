import { PropTypes } from 'prop-types';
import { Button, Input, InputGroup } from 'reactstrap';

import { FRENCH_FRIES_TEXT_QUERY } from '../../../constants';

const propTypes = {
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    getRestaurants: PropTypes.func.isRequired
};

const SearchInput = ({ getRestaurants, currentSearchQuery, updateSearchQuery, location }) => {

    return (
        <InputGroup
            className="me-2 my-2"
            onChange={(event) => {
                updateSearchQuery(event.target.value);
            }}
        >
            <Input
                id="searchInput"
                name="search"
                placeholder="Search for a restaurant"
                value={currentSearchQuery}
            />
            <Button
                children='Submit'
                color='danger'
                onClick={(event) => {
                    const searchQuery = currentSearchQuery == '' ? FRENCH_FRIES_TEXT_QUERY : currentSearchQuery;
                    getRestaurants(searchQuery, location);
                }}
            />
        </InputGroup>
    )
}

SearchInput.propTypes = propTypes;

export default SearchInput;