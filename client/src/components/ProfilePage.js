import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { isEmptyObject } from '../utils/emptyObject';

const ProfilePage = ({ user }) => {
  if (isEmptyObject(user)) {
    return <Redirect to="/login" />;
  }
  return (
    <p>
      ID: {user.id}
      <br />
      Username: {user.username}
      <br />
      Name: {user.displayname}
      <br />
      {user.emails && <div>Email: {user.emails[0].value}</div>}
      <a href="/auth/logout">Log out </a>
    </p>
  );
};

ProfilePage.propTypes = {
  /* eslint-disable */
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(ProfilePage);
