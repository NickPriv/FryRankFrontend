import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAllReviewsForRestaurant } from '../../redux/actions/restaurantReviewActions';

const RestaurantReviews = () => {
  const { restaurantId } = useParams();
  const reviews = useSelector((state) => state.reviews)

  useEffect((restaurantId) => {
    getAllReviewsForRestaurant(restaurantId)
  },[])

  return (
    <div>
      <h1>{restaurantId}</h1>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
   {
    getAllReviewsForRestaurant
   },
  dispatch
  );
 };

 export default connect(null, mapDispatchToProps)(RestaurantReviews);
