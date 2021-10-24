import axios from 'axios';
import React from 'react';
//import { useLocation } from 'react-router-dom';

//window.localStorage.removeItem('name');

export default function Login() {
  const error_Message = 'Please check your email and password';
  const error_Class = "error-messages";
  const please_Message = 'Please enter your email and password';
  const please_Class = 'please-messages';
  const [formValue, setformValue] = React.useState({
    email: '',
    password: ''
  });
  const [messageError, setErrorMessage] = React.useState(false);

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async(ev: any) => {
    ev.preventDefault()
   
    const data = JSON.stringify({
      "user": {
        "email": formValue.email,
        "password": formValue.password
      }
    });
    
    const config = {
      method: 'post',
      url: 'http://localhost:3000/api/users/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    } as  any;
    
    axios(config).then((response:any) => {
      const { user } = response.data;
      window.localStorage.setItem('jwt', user.token);
      window.localStorage.setItem('userName', user.username);
      window.location.href = "/";
    })
    .catch(() => {
      setErrorMessage(true);
    });
  }
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <ul className={messageError ? error_Class : please_Class}>
              <li>{messageError ? error_Message : please_Message}</li>
            </ul>
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="text" name="email" placeholder="email"  value={formValue.email} onChange={handleChange}/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" type="password" name="password" placeholder="password" value={formValue.password} onChange={handleChange}/>
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
