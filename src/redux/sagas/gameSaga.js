import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGame(action) {
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
      const response = yield axios.get('api/game/mine');
      yield put({ type: 'SET_GAMES', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* fetchLobbyGame(action) {
    try {
      console.log('Lobby Fetch hit with payload:');
      const response = yield axios.get('api/game/lobby/' + action.payload);
      yield put({ type: 'SET_GAMES', payload: response.data });
    } catch (error) {
      console.log('Lobby Fetch error:', error);
    }
  }

  function* fetchCreatedGame() {
    try {
      const response = yield axios.get('api/game/created');
      yield put({ type: 'CREATED_GAMES', payload: response.data });
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* createGame(action) {
    try {
      const response = yield axios.post('api/game/create', action.payload);
      yield put({ type: 'CREATED_GAME' });
      console.log('GameSaga data:', response.data)
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* joinGame(action) {
    try {
      const response = yield axios.post('api/game/join', action.payload);
      yield put({ type: 'FETCH_GAME' });
      console.log('GameSaga data:', response.data)
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* leaveGame(action) {
    try {
      const response = yield axios.delete('api/game/leave', {data: action.payload});
      yield put({ type: 'FETCH_MY_GAME' });
      console.log('GameSaga data:', response.data)
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

  function* deleteGame(action) {
    try {
      const response = yield axios.delete('api/game/delete', {data: action.payload});
      yield put({ type: 'CREATED_GAME' });
      console.log('GameSaga data:', response.data)
    } catch (error) {
      console.log('User get request failed', error);
    }
  }

function* userSaga() {
  yield takeLatest('FETCH_GAME', fetchGame);
  yield takeLatest('FETCH_MY_GAME', fetchMyGame);
  yield takeLatest('FETCH_LOBBY_GAME', fetchLobbyGame);
  yield takeLatest('CREATE_GAME', createGame);
  yield takeLatest('CREATED_GAME', fetchCreatedGame);
  yield takeLatest('JOIN_GAME', joinGame);
  yield takeLatest('LEAVE_GAME', leaveGame);
  yield takeLatest('DELETE_GAME', deleteGame);
}

export default userSaga;
