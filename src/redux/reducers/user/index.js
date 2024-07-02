export const types = {
    SET_USER_DATA: "SET_USER_DATA",
}

export const initialState = {
    userData: null,
    loggedIn: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_DATA: {
            return {
                ...state,
                userData: action.data,
                loggedIn: true,
            };
        }

        default:
            return state;
    }
}

export const userActions = {
    setUserData: data => ({ type: types.SET_USER_DATA, data })
}