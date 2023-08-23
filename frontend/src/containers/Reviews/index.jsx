import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Reviews from '../../components/Reviews';
import { reviewsActions } from '../../redux/reducers/reviews'

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewsReducer.reviews,
        error: state.reviewsReducer.error
    }
}

const mapDispatchToProps = {
    getReviews: reviewsActions.startGetAllReviewsForRestaurantRequest
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { match: { params: { restaurantId } }, getReviews } = this.props;
            getReviews(restaurantId);
        },
    }),
)(Reviews);