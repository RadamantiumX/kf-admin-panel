import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";


export default function Customers() {
    const[loading, setLoading] = useState(true);
    const[message, setMessage] = useState('');
    const[customers, setCustomers] = useState([]);
    const[metaData,setMetaData] = useState([]);

    const getCustomers=(pageNumber=1)=>{
        axiosClient.get(`/customers?page=${pageNumber}`)
         .then(({data})=>{
            setLoading(false);
            setCustomers(data.data);
            setMetaData(data.meta)
         })
    }

    const deleteCustomer = (c) =>{
      if(!window.confirm("Estas seguro de eliminar este registro?")){
        return
      }
      axiosClient.delete(`/customers/${c.id}`)
       .then(()=>{
        setMessage('Cliente Eliminado');
        getCustomers();
        console.log(message);
       })
    }

   
    useEffect(()=>{
        getCustomers()
    },[])
    return(
        <>
          <div className="m-5"> 
        <h1>Clientes</h1>
        {loading&&<div>Cargando...</div>}
        {customers.length === 0&&<div>No hay registros...</div>}
        {customers.length !== 0&&<table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Primer Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">email</th>
      <th scope="col">Tel.</th>
      <th scope="col">Registrado el</th>
      <th scope="col">Borrar</th>
      <th scope="col">Ver</th>
    </tr>
  </thead>
  {customers.length===0&&<h5>No hay clientes para mostrar aun...</h5>}
  {customers.length !==0&&<tbody>
{customers.map(c=>(
  <tr key={c.id}>
      <th scope="row">{c.id}</th>
      <td>{c.first_name}</td>
      <td>{c.last_name}</td>
      <td>{c.email}</td>
      <td>{c.phone}</td>
      <td>{c.created_at}</td>
      <td><a href="#" onClick={ev=>deleteCustomer(c)}><i className="fa-regular fa-trash-can"></i></a></td>
      <td><Link to={'/customers/'+c.id}><i className="fa-solid fa-eye"></i></Link></td>
    </tr>
))}
    
   
  </tbody>}
  <Pagination
    activePage={metaData.current_page}
    totalItemsCount={metaData.total}
    itemsCountPerPage={metaData.per_page}
    onChange={(pageNumber)=> getCustomers(pageNumber)}
    itemClass="page-item"
    linkClass="page-link"
    firstPageText="Primera"
    lastPageText="Última"
  />
</table>}
</div>
        </>
    )
}