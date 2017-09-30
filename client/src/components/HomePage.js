import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { isEmptyObject } from '../utils/emptyObject';

const HomePage = ({ user }) => {
  if (isEmptyObject(user)) {
    return (
      <p>
        Welcome! Please <Link to="/login">log in</Link>
      </p>
    );
  }
  return (
    <p>
      Hello {user.username}. View your <Link to="/profile">profile</Link>
    </p>
  );
};

HomePage.propTypes = {
  /* eslint-disable */
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(HomePage);
