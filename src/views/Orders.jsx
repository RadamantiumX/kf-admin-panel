import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";




export default function Orders() {
   const [loading, setLoading] = useState(true);
   const [message, setMessage] = useState('');
   const [orders, setOrders] = useState([]);
   const [metaData, setMetaData]= useState([]); 
 

const getOrders=(pageNumber=1)=>{
  axiosClient.get(`/orders?page=${pageNumber}`)
   .then(({data})=>{
      setOrders(data.data);
      setMetaData(data.meta);
      setLoading(false);
   })
   .catch(err=>{
    const response  = err.response;
    console.log(response);
    setLoading(false);
 })
}



const onClose = ()=>{
    setMessage('')
}

useEffect(()=>{
    getOrders();
    
},[])

    return(
       
            <>
          <div className="m-5"> 
        <h1>Pedidos</h1>
        {loading&&<div>Cargando...</div>}
          {message.length !== 0&&<div className="alert alert-success" role="alert">
            {message} <button className="btn btn-info" onClick={onClose}>Cerrar</button>
          </div>}
          {orders.length === 0 &&<h5>No hay pedidos para mostrar...</h5>}
       {orders.length !== 0 && <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Status</th>
      <th scope="col">Total</th>
      <th scope="col">Cant.</th>
      <th scope="col">Id. Cliente</th>
      <th scope="col">Creado el (fecha y hora)</th>
      <th scope="col">Ver</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  {orders.length ===0&&<h5>No hay pedidos aun</h5>}
  {orders.length !==0&&<tbody>
{orders.map(o=>(
  
 
  <tr key={o.id}>
      <th scope="row">{o.id}</th>
      <td>{o.status}</td>
      <td>{o.total_price}</td>
      <td>{o.number_of_items}</td>
      <td><Link to={'/customers/'+o.customer.id}><i className="fa-solid fa-eye me-2" ></i>{o.customer.id}</Link></td>
      <td>{o.created_at}</td>   
      <td><Link to={'/orders/'+o.id}><i className="fa-solid fa-eye"></i></Link></td>
      <td><a href="#"><i className="fa-regular fa-trash-can"></i></a></td>
    </tr>
   
))}
    
   
  </tbody>}
<Pagination
  activePage={metaData.current_page}
  totalItemsCount={metaData.total}
  itemsCountPerPage={metaData.per_page}
  onChange={(pageNumber)=> getOrders(pageNumber)}
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