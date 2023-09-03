import './App.css';
import { HomePage } from './components/Home'
import React from "react";
import { Pizza } from './components/DetalleViaje';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
      <>
        {/* definimos las rutas de nuestro proyecto haciendo referencia al componente*/}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizza" element={<Pizza />} />
        </Routes>
      </>

  );
}

export default App;
