import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import CreateReview from '../../components/CreateReview';
import { reviewsActions } from '../../redux/reducers/reviews'
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        currentRestaurants: state.restaurantsReducer.currentRestaurants,
        error: state.reviewsReducer.error,
        currentReview: state.reviewsReducer.currentReview,
        successfulCreate: state.reviewsReducer.successfulCreate,
        loggedIn: state.userReducer.loggedIn,
        givenName: state.userReducer.userData ? state.userReducer.userData.given_name : null,
        accountId: state.userReducer.userData ? state.userReducer.userData.sub : null,
    }
}

const mapDispatchToProps = {
    getRestaurantsForIds: restaurantsActions.startGetRestaurantsForIdsRequest,
    createReview: reviewsActions.startCreateReviewForRestaurantRequest,
    updateCurrentReview: reviewsActions.updateCurrentReview,
    resetCreateRequest: reviewsActions.resetCreateRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantsForIds, updateCurrentReview, resetCreateRequest, currentRestaurants } = this.props;
            resetCreateRequest();
            if (!currentRestaurants || !currentRestaurants.has(restaurantId)) {
                getRestaurantsForIds([restaurantId]);
            }
            updateCurrentReview("restaurantId", restaurantId);
        },
        componentDidUpdate() {
            const { match: { params: { restaurantId } }, successfulCreate, history } = this.props;
            if (successfulCreate) {
                history.push(`/restaurants/${restaurantId}`);
            }
        },
    }),
)(CreateReview);