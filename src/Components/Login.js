import React, { useState  } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    let navigate = useNavigate();
    const [credentials,setCredentials] = useState({email:"",password:""});
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password }),
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
          }
          else{
            alert("Invalid credentials");
          }
    }
    const onChange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
      }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password'/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </>
    )
}

export default Login
