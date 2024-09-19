export const types = {
    GET_USER_SETTINGS_REQUEST: "GET_USER_SETTINGS_REQUEST",
    GET_USER_SETTINGS_SUCCESS: "GET_USER_SETTINGS_SUCCESS",
    GET_USER_SETTINGS_FAILURE: "GET_USER_SETTINGS_FAILURE",
    SET_USER_SETTINGS_REQUEST: "SET_USER_SETTINGS_REQUEST",
    SET_USER_SETTINGS_SUCCESS: "SET_USER_SETTINGS_SUCCESS",
    SET_USER_SETTINGS_FAILURE: "SET_USER_SETTINGS_FAILURE",
}

export const initialState = {
    userSettings: null,
    error: '',
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
                error: ''
            }
        }

        case types.SET_USER_SETTINGS_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        default:
            return state;
    }
}

export const userSettingsActions = {
    startGetUserSettingsRequest: ()
}