import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Row, Col, Form, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthDate] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  // const [values, setValues] = useState({
  //   nameErr: '',
  //   usernameErr: '',
  //   passwordErr: '',
  //   emailErr: ''
  // });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required!');
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr('Username must be at least 3 characters long');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password is required!');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email is required!');
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
      axios.post('https://zoehime.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        BirthDate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
          alert('Registration successful! Please login to access the website.');
        })
        .catch(e => {
          console.log('Could not register');
          //alert('Unable to register');
        });
    }
  }

  return (
    <>
      <h1>Registration</h1>
      <Form className="mb-3">
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username*:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          {usernameErr && <p className="font-italic">{usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password*:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          {passwordErr && <p className="font-italic">{passwordErr}</p>}
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email*:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
          {emailErr && <p className="font-italic">{emailErr}</p>}
        </Form.Group>

        <Form.Group controlId="formBirthday" className="mb-3">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthDate(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
      <p>
        Already have an account?{'    '}
        <Link to={`/`}>
          <Button variant="link">Login!</Button>
        </Link>
      </p>
    </>
  );
}

// RegistrationView.propTypes = {
//   onRegister: PropTypes.func
// };