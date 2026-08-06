import { saveProducto } from "../services/productoRepository.js"
import { setProducto } from "./obtenerProductos.js"
import { agregarFilaProducto } from "./agregarFilaProducto.js"
const inputProd = document.getElementById("input_producto")
const btnSave = document.getElementById("btn_agregar_prod")

async function agregarProducto(){
   
try{
    console.log(inputProd.value)
   let productoPersisted = await saveProducto(inputProd.value.trim())
    setProducto(productoPersisted);
     agregarFilaProducto()

}catch(error){
    console.error(error)
}

}

function validarInput(){
    if(inputProd.value.trim() ===  "") {
        return
    }else{
        btnSave.disabled = false
    }
}
validarInput()

inputProd.addEventListener("change",validarInput)

btnSave.addEventListener("click",agregarProducto)