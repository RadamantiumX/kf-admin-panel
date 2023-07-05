import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Product() {
    const[product, setProduct]= useState({
        id: null,
        title: '',
        description:''
    });
    let{id}= useParams();

    if(id){
        useEffect(()=>{
            axiosClient.get(`/products/${id}`)
              .then(({data})=>{
                 setProduct(data)
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
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1">Titulo</label>
                    <input type="text" className="form-control"  value={product.title}/>                 
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Descripción</label>
                    <input type="text" className="form-control" id="exampleInputPassword1"  value={product.description}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Precio</label>
                    <input type="number" className="form-control" id="exampleInputPassword1"  value={product.price}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Categoría</label>
                    <select className="form-control" name="category" id="category" value={product.category}>
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