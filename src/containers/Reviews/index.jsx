import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Reviews from '../../components/Reviews';
import { reviewsActions } from '../../redux/reducers/reviews'
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews,
        averageScore: state.reviewsReducer.averageScore,
        currentRestaurant: state.restaurantsReducer.currentRestaurant,
        reviewsError: state.reviewsReducer.error,
        restaurantsError: state.restaurantsReducer.error,
        requestingRestaurantDetails: state.restaurantsReducer.requestingRestaurantDetails
    }
}

const mapDispatchToProps = {
    getRestaurantById: restaurantsActions.startGetRestaurantByIdRequest,
    getReviews: reviewsActions.startGetAllReviewsForRestaurantRequest,
    resetCurrentRestaurant: restaurantsActions.resetCurrentRestaurant,
    resetReviews: reviewsActions.resetReviews
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantById, getReviews, resetCurrentRestaurant, resetReviews } = this.props;
            resetCurrentRestaurant();
            resetReviews();
            getRestaurantById(restaurantId);
            getReviews(restaurantId);
        },
    }),
)(Reviews);