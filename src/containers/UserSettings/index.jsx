import {compose, lifecycle} from "react-recompose";
import {connect} from "react-redux";
import UserSettings from "../../components/UserSettings";
import {restaurantsActions} from "../../redux/reducers/restaurants";
import {reviewsActions} from "../../redux/reducers/reviews";

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        givenName: state.userReducer.userData ? state.userReducer.userData.given_name : null,
        accountId: state.userReducer.userData ? state.userReducer.userData.sub : null,
    }
}

const mapDispatchToProps = {

};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            const {} = this.props;
        },
    }),
)(UserSettings);