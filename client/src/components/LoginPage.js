import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { isEmptyObject } from '../utils/emptyObject';
import RegisterForm from './forms/RegisterForm';
import { register } from '../actions/userAction';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);
    this.state = { error: '' };
  }

  registerSubmit(userObj) {
    axios
      .post('/api/register', userObj)
      .then(res => res.data)
      .then((user) => {
        this.props.register(user);
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
  register: PropTypes.func.isRequired,
  /* eslint-disable */
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps, { register })(LoginPage);
