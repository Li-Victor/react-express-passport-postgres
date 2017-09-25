import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUser } from './actions/userAction';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Route location={location} path="/" exact component={HomePage} />
        <Route location={location} path="/login" exact component={LoginPage} />
        <Route location={location} path="/profile" exact component={ProfilePage} />
      </div>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default connect(null, { fetchUser })(App);
