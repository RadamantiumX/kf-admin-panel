import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Pagination from "react-js-pagination";

export default function Messages() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [metaData,setMetaData] = useState([]);

    const getMessages=(pageNumber=1)=>{
        axiosClient.get(`/messages?page=${pageNumber}`)
         .then(({data})=>{
            setLoading(false);
            setMessages(data.data);
            setMetaData(data.meta);
         })
    }

    const deleteMessage = (m)=>{
        if(!window.confirm("Estas seguro de eliminar este registro?")){
            return
          }
        axiosClient.delete(`/messages/${m.id}`)
         .then(()=>{
            getMessages()
            setMessage('Mensaje eliminado');
            console.log(message);
         })
    }

    useEffect(()=>{
         getMessages();
    },[])
    return (
        <>
           {messages.length ===0&&<h2>No hay mensajes nuevos aun...</h2>}
            {messages.length !== 0&&<div className="m-5">
                <h2>Mensajes</h2>
                 {loading&&<div>Cargando...</div>}
                {messages.map(m=>(
                    <div className="card mb-5" key={m.id}>
                    <div className="card-header">De: {m.name} | email: {m.email} <div className="ml-5">Creado el: {m.created_at}</div></div>
                    <div className="card-body">
                        <blockquote className=" mb-0">
                            <p>{m.message}</p>
                            <footer className=""><button onClick={ev=>deleteMessage(m)} className="btn btn-danger"><i className="fa-regular fa-trash-can"></i> Borrar</button></footer>
                        </blockquote>
                    </div>
                </div>
                ))}
                <Pagination
                  activePage={metaData.current_page}
                  totalItemsCount={metaData.total}
                  itemsCountPerPage={metaData.per_page}
                  onChange={(pageNumber)=> getMessages(pageNumber)}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="Primera"
                  lastPageText="Última"
                />
            </div>}
        </>
    )
}