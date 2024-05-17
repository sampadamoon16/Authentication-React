import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';


function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/register', values);
            if (res.data.status === "success") {
                navigate('/');
            } else {
                alert("Error: " + res.data.message || "Registration failed");
            }
        } catch (err) {
            console.error("An error occurred:", err);
            alert("An error occurred during registration. Please try again.");
        }
    }

    return (
        <div>
            {/* <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={e => setValues({...values, name: e.target.value})}/>
                    <Form.Text className="text-muted">
                        this is user name
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setValues({...values, email: e.target.value})}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setValues({...values, password: e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign up
                </Button><br /><br />
                <Link to="/login" variant="primary" type="submit" className="btn btn-success">Log in</Link>
            </Form> */}

            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                    <Form onSubmit={handleSubmit}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                        <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' onChange={e => setValues({...values, name: e.target.value})}/>
                        <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'  onChange={e => setValues({...values, email: e.target.value})}/>
                        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' onChange={e => setValues({...values, password: e.target.value})}/>
                        {/* <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password' onChange={e => setValues({...values, password: e.target.value})} /> */}
                        <div className='d-flex flex-row justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                        </div>
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
                    </MDBCardBody>
                    </Form>
                </MDBCard>
            </MDBContainer>
        </div>
    )
}

export default Register