import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import './Login.css'

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        console.log("Response Data", res.data)
        if (res.data.status === "success") {
          console.log(res.data.status)
          console.log("Login successful");
          navigate('/nav/navbar')
        } else {
          console.log("Login failed");
          alert("Error: " + res.data.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while logging in. Please try again.");
      });
  }


  return (
    <>
      <MDBContainer className="my-5 bg-body">
        <MDBCard >
          <MDBRow className='g-0'>
            <MDBCol md='4'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100' />
            </MDBCol>
            <MDBCol md='6'>
              <Form onSubmit={handleSubmit}>
                <MDBCardBody className='d-flex flex-column ms-5'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                    <span className="h1 fw-bold mb-0">Welcome</span>
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={e => setValues({ ...values, email: e.target.value })}></MDBInput>
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={e => setValues({ ...values, password: e.target.value })}></MDBInput>
                  <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Login</MDBBtn>
                  <a className="small text-muted" href="#!">Forgot password?</a>
                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a></p>
                  <div className='d-flex flex-row justify-content-start'>
                    <a href="#!" className="small text-muted me-1">Terms of use.</a>
                    <a href="#!" className="small text-muted">Privacy policy</a>
                  </div>
                </MDBCardBody>
              </Form>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>


    </>
  )
}

export default Login