const previsualizacionC = document.getElementById("previsualizacion");
import { campoCantidad,campoMargen,campoUnidad,campoCosto } from "./main.js";
import { calcularProducto } from "./calcularProd.js";
import { fmtMoney,fmtMoneyPreciso } from "./main.js";

export function actualizarPrevisualizacion() {
    const cantidad = parseFloat(campoCantidad.value);
    const costoTotal = parseFloat(campoCosto.value);
    const margen = parseFloat(campoMargen.value);
    const unidad = campoUnidad.value; 

    if (!(cantidad > 0) || !(costoTotal > 0) || !Number.isFinite(margen)) {
      previsualizacion.innerHTML =
        '<span class="text-stone-500">Completa cantidad, costo y margen para ver el cálculo del costo y precio por libra y onza.</span>';
      return;
    }

    const c = calcularProducto({ cantidad, unidadCompra: unidad, costoTotal, margen });
    const unidadTexto = unidad === "lb" ? "libras" : "onzas";

    previsualizacion.innerHTML =
      '<div class="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-stone-800">' +
      '<span>Comprado: <strong>' + campoCantidad.value + " " + unidadTexto + "</strong></span>" +
      "<span>Costo/lb: <strong>" + fmtMoneyPreciso(c.costoPorLb) + "</strong></span>" +
      "<span>Costo/oz: <strong>" + fmtMoneyPreciso(c.costoPorOz) + "</strong></span>" +
      "<span>Precio sugerido/lb: <strong>" + fmtMoneyPreciso(c.precioLb) + "</strong></span>" +
      "<span>Precio sugerido/oz: <strong>" + fmtMoneyPreciso(c.precioOz) + "</strong></span>" +
      "</div>";
  }
