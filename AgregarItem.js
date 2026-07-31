import {validar,editandoId,productos,salirModoEdicion,renderizarTodo,campoNombre,campoCantidad,campoMargen,campoCosto,campoUnidad} from "./main.js"
// Envío del formulario

 

    

   export let contadorId = 0;
 function generarId() {
    contadorId += 1;
    return "producto-" + Date.now() + "-" + contadorId;
  }

export function addItem(){
      const datos = {
      nombre: campoNombre.value.trim(),
      cantidad: parseFloat(campoCantidad.value),
      unidadCompra: campoUnidad.value,
      costoTotal: parseFloat(campoCosto.value),
      margen: parseFloat(campoMargen.value),
    };  
    if (!validar()) return;

   

    if (editandoId) {
      productos = productos.map((p) => (p.id === editandoId ? Object.assign({ id: editandoId }, datos) : p));
    } else {
      productos.push(Object.assign({ id: generarId() }, datos));
    }
    console.log(datos)

    salirModoEdicion();
    renderizarTodo();
  };