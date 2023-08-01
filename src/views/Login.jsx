import React, { useRef, useState } from "react";
import Logo from '../assets/img/login-logo.png';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


export default function Login() {
  
   const [message,setMessage]= useState('');
   const [data, setData] = useState(false);

   const emailRef = useRef();
   const passwordRef = useRef();
   
   const {setUser, setToken} = useStateContext();

   const onSubmit=(ev)=>{
    ev.preventDefault();
    const payload ={
        email: emailRef.current.value,
        password: passwordRef.current.value,
    }
    axiosClient.post('/login',payload)
      .then(({data})=>{
         
         if(data.user['is_admin']===1){
            setToken(data.token)
            setUser(data.user)
         }else{
          setData(true)
         }
         
         console.log(data.user['is_admin'])
      })
      .catch(err=>{
        const response = err.response;
        setMessage('Error al intentar ingresar, pruebe de nuevamente..')
        console.log(response);
      })
   }

    return(
      <section className="login-section vh-100" style={{backgroundColor:'#508bfc;'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius:'1rem;'}}>
          <div className="card-body p-5 text-center">
        
        <img
          src={Logo}
          height="70"
          alt="MDB Logo"
          loading="lazy"
        />
      
            <h3 className="mb-5">Kool Frenzy</h3>

            <form onSubmit={onSubmit}>
            <div className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" ref={emailRef}/>
              <label className="form-label" htmlFor="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" ref={passwordRef}/>
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>

            
                    {message !== ''&&<div className="alert alert-danger" role="alert">
                      {message}
                    </div>}

            <button className="btn btn-primary btn-lg btn-block" type="submit">Ingresar</button>
              </form>
            <hr className="my-4"/>

           

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    )
}