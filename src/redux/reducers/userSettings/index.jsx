export const types = {
    GET_USER_SETTINGS_REQUEST: "GET_USER_SETTINGS_REQUEST",
    GET_USER_SETTINGS_SUCCESS: "GET_USER_SETTINGS_SUCCESS",
    GET_USER_SETTINGS_FAILURE: "GET_USER_SETTINGS_FAILURE",
    SET_USER_SETTINGS_REQUEST: "SET_USER_SETTINGS_REQUEST",
    SET_USER_SETTINGS_SUCCESS: "SET_USER_SETTINGS_SUCCESS",
    SET_USER_SETTINGS_FAILURE: "SET_USER_SETTINGS_FAILURE",
    UPDATE_CURRENT_USER_SETTINGS: "UPDATE_CURRENT_USER_SETTINGS",
}

export const initialState = {
    currentUserSettings: null,
    userSettings: null,
    error: '',
    successfulSetUserSettings: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USER_SETTINGS_REQUEST: {
            return {
                ...state
            };
        }

        case types.GET_USER_SETTINGS_SUCCESS: {
            return {
                ...state,
                userSettings: action.data,
                currentUserSettings: action.data,
                error: ''
            }
        }

        case types.GET_USER_SETTINGS_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        case types.SET_USER_SETTINGS_REQUEST: {
            return {
                ...state
            };
        }

        case types.SET_USER_SETTINGS_SUCCESS: {
            return {
                ...state,
                userSettings: action.data,
                error: '',
                successfulSetUserSettings: 'Successfully updated user settings'
            }
        }

        case types.SET_USER_SETTINGS_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        case types.UPDATE_CURRENT_USER_SETTINGS: {
            return {
                ...state,
                currentUserSettings: {
                    ...state.currentUserSettings,
                    [action.name]: action.value !== "" ? action.value : null
                }
            }
        }

        default:
            return state;
    }
}

export const userSettingsActions = {
    startGetUserSettingsRequest: accountId => ({ type: types.GET_USER_SETTINGS_REQUEST, accountId }),
    successfulGetUserSettingsRequest: data => ({ type: types.GET_USER_SETTINGS_SUCCESS, data }),
    failedGetUserSettingsRequest: error => ({ type: types.GET_USER_SETTINGS_FAILURE, error }),
    startSetUserSettingsRequest: userSettings => ({ type: types.SET_USER_SETTINGS_REQUEST, userSettings }),
    successfulSetUserSettingsRequest: data => ({ type: types.SET_USER_SETTINGS_SUCCESS, data }),
    failedSetUserSettingsRequest: error => ({ type:types.SET_USER_SETTINGS_FAILURE, error }),
    updateCurrentUserSettings: (name, value) => ({ type:types.UPDATE_CURRENT_USER_SETTINGS, name, value })
}