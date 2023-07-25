import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Product() {
    
    const navigate = useNavigate();
    const [sizes, setSizes] = useState([]);

    const[product, setProduct]= useState({
        id: null,
        title: '',
        description:'',
        price:null,
        image:'',
        category:'',
        size_mix:'',
        gender:''

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

              axiosClient.get('/mix-sizes/sizes') 
          .then(({data})=>{
             setSizes(data);
             
          })
          .catch(err =>{
            const response = err.response;
           console.log(response);
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
                    <input type="number" className="form-control" id="price"  value={product.price} onChange={ev=>setProduct({...product, price:ev.target.value})} min="1"/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageURL">Nueva URL para la imagen</label>
                    <input type="text" className="form-control" id="imageURL" onChange={ev=>setProduct({...product,image:ev.target.value})} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <select className="form-control" name="category" id="category" value={product.category} onChange={ev=>setProduct({...product,category:ev.target.value})}>
                        <option value="remera">Remera</option>
                        <option value="buzo">Buzo</option>          
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Talles disponibles</label>
                    <select className="form-control" name="size_mix" id="size_mix" value={product.size_mix} onChange={ev=>setProduct({...product,size_mix:ev.target.value})}>
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

                <div className="form-group">
                    <label htmlFor="category">Género</label>
                    <select className="form-control" name="gender" id="gender" value={product.gender} onChange={ev=>setProduct({...product,gender:ev.target.value})}>
                        <option value="H">Hombre</option>
                        <option value="M">Mujer</option> 
                        <option value="X">Unisex</option>           
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary mt-2">Guardar Cambios</button>
            </form>
            
            </div>
        </>
    )
}