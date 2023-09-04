import {React, useState} from "react";
import {Headers} from "./Header";
import {Copyrights} from "./Copyright";
import {useLocation} from "react-router-dom";

export const DetailTraver = () => {
    /*extremos el objeto de la pizza seleccionada*/
    let {state} = useLocation();
    //todos los ingredientes seleccionados seleccionados
    const [fac, setFac] = useState({
        nombre: state.product.title,
        cantidad: 0,
        precio: 0,
        impuesto: 0,
        total: 0,
    });


    const procesarFactura = () => {

        //paso 1 obtenemos la cantidad de personas para el viaje
        let cantidadPersonas = document.getElementById("cantidad").value

        if (cantidadPersonas === 0 ||cantidadPersonas <= 0 || cantidadPersonas === "0"|| cantidadPersonas === "") {
            alert("para procesar la información debe ingresar la cantidad de personas para el viaje")
        }


        if (cantidadPersonas !== 0 && cantidadPersonas !== "0" &&cantidadPersonas !== "") {

            let precioAplicar ;

            state.product.prices.forEach(e => {
                if (e.quantity === parseInt(cantidadPersonas)) {
                    precioAplicar = e.price;
                    return;
                }
                if (parseInt(cantidadPersonas) >= 5  ) {
                    precioAplicar = state.product.prices.filter(e => e.quantity === 5).map(e => e.price)[0];
                    return;
                }
            });

            let fac = {
                nombre: state.product.title,
                cantidad: parseInt(cantidadPersonas),
                precio: precioAplicar,
                impuesto: state.product.impuesto,
                total: precioAplicar*cantidadPersonas,
            }

            let deduccionImpuesto = Number((((fac.impuesto)/100)*fac.precio).toFixed(2));
            let SumatoriaTotal = (deduccionImpuesto*cantidadPersonas)+(precioAplicar*cantidadPersonas);
            setFac(fac);

            document.getElementById("factura").innerHTML = `
        <h2>Destino: ${fac.nombre}</h2>
        <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="row"></th>
                <th scope="col">descripción</th>
                <th scope="col">precio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Destino seleccionado</td>
                <td>${fac.nombre} </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Costo de paquete por persona</td>
                <td>$${fac.precio}</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Costo de total de las ${cantidadPersonas} personas</td>
                <td>$${fac.precio} x ${cantidadPersonas} -> $${fac.precio*cantidadPersonas}</td>
            </tr>
             <tr>
                <th scope="row">4</th>
                <td>Cantidad de personas</td>
                <td>${cantidadPersonas}</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Impuestos</td>
                <td>${fac.impuesto}% -> $ ${deduccionImpuesto}</td>
            </tr>
            <tr>
                <th scope="row">6</th>
                <td>Impuesto Total</td>
                <td>$${deduccionImpuesto} x ${cantidadPersonas} -> $ ${Number(deduccionImpuesto*cantidadPersonas).toFixed(2)}</td>
            </tr>
            <tr>
                <th scope="row">7</th>
                <td>Precio Total</td>
                <td>$ ${SumatoriaTotal} </tr>
        </tbody>
    </table>`;
        }

    }
    console.log(fac)


    return (
        <>
            <Headers/>
            <br/><br/>
            <section className="m-1 ">
                <h1 className="mx-auto text-center">Viaje seleccionado</h1>
                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <div className="row">
                            <div className="col-6">
                                <img className="card mx-auto" width={300} height={500} src={state.product.urlImage}
                                     alt={state.product.title}/>
                            </div>
                            <div className="col-6">
                                <div className="card-body">
                                    <h5 className="card-title">{state.product.title}</h5>
                                    <p className="card-text">{state.product.descripcion}</p>
                                </div>

                                <div>
                                    <div className="form-group">
                                        <label htmlFor="" className={"text-grey"}>Seleccione cantidad de personas para
                                            el viaje: </label>
                                        <input type="number" className="form-control" name="cantidad" id="cantidad"
                                               required/>
                                    </div>

                                    <br/>
                                    <div className="row">
                                        <div className="col">
                                            <button type="submit"
                                                    className="btn btn-primary text-center mx-auto p-2 m-2 px-4"
                                                    onClick={procesarFactura}>Comprar
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <h2 className="mx-auto text-center">Factura:</h2>
                        <div className="factura" id="factura"></div>
                    </div>
                </div>

            </section>


            <Copyrights/>


        </>
    );
}