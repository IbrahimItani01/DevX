import React from 'react';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img
            src="" 
            alt="Logo"
            className="login-logo"
          />
          <h1>Welcome to DevX</h1>
        </div>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          Don’t Have an Account? <span>REGISTER</span>
        </p>
      </div>
    </div>
  );
}

export default Login;