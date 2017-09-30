import { FETCH_USER } from './types';

export const fetchUser = res => ({
  type: FETCH_USER,
  payload: res
});

export const userSuccess = user => (dispatch) => {
  dispatch(fetchUser(user));
};
