import React from 'react';

const RegisterForm = () => (
  <div>
    <h2>Register</h2>
    <form action="/api/register" method="post">
      <div>
        <label htmlFor="displayname">Name:</label>
        <input type="text" name="displayname" id="displayname" />
        <br />
      </div>

      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" />
        <br />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
);

export default RegisterForm;
