import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

export default function AddProduct() {
    //const[message, setMessage] = useState('');
    const [errors, setErrors] = useState(null);
    const [formu, setFormu] = useState(null);
    


    const {setNotification} = useStateContext() 

    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const categoryRef = useRef();
    const publishedRef = useRef();
    const imageRef = useRef();
   

   

    const onSubmit = (e) =>{
       e.preventDefault();
       
       
       const formData = new FormData();
       formData.append('title', titleRef.current.value);
       formData.append('description', descriptionRef.current.value);
       formData.append('price', priceRef.current.value);
       formData.append('image', imageRef.current.value);
       formData.append('category', categoryRef.current.value);
       formData.append('published', publishedRef.current.value);

       axiosClient.post(`/products/`,formData)
        .then(()=>{
           setNotification('Producto cargado con exito...')
           console.log(categoryRef);
           formu.reset();//Form inputs clean
        })
        .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){//El contenido enviado no coincide con lo que el servidor espera
              console.log(response.data.errors);
              setErrors(response.data.errors);
            }
         })
    }
 useEffect(()=>{
    setFormu(document.getElementById('formu'));
 },[])

    return(
        <>
        <div className="m-5">
            <h2>Nuevo Producto</h2>
        <form onSubmit={onSubmit} id="formu">
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="title">Titulo del producto</label>
      <input type="text" className="form-control" id="title" placeholder="Título" ref={titleRef}/>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="description">Descripción</label>
      <input type="text" className="form-control" id="description" placeholder="Descripción" ref={descriptionRef}/>
    </div>
  </div>
  <div className="form-group col-md-6">
    <label htmlFor="precio">Precio</label>
    <input type="number" className="form-control" id="precio" placeholder="Precio $ARS" ref={priceRef}/>
  </div>
  <div className="form-group col-md-6">
    <label htmlFor="imagen">URL de la imagen</label>
    <input type="text" className="form-control" id="imagen"  ref={imageRef} placeholder="Pegar la URL del producto"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="category">Categoría (Seleccione una opción)</label>
      
      <select className="form-control" name="category" id="category" ref={categoryRef} required>
                         
                        <option value="remera">Remera</option>
                        <option value="buzo">Buzo</option>          
                    </select>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="category">Publicar? (Seleccione Si o No)</label>
      <select className="form-control" name="published" id="published" ref={publishedRef} required>
                        
                        <option value="1">Si</option>
                        <option value="0">No</option>          
                    </select>
    </div>
    
  </div>
  
  <button type="submit" className="btn btn-primary mt-5">Guardar</button>
 {errors&&<div className="alert alert-danger" role="alert">
  {errors}
</div>}
</form>
        </div>
        </>
    )
}