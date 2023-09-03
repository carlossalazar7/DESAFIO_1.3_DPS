import React from "react";
import { Link } from "react-router-dom";


export const MenuPrincipal = ({ menu }) => {

    return (
        <>
            <section className="menu" id="menu">
                <div className="heading">
                    <span>OPCIONES</span>
                    <h2>Planifica tu proximo viaje</h2>
                </div>
                <div className="menu-container">

                    {menu.map(product => (
                        <div className="box" key={product.id}>
                            <div className="box-img">
                                <img src={product.urlImage} alt={product.title} />
                            </div>
                            <h2>{product.title}</h2>
                            <h3>{product.descripcion}</h3>
                            <span>${product.price}</span>
                            {/*al dar click en una pizza pasara a una nueva pestaña con el detalle de la pizza*/}
                            <Link className='bx bx-cart-alt' to="/pizza"
                                  state={{  product }} >Comprar</Link>
                        </div>

                    ))}

                </div>
            </section>


        </>
    );
}