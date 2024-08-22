import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Critic from '../../components/Critic';
import { reviewsActions } from '../../redux/reducers/reviews';
import { restaurantsActions } from '../../redux/reducers/restaurants';

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews,
        requestingReviews: state.reviewsReducer.requestingReviews,
        reviewsError: state.reviewsReducer.error,
        loggedIn: state.userReducer.loggedIn,
        currentRestaurants: state.restaurantsReducer.currentRestaurants,
        restaurantsError: state.restaurantsReducer.restaurantsError,
    }
}

const mapDispatchToProps = {
    getReviews: reviewsActions.startGetAllReviewsForAccountRequest,
    resetReviews: reviewsActions.resetReviews,
    getRestaurantsForIds: restaurantsActions.startGetRestaurantsForIdsRequest,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { accountId } }, getReviews, resetReviews } = this.props;
            resetReviews();
            getReviews(accountId);
        },
        componentDidUpdate() {
            const { currentRestaurants, getRestaurantsForIds, reviews } = this.props;
            if (reviews) {
                const restaurantIds = Array.from(new Set(reviews.map(review => review.restaurantId)));
                if (!currentRestaurants || (currentRestaurants && currentRestaurants.size != restaurantIds.size)) {
                    const idsForRestaurantsToGetFromGoogle = currentRestaurants
                        ? restaurantIds.filter(restaurantId => !currentRestaurants.has(restaurantId))
                        : restaurantIds;
                    if (idsForRestaurantsToGetFromGoogle.length > 0) {
                        getRestaurantsForIds(idsForRestaurantsToGetFromGoogle);
                    }
                }
            }
        }
    }),
)(Critic);