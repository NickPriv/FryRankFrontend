import { PropTypes } from 'prop-types';
import { Breadcrumb, ErrorBanner } from '../Common';
import SearchInput from './SearchInput';
import RestaurantsViewSelect from './RestaurantsViewSelect';
import Map from './Map';
import RestaurantsList from './RestaurantsList';
import { SELECTED_VIEW } from '../../constants';

import style from './style.css';

const propTypes = {
    restaurantIdsForQuery: PropTypes.array.isRequired,
    currentRestaurants: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    getRestaurants: PropTypes.func.isRequired,
    currentSearchQuery: PropTypes.string.isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    location: PropTypes.object,
    aggregateReviewsData: PropTypes.object.isRequired
}

const Restaurants = ({ restaurantIdsForQuery, error, getRestaurants, currentSearchQuery, updateSearchQuery, location, aggregateReviewsData,
                       currentRestaurants, setSelectedView, selectedView
}) => {
    return (
        <div>
            <ErrorBanner error = {error} />
            <Breadcrumb />
            <SearchInput
                getRestaurants = {getRestaurants}
                currentSearchQuery = {currentSearchQuery}
                updateSearchQuery = {updateSearchQuery}
                location = {location}
            />
            <RestaurantsViewSelect
                selectedView = {selectedView}
                setSelectedView = {setSelectedView}
            />
            {selectedView === SELECTED_VIEW.MAP &&
                <Map
                    location = {location}
                    restaurantIds = {restaurantIdsForQuery}
                    currentRestaurants = {currentRestaurants}
                />
            }
            {selectedView === SELECTED_VIEW.LIST &&
                <RestaurantsList
                    restaurantIds = {restaurantIdsForQuery}
                    currentRestaurants = {currentRestaurants}
                    aggregateReviewsData = {aggregateReviewsData}
                />
            }
        </div>
    );
}

Restaurants.propTypes = propTypes;

export default Restaurants;