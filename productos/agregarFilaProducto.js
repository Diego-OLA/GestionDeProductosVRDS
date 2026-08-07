import { obtenerDatos } from "../services/productoRepository.js"
import { productos } from "./obtenerProductos.js"

export function agregarFilaProducto(){
const divTabla = document.getElementById("tabla_div")
        divTabla.innerHTML = ""
        console.log(productos)
    for(let prod of productos){
        
        let newProd = document.createElement("p")
        newProd.textContent= prod.producto
        let divP = document.createElement("div")

    
        divTabla.appendChild(divP)
        

        divP.appendChild(newProd)
    }

    }

const inputProducto = document.getElementById("campo-nombre")

export async function agregarOptions(){

   const toOptions = await obtenerDatos()
    
   const prodsToOptions = toOptions.map(producto => {
      return  `<option value="${producto.id}"> ${producto.producto} </option>`
   }).join()

   inputProducto.innerHTML = prodsToOptions

}