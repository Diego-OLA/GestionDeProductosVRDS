import { supabase } from "./supabaseCliente.js"
export async function saveInventario(inventario) {
    const {data, error} = await supabase.from('inventario').insert([
       {producto_id: inventario.producto_id,
        unidad_compra: inventario.unidad_compra ,
        cantidad_comprada: inventario.cantidad_comprada,
        costo_total: inventario.costo_total,
        costo_libra: inventario.costo_libra,
        costo_onza: inventario.costo_onza,
        costo_unidad: inventario.costo_unidad,
        costo_total:inventario.costo_total,
        margen: inventario.margen,
        precio_libra: inventario.precio_libra,
        precio_onza: inventario.precio_onza,
        precio_unidad: inventario.precio_unidad,} 
    ]).select()

    
  if (error) {
    console.error('Error al obtener datos:', error)
    return
  }

    return data
    
}

export async function obtenerInventario() {
    const {data, error} = await supabase.from('inventario_productos').select('*')

    
  if (error) {
    console.error('Error al obtener datos:', error)
    return
  }
  console.table(data)
    return data
    
}
obtenerInventario()