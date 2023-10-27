import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import CreateReview from '../../components/CreateReview';
import { reviewsActions } from '../../redux/reducers/reviews'
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        currentRestaurant: state.restaurantsReducer.currentRestaurant,
        error: state.reviewsReducer.error,
        currentReview: state.reviewsReducer.currentReview,
        successfulCreate: state.reviewsReducer.successfulCreate
    }
}

const mapDispatchToProps = {
    getRestaurantById: restaurantsActions.startGetRestaurantByIdRequest,
    createReview: reviewsActions.startCreateReviewForRestaurantRequest,
    updateCurrentReview: reviewsActions.updateCurrentReview,
    resetCreateRequest: reviewsActions.resetCreateRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantById, updateCurrentReview, resetCreateRequest } = this.props;
            resetCreateRequest();
            getRestaurantById(restaurantId);
            updateCurrentReview("restaurantId", restaurantId);
        },
        componentDidUpdate() {
            const { match: { params: { restaurantId } }, successfulCreate, history } = this.props;
            if (successfulCreate) {
                setTimeout(
                    () => history.push(`/restaurants/${restaurantId}`),
                    5000, // Wait for 5s
                );
            }
        },
    }),
)(CreateReview);