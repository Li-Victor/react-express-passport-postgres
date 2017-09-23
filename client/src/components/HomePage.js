import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { isEmptyObject } from '../utils/emptyObject';

class HomePage extends React.Component {
  renderContent() {
    const { user } = this.props;
    if (user === null) return <div>Something has gone terribly wrong</div>;
    else if (isEmptyObject(user)) {
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
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

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
