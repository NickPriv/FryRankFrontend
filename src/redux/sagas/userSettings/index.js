import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {BACKEND_SERVICE_PATH} from "../../../constants";
import {types, userSettingsActions} from "../../reducers/userSettings";
import { SignJWT } from 'jose';

const secretKey = "3c2353bc79ff762690f24ea376b4eb940f1db01427b39a65fb9153d59f011e46"
//process.env.REACT_TOKEN_SECRET_KEY;
const API_PATH = `${BACKEND_SERVICE_PATH}/userMetadata`

async function generateToken(accountId) {
    const token = await new SignJWT({ userId: accountId }) // Replace with your payload
        .setProtectedHeader({ alg: 'HS256' }) // Specify signing algorithm
        .setIssuedAt()
        .setExpirationTime('30m') // Token expiry time
        .sign(new TextEncoder().encode(secretKey));
    return token;
}

export function* callPutUserSettings({ accountId, defaultUsername }){
    try {
        const token = yield generateToken(accountId);
        console.log("the token", token);
        const { data } = yield axios.put(API_PATH, {  }, { params: { accountId: accountId, defaultUsername: defaultUsername } });
        yield put(userSettingsActions.successfulPutUserSettingsRequest(data));
    } catch (err) {
        yield put(userSettingsActions.failedPutUserSettingsRequest(err.response.data.message));
    }
}

export function* callGetUserSettings({ accountId }){
    try {
        const { data } = yield axios.get(API_PATH, { params: { accountId: accountId } });
        yield put(userSettingsActions.successfulGetOtherUserSettingsRequest(data));
    } catch (err) {
        yield put(userSettingsActions.failedGetOtherUserSettingsRequest(err.response.data.message));
    }
}

export function* callSetUserSettings({ userSettings }){
    try {
        const { data } = yield axios.post(API_PATH, userSettings);
        yield put(userSettingsActions.successfulSetUserSettingsRequest(data));
    } catch (err) {
        yield put(userSettingsActions.failedSetUserSettingsRequest(err.response.data.message));
    }
}

export default function* watchUserSettingsRequest() {
    yield takeEvery(types.PUT_USER_SETTINGS_REQUEST, callPutUserSettings);
    yield takeEvery(types.SET_USER_SETTINGS_REQUEST, callSetUserSettings);
    yield takeEvery(types.GET_OTHER_USER_SETTINGS_REQUEST, callGetUserSettings);
}