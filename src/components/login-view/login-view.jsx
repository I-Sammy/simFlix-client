import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Login stylesheet
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      /* then call props.onLoggedIn(username) */
      //https://zoehime.herokuapp.com/
      axios.post('https://zoehime.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    }
    /*props.onLoggedIn(username);*/
  };

  return (
    <><div id="page-headers">
      <h3>Welcome to simFlix!</h3>
      <p>Please log in to access the movie hub.</p>
    </div>
      <Form id="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p>{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p>{passwordErr}</p>}
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <div><br />
        <p>
          Don't have an account?{'    '}
          <Link to={'/register'}>
            <Button variant="link">Register Now!</Button>
          </Link>
        </p>
      </div></>
  );
}
LoginView.propTypes = {
  onLoggedIn: propTypes.func.isRequired
};