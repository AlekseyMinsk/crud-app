import Nav from "./Nav";
import Footer from "./Footer";
import axios from 'axios';
import React from 'react';

export default function LoginRegister() {

  const [formValue, setformValue] = React.useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (event: any) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async(ev: any) => {
    ev.preventDefault()
    // const json = JSON.stringify({
    //   "user": {
    //     "email": "alice@example.com",
    //     "password": "I_<3-R0ber7"
    //   }
    // });
    // // store the states in the form data
    // const loginFormData = new FormData();
    // loginFormData.append("username", formValue.email)
    // loginFormData.append("password", formValue.password)
  
    // try {
    //   // make axios post request
    //   const response = await axios({
    //     method: "post",
    //     url: "http://localhost:3000/api/users/login",
    //     data: loginFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch(error) {
    //   console.log(error)
    // }
    // console.log(json)
    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/api/users/login",
    //   data: json,
    //   headers: { "Content-Type": "multipart/form-data" },
    // }).then(response => {
    //    console.log(response)
    // }).catch(error => {
    //   console.error(error);
    // })

   
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
    
    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      setErrorMessage('')
    })
    .catch(function (error) {
      setErrorMessage('Please check your email and password');
    });

    

    // const config = {
    //   method: 'get',
    //   url: 'http://localhost:3000/api/user',
    //   headers: { 
    //     'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM0NzQ2NjI5LCJleHAiOjE2MzQ3NDg0Mjl9.BzcVk_xAyWcmkEf6IkljIqcWdVpQySgpNWEc4Hu-ZXU'
    //   }
    // } as  any;

    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  //const errorMessage = "";

  return (
    <>
      <Nav />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Login</h1>
              <ul className="error-messages">
                <li>{errorMessage}</li>
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
      <Footer />
    </>
  );
}
