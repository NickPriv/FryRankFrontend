import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios';
import {BACKEND_SERVICE_PATH} from "../../../constants";
import {types, userSettingsActions} from "../../reducers/userSettings";

const API_PATH = `${BACKEND_SERVICE_PATH}/userMetadata`

export function* callGetUserSettings({ accountId }){
    try {
        const { data } = yield axios.get(API_PATH, { params: { accountId: accountId } });
        yield put(userSettingsActions.successfulGetUserSettingsRequest(data));
    } catch (err) {
        yield put(userSettingsActions.failedGetUserSettingsRequest(err.response.data.message));
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
    yield takeEvery(types.GET_USER_SETTINGS_REQUEST, callGetUserSettings);
    yield takeEvery(types.SET_USER_SETTINGS_REQUEST, callSetUserSettings);
}