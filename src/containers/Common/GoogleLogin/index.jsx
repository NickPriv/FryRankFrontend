import { compose, lifecycle } from 'react-recompose';
import { connect } from 'react-redux';
import { GoogleLogin } from '../../../components/Common';
import { userActions } from '../../../redux/reducers/user';
import {userSettingsActions} from "../../../redux/reducers/userSettings";

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        // TODO(https://github.com/NickPriv/FryRankFrontend/issues/84): Write some code to run to "register" new users onto site when they first login so that they have
        // a username available.
        username: state.userSettingsReducer.userSettings && state.userSettingsReducer.userSettings.username !== '' ? state.userSettingsReducer.userSettings.username :
            ( state.userReducer.userData ? state.userReducer.userData.given_name : null ),
        accountId: state.userReducer.userData ? state.userReducer.userData.sub : null,
        userSettings: state.userSettingsReducer.userSettings ? state.userSettingsReducer.userSettings : null,
    }
}

const mapDispatchToProps = {
    setUserData: userActions.setUserData,
    getUserSettings: userSettingsActions.startGetUserSettingsRequest,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidUpdate() {
            const { loggedIn, getUserSettings, userSettings, accountId } = this.props;
            if(loggedIn && userSettings === null) {
                getUserSettings(accountId);
            }
        }
    }),
)(GoogleLogin);