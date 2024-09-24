import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import Map from '../../components/Map';
import { restaurantsActions } from '../../redux/reducers/restaurants'
import { FRENCH_FRIES_TEXT_QUERY } from '../../constants';

const mapStateToProps = (state) => {
    return {
        error: state.restaurantsReducer.error,
        location: state.restaurantsReducer.location,
    }
}

const mapDispatchToProps = {
    setLocation: restaurantsActions.setLocation,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const { location, setLocation } = this.props;

            // Only load nearby restaurants if they have not already been loaded yet
            if (!location && navigator.geolocation) {
                navigator.permissions
                    .query({ name: "geolocation" })
                    .then(function (result) {
                        if (result.state === "granted" || result.state === "prompt") {
                            navigator.geolocation.getCurrentPosition (
                                (position) => {
                                    console.log("position: " + position);
                                    console.log("position.coords: " + position.coords);
                                    console.log("position.coords.latitude: " + position.coords.latitude);
                                    setLocation(position.coords);
                                },
                                (error) => {
                                }
                            );
                        }
                    });
            }
        },
    }),
)(Map);