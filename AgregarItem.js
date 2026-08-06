import {validar,editandoId,productos,salirModoEdicion,renderizarTodo,campoNombre,campoCantidad,campoMargen,campoCosto,campoUnidad} from "./main.js"
// Envío del formulario

 

    

   export let contadorId = 0;
 function generarId() {
    contadorId += 1;
    return "producto-" + Date.now() + "-" + contadorId;
  }

export function addItem(productosArr){
      const datos = {
      nombre: campoNombre.value.trim(),
      cantidad: parseFloat(campoCantidad.value),
      unidadCompra: campoUnidad.value,
      costoTotal: parseFloat(campoCosto.value),
      margen: parseFloat(campoMargen.value),
    };  
   
    if (!validar()) return;

   

    if (editandoId) {
      const producto = productos.find((p)=>p.id ===editandoId);

      if (producto){
        Object.assign(producto,datos )
      }
    
      
    } else {
      productosArr.push(Object.assign({ id: generarId() }, datos));
    }
    console.log(productosArr)

    salirModoEdicion();
    renderizarTodo();
    
  };