import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return(
        <>
        <div>Pagina no encontrada...<Link to="/"><button className="btn">Volver</button></Link></div>
        </>
    )
}