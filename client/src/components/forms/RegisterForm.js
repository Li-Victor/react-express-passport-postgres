import React from 'react';
import PropTypes from 'prop-types';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayname: '',
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { displayname, username, password } = this.state;
    this.props.submit({ displayname, username, password });
  }

  render() {
    const { displayname, username, password } = this.state;
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="displayname">Name:</label>
            <input
              type="text"
              name="displayname"
              id="displayname"
              value={displayname}
              onChange={this.onChange}
            />
            <br />
          </div>

          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={this.onChange}
            />
            <br />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default RegisterForm;
