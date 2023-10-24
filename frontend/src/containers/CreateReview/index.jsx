import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import CreateReview from '../../components/CreateReview';
import { reviewsActions } from '../../redux/reducers/reviews'
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        currentRestaurant: state.restaurantsReducer.currentRestaurant,
        error: state.reviewsReducer.error,
        currentReview: state.reviewsReducer.currentReview
    }
}

const mapDispatchToProps = {
    getRestaurantById: restaurantsActions.startGetRestaurantByIdRequest,
    createReview: reviewsActions.startCreateReviewForRestaurantRequest,
    updateCurrentReview: reviewsActions.updateCurrentReview
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getRestaurantById, createReview, updateCurrentReview } = this.props;
            getRestaurantById(restaurantId);
        },
    }),
)(CreateReview);