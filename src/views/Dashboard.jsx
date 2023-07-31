import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";


export default function Dashboard() {
    const [totalUsers, setTotalUsers]= useState([]);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [totalMessages, setTotalMessages] = useState([]);


    const getTotal = ()=>{
      axiosClient.get('/users')
       .then(({data})=>{
          setTotalUsers(data.meta.total)
       })

      axiosClient.get('customers')
       .then(({data})=>{
         setTotalCustomers(data.meta.total)
       })
       
       axiosClient.get('/messages')
        .then(({data})=>{
         setTotalMessages(data.meta.total);
        })
    }
    useEffect(()=>{
        getTotal();
    },[])

   return(
    <>
           <div className="container">

             <div className="card-container">
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Usuarios</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Usuarios</h6>
                       <p className="card-text data-text">{totalUsers}</p>
                      
                   </div>
               </div>

               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Clientes</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Clientes</h6>
                       <p className="card-text data-text">{totalCustomers}</p>
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Ventas</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Ingresos</h6>
                       <p className="card-text data-text">$ARS 22.000</p>
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Mensajes</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. de Mensajes</h6>
                       <p className="card-text data-text">{totalMessages}</p>
                       
                   </div>
               </div>
            </div>

           </div>
    </>
   )
}