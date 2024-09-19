import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Critic from '../../components/Critic';
import { reviewsActions } from '../../redux/reducers/reviews';
import { restaurantsActions } from '../../redux/reducers/restaurants';
import withRouter from '../Common/withRouter';

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
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { params: { accountId }, getReviews, resetReviews } = this.props;
            resetReviews();
            getReviews(accountId);
        },
        componentDidUpdate(prevProps) {
            const { currentRestaurants, getRestaurantsForIds, reviews, params: { accountId }, getReviews } = this.props;
            // The following code logic may run every time the state changes

            if (accountId !== prevProps.params.accountId) {
                getReviews(accountId);
            }

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