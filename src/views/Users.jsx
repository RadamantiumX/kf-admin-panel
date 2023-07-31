import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Pagination from "react-js-pagination";

export default function Users() {
     
  const [users, setUsers] = useState([]);
  const[metaData, setMetaData] = useState([]);

  const {setTotalUsers}= useStateContext();


  const getUsers=(pageNumber=1)=>{
    axiosClient.get(`/users?page=${pageNumber}`)
     .then(({data})=>{
      setUsers(data.data);
      setMetaData(data.meta);
      setTotalUsers(data.meta.total);
      console.log(data.meta.total)
     })
     .catch(err=>{
        const response  = err.response;
        console.log(response);
     })
  }
useEffect(()=>{
  getUsers()
},[])
    return(
        <>
        <h1 className="mt-5">Usuarios</h1>
        <div className="card table-responsive m-2 ">
        <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nombre</th>
      <th scope="col">Email</th>
      
      <th scope="col"></th>
    </tr>
  </thead>
  {users.length ===0&&<h5>No hay usuarios para mostrar aun...</h5>}
  {users.length !==0&&<tbody>
{users.map(u=>(
  <tr key={u.id}>
      <th scope="row">{u.id}</th>
      <td>{u.name}</td>
      <td>{u.email}</td>
      
      <td><i className="fa-regular fa-trash-can"></i></td>
    </tr>
))}
    
   <Pagination
      activePage={metaData.current_page}
      totalItemsCount={metaData.total}
      itemsCountPerPage={metaData.per_page}
      onChange={(pageNumber)=> getUsers(pageNumber)}
      itemClass="page-item"
      linkClass="page-link"
      firstPageText="Primera"
      lastPageText="Última"
   />
  </tbody>}
</table>
</div>
        </>
    )
}