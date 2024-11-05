import { PropTypes } from 'prop-types';
import { Button, Input, InputGroup } from 'reactstrap';
import { useMap } from '@vis.gl/react-google-maps';

import { FRENCH_FRIES_TEXT_QUERY } from '../../../constants';

const propTypes = {
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    getRestaurants: PropTypes.func.isRequired
};

const SearchInput = ({ getRestaurants, currentSearchQuery, updateSearchQuery, location }) => {
    const map = useMap();

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
                    let searchLocation;
                    if (map) {
                        const mapCenter = map.getCenter();
                        searchLocation = { latitude: mapCenter.lat(), longitude: mapCenter.lng() };
                    } else {
                        searchLocation = location;
                    }

                    getRestaurants(searchQuery, searchLocation);
                }}
            />
        </InputGroup>
    )
}

SearchInput.propTypes = propTypes;

export default SearchInput;