import { PropTypes } from 'prop-types';

import ReviewCard from './ReviewCard';
import { Breadcrumb, Button, ErrorBanner, FrySpinner, LinkButton, RestaurantHeader } from '../Common';

const propTypes = {
    reviews: PropTypes.array.isRequired,
    reviewsError: PropTypes.string.isRequired,
    restaurantsError: PropTypes.string.isRequired,
    currentRestaurant: PropTypes.shape({
        displayName: PropTypes.shape({
            text: PropTypes.string,
            languageCode: PropTypes.string
        }),
        formattedAddress: PropTypes.String,
        id: PropTypes.String
    }).isRequired,
    averageScore: PropTypes.number.isRequired,
    requestingRestaurantDetails: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

const Reviews = ({ reviews, reviewsError, restaurantsError, currentRestaurant, requestingRestaurantDetails, averageScore, loggedIn }) => {
    const reviewsBody = () => {
        if (!reviews) {
            return <FrySpinner />;
        } else if (reviews.length == 0) {
            return <p>No reviews exist for this restaurant yet. Why don't you write the first one?</p>
        } else {
            return reviews.map(review => (
                <ReviewCard title={review.title} authorId={review.authorId} score={review.score} body={review.body} timestamp={review.isoDateTime}/>
            )).sort(
                (a,b) => {
                    // We declare the past for undefined values so that they sort to the end of the array.
                    const past = new Date(0)
                    let dateA = a.props.timestamp ? new Date(a.props.timestamp) : past
                    let dateB = b.props.timestamp ? new Date(b.props.timestamp) : past
                    return dateB.getTime() - dateA.getTime()
                }
            );
        }
    }

    return (
        <div>
            <ErrorBanner error = {reviewsError} />
            <ErrorBanner error = {restaurantsError} />
            { requestingRestaurantDetails && <FrySpinner /> }
            { currentRestaurant &&
                <div>
                   <Breadcrumb aliases = {{[currentRestaurant.id]: currentRestaurant.displayName.text}}/>
                   <RestaurantHeader currentRestaurant={currentRestaurant} averageScore={averageScore} />
                   { loggedIn &&
                       <LinkButton
                           link={'/restaurants/' + currentRestaurant.id + '/create'}
                           children='Write a review'
                           color='danger'
                       />
                   }
                   { !loggedIn &&
                       <Button
                           children='Log in to Google to write a review'
                           color='danger'
                           disabled='true'
                       />
                   }
                   <LinkButton
                       link='/restaurants/'
                       children='Back to all restaurants'
                       color='secondary'
                   />
                   {reviewsBody()}
                </div> }
        </div>
    )
}

Reviews.propTypes = propTypes;

export default Reviews;
