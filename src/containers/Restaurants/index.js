import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Restaurants from '../../components/Restaurants';
import { restaurantsActions } from '../../redux/reducers/restaurants'

const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurantsReducer.restaurants,
        error: state.restaurantsReducer.error,
        currentSearchQuery: state.restaurantsReducer.searchQuery
    }
}

const mapDispatchToProps = {
    getRestaurants: restaurantsActions.startGetRestaurantsRequest,
    updateSearchQuery: restaurantsActions.updateSearchQuery
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { getRestaurants } = this.props;
            getRestaurants("french fries");
        },
    }),
)(Restaurants);