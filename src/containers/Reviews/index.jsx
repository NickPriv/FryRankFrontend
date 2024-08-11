import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Reviews from '../../components/Reviews';
import { reviewsActions } from '../../redux/reducers/reviews';
import { restaurantsActions } from '../../redux/reducers/restaurants';

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews,
        averageScore: state.reviewsReducer.averageScore,
        currentRestaurants: state.restaurantsReducer.currentRestaurants,
        reviewsError: state.reviewsReducer.error,
        restaurantsError: state.restaurantsReducer.error,
        requestingRestaurantDetails: state.restaurantsReducer.requestingRestaurantDetails,
        loggedIn: state.userReducer.loggedIn,
    }
}

const mapDispatchToProps = {
    getRestaurantsForIds: restaurantsActions.startGetRestaurantsForIdsRequest,
    getReviews: reviewsActions.startGetAllReviewsForRestaurantRequest,
    resetCurrentRestaurant: restaurantsActions.resetCurrentRestaurant,
    resetReviews: reviewsActions.resetReviews
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantsForIds, getReviews, resetCurrentRestaurant, resetReviews } = this.props;
            resetCurrentRestaurant();
            resetReviews();
            getRestaurantsForIds([restaurantId]);
            getReviews(restaurantId);
        },
    }),
)(Reviews);