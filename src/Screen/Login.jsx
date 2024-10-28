import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null); // State for handling error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!credentials.email || !credentials.password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    // Make the login request
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/"); // Redirect to home page on success
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='my-5'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={credentials.email} 
              onChange={onChange} 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              required 
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={credentials.password} 
              onChange={onChange} 
              id="exampleInputPassword1" 
              required 
            />
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} {/* Display error message */}

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">I am a new user</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
