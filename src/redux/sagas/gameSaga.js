import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGame() {
  try {
    const response = yield axios.get('api/game');
    yield put({ type: 'SET_GAMES', payload: response.data });
    console.log('GameSaga data:', response.data)
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchMyGame() {
    try {
      console.log('Fetch My Game Saga Hit.')
      const response = yield axios.get('api/game/mine');
      yield put({ type: 'SET_GAMES', payload: response.data });
      console.log('GameSaga data:', response.data)
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* userSaga() {
  yield takeLatest('FETCH_GAME', fetchGame);
  yield takeLatest('FETCH_MY_GAME', fetchMyGame);
}

export default userSaga;
