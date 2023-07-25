import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { ContextProvider, useStateContext } from "../contexts/ContextProvider";

export default function AddProduct() {
    
    const [errors, setErrors] = useState(null);
    const [formu, setFormu] = useState(null);
    const [sizes, setSizes] = useState([]);
    


    const {setNotification} = useStateContext() 

    const titleRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const categoryRef = useRef();
    const publishedRef = useRef();
    const imageRef = useRef();
    const sizeRef = useRef();
    const genderRef = useRef();
   

   

    const onSubmit = (e) =>{
       e.preventDefault();
       
       
       const formData = new FormData();
       formData.append('title', titleRef.current.value);
       formData.append('description', descriptionRef.current.value);
       formData.append('price', priceRef.current.value);
       formData.append('image', imageRef.current.value);
       formData.append('category', categoryRef.current.value);
       formData.append('published', publishedRef.current.value);
       formData.append('size_mix', sizeRef.current.value);
       formData.append('gender',genderRef.current.value);

       axiosClient.post(`/products/`,formData)
        .then(()=>{
           setNotification('Producto cargado con exito...')
           
           formu.reset();//Form inputs clean
        })
        .catch(err =>{
            const response = err.response;
            if(response && response.status === 422){//El contenido enviado no coincide con lo que el servidor espera
              
              setErrors(response.data.errors);
            }
         })
    }
 useEffect(()=>{
    setFormu(document.getElementById('formu'));

    axiosClient.get('/mix-sizes/sizes') 
          .then(({data})=>{
             setSizes(data);
             
          })
          .catch(err =>{
            const response = err.response;
           console.log(response);
         })
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
      <label htmlFor="size_mix">Talles disponibles (Seleccione solo disponibilidad para este producto)</label>
      
      <select className="form-control" name="size_mix" id="size_mix" ref={sizeRef} required>
                         
                        <option value="A1">{sizes[0]}</option>
                        <option value="A2">{sizes[1]}</option>
                        <option value="A3">{sizes[2]}</option>
                        <option value="A4">{sizes[3]}</option>
                        <option value="A5">{sizes[4]}</option>
                        <option value="B1">{sizes[5]}</option>
                        <option value="B2">{sizes[6]}</option>
                        <option value="B3">{sizes[7]}</option>
                        <option value="B4">{sizes[8]}</option>
                        <option value="C1">{sizes[9]}</option>
                        <option value="C2">{sizes[10]}</option>
                        <option value="C3">{sizes[11]}</option>
                        <option value="D1">{sizes[12]}</option>
                        <option value="D2">{sizes[13]}</option>
                        <option value="E1">{sizes[14]}</option>
                        <option value="F1">{sizes[15]}</option>
                        <option value="F2">{sizes[16]}</option>
                        <option value="F3">{sizes[17]}</option>
                        <option value="G1">{sizes[18]}</option>
                        <option value="G2">{sizes[19]}</option>
                        <option value="H1">{sizes[20]}</option>
                        <option value="I1">{sizes[21]}</option>
                        <option value="I2">{sizes[22]}</option>
                        <option value="J1">{sizes[23]}</option>
                        <option value="All">{sizes[24]} (Todos los talles)</option>                              

                    </select>
    </div>

     <div className="form-group col-md-6">
      <label htmlFor="gender">Género</label>
      <select className="form-control" name="gender" id="gender" ref={genderRef} required>
                        
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option>
                        <option value="X">Unisex</option>                    
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