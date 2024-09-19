import { combineReducers } from 'redux';
import restaurantsReducer, {initialState} from './restaurants';
import reviewsReducer from './reviews';
import userReducer from './user';

export default combineReducers({
    reviewsReducer,
    restaurantsReducer,
    userReducer,
    userSettingsReducer,
});