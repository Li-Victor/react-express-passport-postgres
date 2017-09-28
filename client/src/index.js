import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import App from './App';
import authReducer from './reducers/authReducer';
import { fetchUser } from './actions/userAction';

const store = createStore(authReducer, {}, applyMiddleware(reduxThunk));
// get current user first, and then render
axios.get('/auth/current_user').then((res) => {
  store.dispatch(fetchUser(res));

  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  );
});
