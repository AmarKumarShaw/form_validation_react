import Header from './containers/Header';
// import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
// import ProductListing from './containers/ProductListing';

import "./App.css";
import { useState,useEffect } from "react";


function App() {

  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors]  = useState({});
  const [isSubmit,setIsSubmit]  = useState(false)

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues, [name]:value })
  }

  
  const handleSubmit = (e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(()=>{
  
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues)
    } 
  },[formErrors])


  const validate=(values) => {
      const errors = {}
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    
      if(!values.username){
        errors.username = "Username is required !";
      }else if(values.username.length < 2){
        errors.username = "Username should not be less than 2 characters";
      }
      if(!values.email){
        errors.email = "Email is Required";
      }else if (!regex.test(values.email)){
        errors.email = "This is not a valid email !";
      }
      if(!values.password){
        errors.password="Password is required";
      }else if(values.password.length < 4 ){
        errors.password= "Password should be more than 4 Characters";
      }
      else if(values.password.length > 10){
        errors.password ="Password should not be more thank 10 Characters";
      }

      return errors;
    }


  return (
    <div className="container">

    {(Object.keys(formErrors).length === 0 && isSubmit) ? <div className="ui message success">Signed in Successfully  </div> : "" }

      <pre> {JSON.stringify(formValues,undefined,2)} </pre>
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input type="text" name="username"
             placeholder="Enter your Username" 
             value={formValues.username}
             onChange={handleChange}
              />
          </div>
          <p style={{color:"red"}}>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your Email" value={formValues.email} onChange={handleChange} />
          </div>
          <p style={{color:"red"}}>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your Password" value={formValues.password} onChange={handleChange} />
          </div>
          <p style={{color:"red"}}>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
