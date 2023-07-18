import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Product() {
    
    const navigate = useNavigate();

    const[product, setProduct]= useState({
        id: null,
        title: '',
        description:'',
        price:null,
        image:'',
        category:'',

    });

    const {setNotification} = useStateContext();
    let{id}= useParams();

    const updateProduct=(e)=>{
        e.preventDefault();

        axiosClient.put(`/products/${product.id}`,product)
         .then(()=>{
            setNotification('Producto modificado');
            navigate('/products');
         })
    }

    if(id){
        useEffect(()=>{
            axiosClient.get(`/products/${id}`)
              .then(({data})=>{
                 setProduct(data);
                 console.log(data)
              })
              .catch(err=>{
                const response = err.response;
                console.log(response)
              })
        },[])
    }
    return(
        <>
          <div className="form-product-box m-5">
            <img className="img-fluid mb-5" src={product.image} alt="imagen del producto Kool Frenzy" />
            <form onSubmit={updateProduct}>
                <div className="form-group">
                    <label htmlFor="title">Titulo</label>
                    <input type="text" className="form-control" id="title"  value={product.title} onChange={ev=>setProduct({...product, title: ev.target.value})}/>                 
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input type="text" className="form-control" id="description"  value={product.description} onChange={ev=>setProduct({...product, description: ev.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input type="number" className="form-control" id="price"  value={product.price} onChange={ev=>setProduct({...product, price:ev.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">Nueva URL para la imagen</label>
                    <input type="text" className="form-control" id="imageURL" onChange={ev=>setProduct({...product,image:ev.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <select className="form-control" name="category" id="category" value={product.category} onChange={ev=>setProduct({...product,category:ev.target.value})}>
                        <option value="volvo">Remera</option>
                        <option value="saab">Buzo</option>          
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary mt-2">Guardar Cambios</button>
            </form>
            
            </div>
        </>
    )
}