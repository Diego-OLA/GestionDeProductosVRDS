import {obtenerDatos} from "../services/productoRepository.js"
import { agregarFilaProducto } from "./agregarFilaProducto.js"
 export let productos = [] 
async function getProds() {
  
    productos = await obtenerDatos()

    agregarFilaProducto()
    

   
}
export function setProducto(p){
    productos.unshift(p[0])
   
    
}
getProds()


