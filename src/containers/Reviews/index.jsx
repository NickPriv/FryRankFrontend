import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Reviews from '../../components/Reviews';
import { reviewsActions } from '../../redux/reducers/reviews'
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews,
        currentRestaurant: state.restaurantsReducer.currentRestaurant,
        reviewsError: state.reviewsReducer.error,
        restaurantsError: state.restaurantsReducer.error,
        requestingRestaurantDetails: state.restaurantsReducer.requestingRestaurantDetails
    }
}

const mapDispatchToProps = {
    getRestaurantById: restaurantsActions.startGetRestaurantByIdRequest,
    getReviews: reviewsActions.startGetAllReviewsForRestaurantRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantById, getReviews } = this.props;
            getRestaurantById(restaurantId);
            getReviews(restaurantId);
        },
    }),
)(Reviews);