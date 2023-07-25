import React from "react";

export default function Dashboard() {
   return(
    <>
           <div className="container">

             <div className="card-container">
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Usuarios</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Usuarios</h6>
                       <p className="card-text data-text">125</p>
                      
                   </div>
               </div>

               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Clientes</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Clientes</h6>
                       <p className="card-text data-text">22</p>
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Ventas</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Ventas</h6>
                       <p className="card-text data-text">$ARS 22.000</p>
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Mensajes</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. de Mensajes</h6>
                       <p className="card-text data-text">21</p>
                       
                   </div>
               </div>
            </div>

           </div>
    </>
   )
}