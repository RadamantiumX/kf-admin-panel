import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";



export default function Dashboard() {
    const [totalUsers, setTotalUsers]= useState([]);
    const [totalCustomers, setTotalCustomers] = useState([]);
    const [totalProducts, setTotalProducts] = useState([]);
    const [totalIncome, setTotalIncome] = useState(null);


    const getTotal = ()=>{
      axiosClient.get('/users')
       .then(({data})=>{
          setTotalUsers(data.meta.total)
       })

      axiosClient.get('customers')
       .then(({data})=>{
         setTotalCustomers(data.meta.total)
       })
       
     axiosClient.get('/orders')
       .then(({data})=>{
        //Hacemos la suma con los valores de la columna "total_price"
          data.data.reduce((total,item)=>{
            if(item.status === 'pagado'){//Solo tomamos los valores de "status" que esten como "pagado"
                const totalPrice = parseFloat(item.total_price);
                setTotalIncome(total + totalPrice);
            }
          },0)
         
       })
       .catch(err=>{
        const response  = err.response;
        console.log(response);
        
     })

        axiosClient.get('/products')
         .then(({data})=>{
            setTotalProducts(data.meta.total);
            console.log(data)
         })
    }
    useEffect(()=>{
        getTotal();
    },[])

   return(
    <>
           <div className="container">

             <div className="card-container">
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Usuarios</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Usuarios</h6>
                       <p className="card-text data-text">{totalUsers}</p>
                      
                   </div>
               </div>

               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Clientes</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. Clientes</h6>
                       <p className="card-text data-text">{totalCustomers}</p>
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Ventas</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Ingresos</h6>
                       {totalIncome!==null&&<p className="card-text data-text">$ARS {totalIncome}</p>}
                       {totalIncome===null&&<p className="card-text data-text">$ARS 0</p>}
                       
                   </div>
               </div>
               <div className="card m-2" style={{ width: "18rem;" }}>
                   <div className="card-body">
                       <h5 className="card-title">Productos</h5>
                       <h6 className="card-subtitle mb-2 text-muted">Total Cant. de Productos</h6>
                       <p className="card-text data-text">{totalProducts}</p>
                       
                   </div>
               </div>
            </div>

           </div>
    </>
   )
}