import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function OrderDetail() {
    const [order, setOrder] = useState({
        items:[],
        customer:{
            shippingAddress:{},
            billingAddress:{}
        },
        
    });

    const [orderStatuses, setOrderStatuses] = useState([]);

    let{id}= useParams();


    if(id){
     useEffect(()=>{
             
        axiosClient.get(`/orders/${id}`)
        .then(({data})=>{
            setOrder(data)
            console.log(data);
            console.log(data.items[0].product);
        })
        .catch(err=>{
            
            const response = err.response;
            console.log(response)
           
          })

        axiosClient.get(`/orders/statuses`) 
          .then(({data})=>{
             setOrderStatuses(data);
          }) 
    
        },[])

   
}



    return(
        <>
        <section className="vh-100" style={{backgroundColor:'#f4f5f7;'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-6 mb-4 mb-lg-0">
        <div className="card mb-3" style={{borderRadius:'.5rem;'}}>
          <div className="row g-0">
           
            <div className="col-md-8">
              <div className="card-body p-4">
                <h6>Pedido Nº {order.id}</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                <div className="col-6 mb-3">
                    <h6>Status</h6>
                    <p className="text-muted">{order.status}</p>
                  </div> 
                  <div className="col-6 mb-3">
                    <h6>Total</h6>
                    <p className="text-muted">{order.total_price}</p>
                  </div>
                  
                </div>
                <h6>Datos del comprador</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Nombre y Apellido</h6>
                    <p className="text-muted">{order.customer.first_name}  {order.customer.last_name}</p>

                  </div>
                  <div className="col-6 mb-3">
                    <h6>Email</h6>
                    <p className="text-muted">{order.customer.email}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Telefono</h6>
                    <p className="text-muted">{order.customer.phone}</p>
                  </div>
                  
                </div>

                <h6>Detalle de la compra</h6>
                <hr className="mt-0 mb-4"/>
                
                  
                  {order.items.map(i=>(
                    <div className="unit-product row pt-1" key={i.id}>
                      <div className="col-6 mb-3"><h6>Imagen</h6><img className="img-order-detail" src={i.product.image} alt="Product Kf" /></div>
                      <div className="col-6 mb-3"><h6>Prod.</h6><p className="text-muted">{i.product.title.slice(0,10)} - Id. Nº {i.id}</p></div>
                      <div className="col-6 mb-3"><h6>Cant.</h6><p className="text-muted">{i.quantity}</p></div>
                      <div className="col-6 mb-3"><h6>Prec. Unit.</h6><p className="text-muted">{i.unit_price}</p></div>
                       
                       
                    </div>
                    ))}

                  
                

                <h6>Detalle de la entrega</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Dirección 1</h6>
                    <p className="text-muted">{order.customer.shippingAddress.address1}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Dirección 2</h6>
                    <p className="text-muted">{order.customer.shippingAddress.address2}</p>
                  </div>

                  <div className="col-6 mb-3">
                    <h6>Localidad</h6>
                    <p className="text-muted">{order.customer.shippingAddress.city}</p>
                  </div>
                  
                  <div className="col-6 mb-3">
                    <h6>Estado o provincia</h6>
                    <p className="text-muted">{order.customer.shippingAddress.state}</p>
                  </div>

                  <div className="col-6 mb-3">
                    <h6>Código postal</h6>
                    <p className="text-muted">{order.customer.shippingAddress.zipcode}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>País</h6>
                    <p className="text-muted">{order.customer.shippingAddress.country}</p>
                  </div>
                </div>
               
                
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )
}