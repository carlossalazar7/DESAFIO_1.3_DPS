import React from "react";
import {Headers} from "./Header";
import {MenuPrincipal} from "./Viajes";
import {Copyrights} from "./Copyright";
import {data} from "../data/data"

export const HomePage = () => {

    return (

        <>
            <Headers/>
            <section className="home" id="home">
                <div className="home-text">
                    <h1>Travel World</h1>
                    <h2>Acércate a nuestra sucursal en Galerías o San Benito y planifica<br/>
                        tu próximo viaje </h2>
                    <p className="btn">Ver viajes disponibles</p>
                </div>
                <div className="home-img">
                    <img
                        src="https://www.entornoturistico.com/wp-content/uploads/2020/09/agencia-de-viajes-1280x720.jpg"
                        alt=""/>
                </div>
            </section>
            <MenuPrincipal menu={data}/>

            <Copyrights/>

        </>
    );
}