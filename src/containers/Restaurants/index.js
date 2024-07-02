import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Restaurants from '../../components/Restaurants';
import { restaurantsActions } from '../../redux/reducers/restaurants'
import { FRENCH_FRIES_TEXT_QUERY } from '../../constants';

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurantsReducer.restaurants,
        error: state.restaurantsReducer.error,
        currentSearchQuery: state.restaurantsReducer.searchQuery,
        location: state.restaurantsReducer.location,
        aggregateReviewsData: state.restaurantsReducer.aggregateReviewsData
    }
}

const mapDispatchToProps = {
    getRestaurants: restaurantsActions.startGetRestaurantsRequest,
    updateSearchQuery: restaurantsActions.updateSearchQuery,
    setLocation: restaurantsActions.setLocation,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { getRestaurants, location, setLocation, restaurants } = this.props;

            // Only load restaurants if they have not already been loaded yet
            if (!restaurants) {
                if (location) {
                    getRestaurants(FRENCH_FRIES_TEXT_QUERY, location);
                } else if (navigator.geolocation) {
                    navigator.permissions
                        .query({ name: "geolocation" })
                        .then(function (result) {
                            if (result.state === "granted" || result.state === "prompt") {
                                navigator.geolocation.getCurrentPosition (
                                    (position) => {
                                        getRestaurants(FRENCH_FRIES_TEXT_QUERY, position.coords);
                                        setLocation(position.coords);
                                    },
                                    (error) => {
                                        getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                                    }
                                );
                            } else {
                                getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                            }
                        });
                } else {
                    getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                }
            }
        },
    }),
)(Restaurants);