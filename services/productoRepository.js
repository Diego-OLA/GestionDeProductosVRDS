import { supabase } from "./supabaseCliente.js"
export async function obtenerDatos() {
  const { data, error } = await supabase
    .from('productos') 
    .select('*')                // '*' trae todas las columnas

  if (error) {
    console.error('Error al obtener datos:', error)
    return
  }

  console.log('Datos obtenidos:', data)
  return data
}

obtenerDatos()

export async function saveProducto(prod) {
  const { data, error } = await supabase
    .from('productos') 
    .insert(
      { 
        producto: prod, 
        
      }
    )
    .select() // Agregamos .select() para que devuelva el registro recién creado

  if (error) {
    console.error('Error al hacer POST:', error)
  } else {
    console.log('Registro creado con éxito:', data)
  }
  return data
}