import { React, useState } from "react";
import { Headers } from "./Header";
import { Copyrights } from "./Copyright";
import { useLocation } from "react-router-dom";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export const Pizza = () => {
    /*extremos el objeto de la pizza seleccionada*/
    let { state } = useLocation();
    const animatedComponents = makeAnimated();

    const options = [
        { value: 'Champiñones', label: 'Champiñones' },
        { value: 'Albahaca', label: 'Albahaca' },
        { value: 'Piña', label: 'Piña' },
        { value: 'Pepperoni', label: 'Pepperoni' },
        { value: 'Jamón', label: 'Jamón' },
        { value: 'Pollo', label: 'Pollo' }
    ]
    //todos los ingredientes seleccionados seleccionados
    const [ingredientes, setIngredientes] = useState([]);
    //ingre
    const [ingreMasPrecio, setIngreMasPrecio] = useState([]);

    //objeto final para factura
    const [factura, setFactura] = useState(
        {
            nombre: "",
            pizza: state.product.title,
            precio: 0,
            ingredientes: [],
            adicional: "",
            total: 0,
        }


    );

    const onChange = (e) => {
        setIngredientes(e);
    }


    const onClickComprar = () => {
        //validar el numero de clientes seleccionados
        if (ingredientes.length === 0) {
            alert("Debe seleccionar al menos un ingrediente");
        }

        let cantidadIngredientes = ingredientes.length;

        //validar que la cantidad de ingredientes sea mayor a dos para que aplique la logica
        if (cantidadIngredientes > 2) {
            //validar el tipo de pizza selecciona
            let ingTmp = [];
            switch (state.product.id) {
                case 1: //caso pizza personal
                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];

                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 1 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.50 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.25 })
                        }
                    }

                    break;
                case 2: //caso pizza mediana
                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.00 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 1.00 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.50 })
                        }
                    }
                    break;
                case 3: //caso pizza grande

                    //iniciar a leer los datos desde el tercer ingrediente
                    for (let index = 2; index < ingredientes.length; index++) {
                        const element = ingredientes[index];
                        if ((cantidadIngredientes - 2) === 1) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.50 })
                        } else if ((cantidadIngredientes - 2) <= 2) {
                            ingTmp.push({ ingrediente: element.value, precio: 2.00 })
                        } else if ((cantidadIngredientes - 2) <= 3) {
                            ingTmp.push({ ingrediente: element.value, precio: 1.00 })
                        }

                        if ((cantidadIngredientes - 2) >= 4) {
                            ingTmp.push({ ingrediente: element.value, precio: 0.75 })
                        }
                    }
                    break;

                default:
                    break;
            }
            setIngreMasPrecio(ingTmp);
        }

    }

    const procesarFactura = () => {
        let nombre = document.getElementById("nombre")

        if (nombre.value === "") {
            alert("El nombre es un campo requerido")
        }

        let precioIndividual = ingredientes.length >2
            ? ingreMasPrecio[0].precio
            : 0;
        let tmpAdicional = (precioIndividual * ingreMasPrecio.length);
        let adicional = ingredientes.length >= 3
            ? ("( " + ingreMasPrecio[0].precio + " * " + ingreMasPrecio.length + " )" + " = $" + tmpAdicional)
            : "$0"

        let fac = {
            nombre: nombre.value,
            pizza: state.product.title,
            precio: state.product.price,
            ingredientes: ingredientes.map(e => e.label),
            adicional: adicional,
            total: state.product.price + tmpAdicional,
        }
        console.log(fac);
        document.getElementById("factura").innerHTML = `<h2>Cliente: ${fac.nombre}</h2><table class="table">
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
                <td>Pizza seleccionada</td>
                <td>${fac.pizza}, precio: $${fac.precio} </td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Total de ingredientes adicionales</td>
                <td>${ingreMasPrecio.length}</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Valor por cada ingrediente adicional</td>
                <td>$ ${precioIndividual}</td>
            </tr>
            <tr>
                <th scope="row">4</th>
                <td>Costo adicional</td>
                <td>${fac.adicional}</td>
            </tr>
            <tr>
                <th scope="row">5</th>
                <td>Total a cancelar</td>
                <td>$${fac.total}</td>
            </tr>
        </tbody>
    </table>`;

    }


    return (
        <>
            <Headers />
            <br /><br />
            <section className="m-1 ">
                <h1 className="mx-auto text-center">Pizza seleccionada</h1>
                <div className="container p-4 m-4">
                    <div className="card mb-3 p-3" key={state.product.id}>
                        <div className="row">
                            <div className="col-6">
                                <img className="card mx-auto" width={300} height={500} src={state.product.urlImage} alt={state.product.title} />
                            </div>
                            <div className="col-6">
                                <div className="card-body">
                                    <h5 className="card-title">{state.product.title}</h5>
                                    <p className="card-text">{state.product.descripcion}</p>
                                    <p className="card-text"><small className="text-muted">Precio ${state.product.price}</small></p>
                                </div>
                                {/* detalle de como quiere la pizza */}
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="">Seleccione minimo dos ingredientes para su pizza</label>
                                        <Select
                                            name="ingredientes"
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            required
                                            onChange={(choice) => onChange(choice)}
                                            options={options}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Nombre</label>
                                        <input type="text" className="form-control" name="nombre" id="nombre" required />
                                    </div>

                                    <br />
                                    <div className="row">
                                        <div className="col"><h2>Paso 1:</h2><button type="submit" className="btn btn-primary text-center mx-auto p-2 m-2 px-4" onClick={onClickComprar}>1. Calcular Total</button></div>
                                        <div className="col"><h2>Paso 2:</h2><button type="submit" className="btn btn-primary text-center mx-auto p-2 m-2 px-4" onClick={procesarFactura}>2. Comprar</button></div>
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


            <Copyrights />


        </>
    );
}