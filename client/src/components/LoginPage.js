import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { isEmptyObject } from '../utils/emptyObject';
import RegisterForm from './forms/RegisterForm';
import LoginForm from './forms/LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.registerSubmit = this.registerSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  registerSubmit(userObj) {
    axios
      .post('/api/register', userObj)
      .then(res => res.data)
      .then((user) => {
        this.props.loginUser(user);
        this.props.history.push('/');
      })
      .catch(err => this.setState({ error: err.response.data.error }));
  }

  loginSubmit(userObj) {
    axios
      .post('/auth/login', userObj)
      .then(res => res.data)
      .then((user) => {
        this.props.loginUser(user);
        this.props.history.push('/');
      })
      .catch(err => this.setState({ error: err.response.data.error }));
  }

  render() {
    const { user } = this.props;
    const { error } = this.state;
    if (user === null) return <div>Something has gone terribly wrong</div>;
    else if (isEmptyObject(user)) {
      return (
        <div>
          {error && <span>{error}</span>}
          <LoginForm submit={this.loginSubmit} />
          <RegisterForm submit={this.registerSubmit} />
        </div>
      );
    }
    return <Redirect to="/profile" />;
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  /* eslint-disable */
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(LoginPage);
