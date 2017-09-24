import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isEmptyObject } from '../utils/emptyObject';
import RegisterForm from './forms/RegisterForm';

const LoginPage = ({ user }) => {
  if (user === null) return <div>Something has gone terribly wrong</div>;
  else if (isEmptyObject(user)) {
    return <RegisterForm />;
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
