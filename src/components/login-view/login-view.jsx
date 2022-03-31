import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Login stylesheet
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <><div id="page-headers">
      <h3>Welcome to simFlix!</h3>
      <p>Please log in to access the movie hub.</p>
    </div>
      <Form id="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <div><br />
        <span id="page-labels">Want to create an account?</span><br />
        <button type="submit">Register Here</button>
      </div></>
  );
}