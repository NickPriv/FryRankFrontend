import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Restaurants from '../../components/Restaurants';
import { restaurantsActions } from '../../redux/reducers/restaurants'
import { FRENCH_FRIES_TEXT_QUERY } from '../../constants';

const mapStateToProps = (state) => {
    return {
        restaurantIdsForQuery: state.restaurantsReducer.restaurantIdsForQuery,
        currentRestaurants: state.restaurantsReducer.currentRestaurants,
        error: state.restaurantsReducer.error,
        currentSearchQuery: state.restaurantsReducer.searchQuery,
        location: state.restaurantsReducer.location,
        aggregateReviewsData: state.restaurantsReducer.aggregateReviewsData,
        selectedView: state.restaurantsReducer.selectedView,
    }
}

const mapDispatchToProps = {
    getRestaurants: restaurantsActions.startGetRestaurantsForQueryRequest,
    updateSearchQuery: restaurantsActions.updateSearchQuery,
    setLocation: restaurantsActions.setLocation,
    setSelectedView: restaurantsActions.setSelectedView,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { getRestaurants, location, setLocation, restaurantIdsForQuery } = this.props;

            // Only load nearby restaurants if they have not already been loaded yet
            if (!restaurantIdsForQuery) {
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

/*
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { location, setLocation } = this.props;

            // Only load nearby restaurants if they have not already been loaded yet
            if (!location && navigator.geolocation) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                        if (result.state === "granted" || result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition (
                                (position) => {
                                    console.log("position: " + position);
                                    console.log("position.coords: " + position.coords);
                                    console.log("position.coords.latitude: " + position.coords.latitude);
                                    setLocation(position.coords);
                                },
                                (error) => {
                                }
                            );
                        }
                    });
            }
        },
    }),
)(Map);
*/