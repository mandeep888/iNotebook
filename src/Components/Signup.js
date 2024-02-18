import React, { useState  } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const {name,email,password,cpassword} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name,email,password }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully" , "success");
      }
      else{
        props.showAlert("Invalid Credentials" , "danger");
      }
      
}
const onChange = (event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <div className="container my-3">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp"name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password'onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword"name='cpassword' onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
