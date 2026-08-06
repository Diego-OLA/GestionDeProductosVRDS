import { obtenerInventario } from "../services/inventarioRepository.js";
import { fmtMoney, fmtMoneyPreciso,fmtPct} from "../utils/formater.js";
import { inventarios, setInventarios } from "../main.js";
  


  export async function renderizarFilasInventario() {
     let inventariosGot = await obtenerInventario()

     setInventarios(inventariosGot)
  return inventarios.map(inventario => {
    
    //const item = Array.isArray(inventario) ? inventario[0] : inventario;

    console.log(inventarios)

    return `
      <tr class="bg-white" data-id="${inventario.id}">
        <td class="px-4 py-3 align-top font-medium text-stone-900">${escapeHTML(inventario.producto)}</td>
        <td class="px-4 py-3 align-top font-mono text-stone-700">
          ${inventario.cantidad_comprada} ${escapeHTML(inventario.unidad_compra)} ·${fmtMoney(inventario.costo_total)}
        </td>
        <td class="px-4 py-3 align-top">
          <span class="inline-flex items-center gap-1 font-mono text-stone-700">${fmtPct(inventario.margen)}</span>
        </td>
        <td class="px-4 py-3 align-top font-mono text-stone-700">
          <div>${fmtMoneyPreciso(inventario.costo_libra)} / lb</div>
          <div class="text-stone-500">${fmtMoneyPreciso(inventario.costo_onza)} / oz</div>
        </td>
        <td class="px-4 py-3 align-top">
          <div class="flex flex-col gap-1">
            <span class="inline-block w-fit -rotate-2 rounded border border-dashed border-orange-700 bg-orange-700 px-2 py-0.5 font-mono text-xs font-semibold text-white">
              ${fmtMoneyPreciso(inventario.precio_libra)} / lb
            </span>
            <span class="inline-block w-fit -rotate-2 rounded border border-dashed border-orange-700 bg-orange-700 px-2 py-0.5 font-mono text-xs font-semibold text-white">
              ${fmtMoneyPreciso(inventario.precio_unidad)} / oz
            </span>
          </div>
        </td>
        <td class="px-4 py-3 align-top font-mono text-emerald-800">${fmtMoney(inventario.precio_onza)}</td>
        <td class="px-4 py-3 align-top">
          <div class="flex items-center gap-1">
            <button type="button" data-accion="editar" data-id="${inventario.id}" aria-label="Editar ${escapeHTML(inventario.producto)}"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-600 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
            </button>
            <button type="button" data-accion="eliminar" data-id="${inventario.id}" aria-label="Eliminar ${escapeHTML(inventario.producto)}"
              class="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /><path d="M10 11v6M14 11v6" /></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
   


  function escapeHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }