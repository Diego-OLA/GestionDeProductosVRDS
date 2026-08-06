import { saveInventario } from "../services/inventarioRepository.js"
import { inventarios } from "../main.js"
export async function agregarInventario(inventario){
    try {
        let inventarioPersisted = await saveInventario(inventario)

        console.log(inventarioPersisted)

      return inventarioPersisted

    } catch (error) {
        console.error
    }

}