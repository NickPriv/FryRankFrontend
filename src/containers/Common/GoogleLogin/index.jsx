import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import { GoogleLogin } from '../../../components/Common';
import { userActions } from '../../../redux/reducers/user';

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        givenName: state.userReducer.userData ? state.userReducer.userData.given_name : null,
    }
}

const mapDispatchToProps = {
    setUserData: userActions.setUserData,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(GoogleLogin);