import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {BACKEND_SERVICE_PATH, SECRET_KEY} from "../../../constants";
import {types, userSettingsActions} from "../../reducers/userSettings";
import { SignJWT } from 'jose';

const API_PATH = `${BACKEND_SERVICE_PATH}/userMetadata`

async function generateToken(accountId) {
    const token = await new SignJWT({ userId: accountId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30m') // Token expiry time
        .sign(new TextEncoder().encode(SECRET_KEY));
    return token;
}

export function* callPutUserSettings({ accountId, defaultUsername }){
    try {
        const token = yield generateToken(accountId);
        console.log("token generation", token);
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