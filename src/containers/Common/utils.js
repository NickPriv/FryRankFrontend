// TODO(https://github.com/NickPriv/FryRankFrontend/issues/84): Write some code to run to "register" new users onto site when they first login so that they have
// a username available.
export function getUsernameFromState(state) {
    if (state.userSettingsReducer.userSettings && state.userSettingsReducer.userSettings.username !== '') {
        return state.userSettingsReducer.userSettings.username;
    }
    else {
        return null;
    }
}