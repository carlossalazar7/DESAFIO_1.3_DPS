import './App.css';
import { HomePage } from './components/Home'
import React from "react";
import { DetailTraver } from './components/DetalleViaje';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
      <>
        {/* definimos las rutas de nuestro proyecto haciendo referencia al componente*/}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/viaje" element={<DetailTraver />} />
        </Routes>
      </>

  );
}

export default App;
