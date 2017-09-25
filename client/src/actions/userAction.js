import axios from 'axios';
import { FETCH_USER } from './types';

export const userLoggedIn = user => ({
  type: FETCH_USER,
  payload: user
});

export const register = user => dispatch => dispatch(userLoggedIn(user));

export const fetchUser = () => (dispatch) => {
  axios.get('/auth/current_user').then((res) => {
    dispatch(userLoggedIn(res.data));
  });
};
