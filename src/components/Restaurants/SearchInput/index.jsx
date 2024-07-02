import { PropTypes } from 'prop-types';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { Button } from '../../Common';
import { FRENCH_FRIES_TEXT_QUERY } from '../../../constants';

const propTypes = {
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    getRestaurants: PropTypes.func.isRequired
};

const SearchInput = ({ getRestaurants, currentSearchQuery, updateSearchQuery, location }) => {

    return (
        <Form onChange={(event) => {
            updateSearchQuery(event.target.value);
        }}>
            <FormGroup>
                <Label for="searchInput">
                    Search for a restaurant
                </Label>
                <Input
                    id="searchInput"
                    name="search"
                    placeholder="Search for a restaurant"
                    type="textarea"
                    value={currentSearchQuery}
                />
            </FormGroup>
            <Button
                children='Submit'
                color='danger'
                onClick={(event) => {
                    const searchQuery = currentSearchQuery == '' ? FRENCH_FRIES_TEXT_QUERY : currentSearchQuery;
                    getRestaurants(searchQuery, location);
                }}
            />
        </Form>
    )
}

SearchInput.propTypes = propTypes;

export default SearchInput;