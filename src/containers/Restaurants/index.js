import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Restaurants from '../../components/Restaurants';
import { restaurantsActions } from '../../redux/reducers/restaurants'
import { FRENCH_FRIES_TEXT_QUERY } from '../../constants';

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurantsReducer.restaurants,
        error: state.restaurantsReducer.error,
        currentSearchQuery: state.restaurantsReducer.searchQuery
    }
}

const mapDispatchToProps = {
    getRestaurants: restaurantsActions.startGetRestaurantsRequest,
    updateSearchQuery: restaurantsActions.updateSearchQuery
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { getRestaurants } = this.props;

            if (navigator.geolocation) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                        if (result.state === "granted") {
                            navigator.geolocation.getCurrentPosition (
                                (position) => {
                                    getRestaurants(FRENCH_FRIES_TEXT_QUERY, position.coords);
                                },
                                (error) => {
                                    getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                                }
                            );
                        } else if (result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition (
                                (position) => {
                                    getRestaurants(FRENCH_FRIES_TEXT_QUERY, position.coords);
                                },
                                (error) => {
                                    getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                                }
                            );
                        } else if (result.state === "denied") {
                            getRestaurants(FRENCH_FRIES_TEXT_QUERY);
                        }
                    });
            } else {
              getRestaurants(FRENCH_FRIES_TEXT_QUERY);
            }
        },
    }),
)(Restaurants);