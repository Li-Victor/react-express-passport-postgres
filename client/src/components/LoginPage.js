import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isEmptyObject } from '../utils/emptyObject';

const LoginPage = ({ user }) => {
  if (user === null) return <div>Something has gone terribly wrong</div>;
  else if (isEmptyObject(user)) {
    return (
      <form action="/auth/login" method="post">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <br />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>

        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
  return <Redirect to="/profile" />;
};

LoginPage.propTypes = {
  /* eslint-disable */
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(LoginPage);
