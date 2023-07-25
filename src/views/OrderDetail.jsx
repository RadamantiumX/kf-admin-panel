import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

export default function OrderDetail() {
    const [order, setOrder] = useState({
        items:[],
        customer:{
            shippingAddress:{},
            billingAddress:{}
        },
        
    });

    const [orderStatuses, setOrderStatuses] = useState([]);
    const {setNotification} = useStateContext();
    const statusRef = useRef();

    let{id}= useParams();

    const updateStatus=(e)=>{
       e.preventDefault();

       

        axiosClient.post(`/orders/change-status/${order.id}/${statusRef.current.value}`)
         .then(()=>{
           setNotification('Status modificado con exito')
         })
    }


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
             console.log(data);
          }) 
    
        },[])

   
}



    return(
        <>
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <form onSubmit={updateStatus}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cambiar el Status del pedido</h5>
                <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

               
                  <select  name="status" id="status" ref={statusRef}>              
                    <option value="cancelado">{orderStatuses[2]}</option>
                    <option value="enviado">{orderStatuses[3]}</option>
                    <option value="completado">{orderStatuses[4]}</option>
                  </select>
                 
                
              </div>
              <div className="modal-footer">
                
                <button type="submit" className="btn btn-primary">Guardar los cambios</button>
              </div>
            </div>
            </form>
            
          </div>
        </div>
        {/* Modal */}



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
                    <p className="text-muted"><a href="#"  data-mdb-toggle="modal" data-mdb-target="#exampleModal"><i className="fa-solid fa-pen-to-square me-2"></i></a>{order.status}</p>
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