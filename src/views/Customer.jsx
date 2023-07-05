import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function Customer() {
     const [customer, setCustomer] = useState({
        shippingAddress:{},
        billingAddress:{}
     });

     const[response, setResponse]=useState(false);

     let {id} = useParams();

     if(id){
        useEffect(()=>{
           axiosClient.get(`/customers/${id}`)
            .then(({data})=>{
                setCustomer(data);
                setResponse(false);
                console.log(data);
            })
            .catch(err=>{
                setResponse(true)
                const response = err.response;
                console.log(response)
               
              })
        },[])
     }

    return(
        <>
        <div>
          {response&&<div className="message-box-section mt-5"><h5>Este usuario no se registro como cliente aún...</h5></div>}
        {!response &&<section className="vh-100" style={{backgroundColor:'#f4f5f7;'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-6 mb-4 mb-lg-0">
        <div className="card mb-3" style={{borderRadius:'.5rem;'}}>
          <div className="row g-0">
           
            <div className="col-md-8">
              <div className="card-body p-4">
                <h6>Perfil del cliente Nº {customer.id}</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                <div className="col-6 mb-3">
                    <h6>Nombre</h6>
                    <p className="text-muted">{customer.first_name}</p>
                  </div> 
                  <div className="col-6 mb-3">
                    <h6>Apellido</h6>
                    <p className="text-muted">{customer.last_name}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Email</h6>
                    <p className="text-muted">{customer.email}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Telefono</h6>
                    <p className="text-muted">{customer.phone}</p>
                  </div>
                </div>
                <h6>Datos de envio</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Direccion 1</h6>
                    <p className="text-muted">{customer.shippingAddress.address1}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Dirección 2</h6>
                    <p className="text-muted">{customer.shippingAddress.address2}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Localidad</h6>
                    <p className="text-muted">{customer.shippingAddress.city}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Estado o Provincia</h6>
                    <p className="text-muted">{customer.shippingAddress.state}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Cod. Postal</h6>
                    <p className="text-muted">{customer.shippingAddress.zipcode}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>País</h6>
                    <p className="text-muted">{customer.shippingAddress.country_code}</p>
                  </div>
                </div>

                <h6>Datos de facturación</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Dirección 1</h6>
                    <p className="text-muted">{customer.billingAddress.address1}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Dirección 2</h6>
                    <p className="text-muted">{customer.billingAddress.address2}</p>
                  </div>

                  <div className="col-6 mb-3">
                    <h6>Localidad</h6>
                    <p className="text-muted">{customer.billingAddress.city}</p>
                  </div>
                  
                  <div className="col-6 mb-3">
                    <h6>Estado o provincia</h6>
                    <p className="text-muted">{customer.billingAddress.state}</p>
                  </div>

                  <div className="col-6 mb-3">
                    <h6>Código postal</h6>
                    <p className="text-muted">{customer.billingAddress.zipcode}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>País</h6>
                    <p className="text-muted">{customer.billingAddress.country_code}</p>
                  </div>
                </div>
               
                
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>}
        </div>
        </>
    )
}