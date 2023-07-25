import React, { useEffect } from "react";
import './Sidebar.css';
import Logo from '../assets/img/logo.png';
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Link,Navigate } from "react-router-dom";

export default function Sidebar() {
   const{user,token,notification,setUser,setToken}= useStateContext();
   
   const onLogout=(ev)=>{
     ev.preventDefault();
     axiosClient.post('/logout')
       .then(()=>{
        setUser({});
        setToken(null);
       })
   }
   useEffect(()=>{
     axiosClient.get('/user')
       .then(({data})=>{
        setUser(data);
       })
   },[])

    return(
        <>
       
<header>
  {/* SideBar */}
  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-light">
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4">
      <Link to="/users"> 
        <a
          href="#"
          className="list-group-item list-group-item-action py-2 ripple"
          aria-current="true"
        >
          <i className="fa-solid fa-users me-3"></i><span>Usuarios</span>
        </a>
        </Link> 
       
       <Link to="/customers">
        <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <i className="fa-solid fa-briefcase me-3"></i><span>Clientes</span>
        </a>
        </Link>

        <Link to="/messages">
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fa-solid fa-envelope me-3"></i><span>Mensajes</span>
          </a>
        </Link>

        <Link to="/metrics">
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-line fa-fw me-3"></i><span>Metricas</span>
          </a>
       </Link>

        <Link to="/products">
        <a href="#" className="list-group-item list-group-item-action py-2 ripple">
        <i className="fa-solid fa-shirt me-3"></i><span>Productos</span>
        </a>
        </Link>
         
         <Link to="/orders">
        <a href="#" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Pedidos</span>
          </a>
          </Link>

        
      </div>
    </div>
  </nav>
  

 {/* NavBar */}
  <nav id="main-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
   
    <div className="container-fluid">
      
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>

     
     {/* Logo */}
     <Link to="/">
      <a className="navbar-brand" href="#">
        <img
          src={Logo}
          height="45"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
      </Link>
      
      <form className="d-none d-md-flex input-group w-auto my-auto">
        <input
          autocomplete="off"
          type="search"
          className="form-control rounded"
          placeholder='Buscar'
          style={{minWidth:'225px'}}
        />
        <span className="input-group-text border-0"><i className="fas fa-search"></i></span>
      </form>

     
      <ul className="navbar-nav ms-auto d-flex flex-row">
        
        <li className="nav-item dropdown">
          <a
            className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-bell"></i>
            <span className="badge rounded-pill badge-notification bg-danger">1</span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">Some news</a>
            </li>
            <li>
              <a className="dropdown-item" href="#">Another news</a>
            </li>
            <li>
              <a className="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </li>

        
       

       
        
        
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <div>{user.name}</div>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <Link to="/profile"><a className="dropdown-item" href="#">Perfil</a></Link>
            </li>
            <li>
              <a className="dropdown-item" href="#">Configuración</a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={onLogout}>Logout</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
   
  </nav>
 
</header>



<main style={{marginTop:'58px'}}>
  <div className="container pt-4"></div>
</main>

        </>
    )
}