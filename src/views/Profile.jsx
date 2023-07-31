import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Profile() {
  const[user, setUser] = useState([]);
  const getUser = ()=>{
    axiosClient.get('/user')
     .then(({data})=>{
      setUser(data);
      console.log(data);
     })
  }

  useEffect(()=>{
    getUser();
  },[])
    return(
      <>
      <div className="container card p-5">
  <h2 className="mt-2">Panel del Administrador</h2>
  <div className="panel panel-default">
    <div className="panel-heading">Nombre: <b>{user.name}</b></div>
    <div className="panel-body">Email de registro: {user.email}</div>
    <div className="panel-body">Creado el: {user.created_at}</div>
  </div>
</div>
      </>
    )
}