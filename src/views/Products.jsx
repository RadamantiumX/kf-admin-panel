import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";




export default function Products() {
    const[products, setProducts] = useState([]);
    const[message, setMessage] = useState('');
    const[loading, setLoading] = useState(true)
    const[metaData, setMetaData] = useState([])
    
    const getProducts = (pageNumber = 1)=>{
        axiosClient.get(`/products?page=${pageNumber}`)
         .then(({data})=>{
            setProducts(data.data);
            setMetaData(data.meta)
            setLoading(false);

            console.log(data.meta)
         })
         .catch(err=>{
            const response  = err.response;
            console.log(response);
            setLoading(false);
         })
    }

    const deleteProduct=(p)=>{
      if(!window.confirm("Estas seguro de eliminar este registro?")){
        return
      }
      
      axiosClient.delete(`/products/${p.id}`)
       .then(()=>{
        setMessage('Producto Eliminado');
        getProducts();
        console.log(message);
       })
    }

    const onClose = () =>{
       setMessage('');
    }


    useEffect(()=>{
         getProducts();
    },[])

    return(
        <>
          <div className="m-5"> 
        <h1>Productos</h1>
        {loading&&<div>Cargando...</div>}
          {message.length !== 0&&<div className="alert alert-success" role="alert">
            {message} <button className="btn btn-info" onClick={onClose}>Cerrar</button>
          </div>}
        <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Titulo</th>
      <th scope="col">Precio</th>
      <th scope="col">Categoría</th>
      <th scope="col">Eliminar</th>
      <th scope="col">Modificar</th>
    </tr>
  </thead>
  {products.length ===0&&<h5>No hay productos para mostrar aun...</h5>}
  {products.length !== 0&&<tbody>
{products.map(p=>(
  <tr key={p.id}>
      <th scope="row">{p.id}</th>
      <td>{p.title}</td>
      <td>{p.price}</td>
      <td>{p.category}</td>
      <td><a href="#" onClick={ev=>deleteProduct(p)}><i className="fa-regular fa-trash-can"></i></a></td>
      <td><Link to={'/products/'+p.id}><i className="fa-solid fa-pen-to-square"></i></Link></td>
    </tr>
))}
    
   
  </tbody>}
<Pagination
  activePage={metaData.current_page}
  totalItemsCount={metaData.total}
  itemsCountPerPage={metaData.per_page}
  onChange={(pageNumber)=> getProducts(pageNumber)}
  itemClass="page-item"
  linkClass="page-link"
  firstPageText="Primera"
  lastPageText="Última"
/>
</table>

<Link to='/products/add' className="btn btn-success"><i className="fa-solid fa-plus me-3"></i>Agregar un nuevo producto</Link>
</div>
        </>
    )
}