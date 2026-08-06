import { OZ_POR_LIBRA } from "./main.js";
function aLibras(cantidad, unidad) {
    return unidad === "lb" ? cantidad : cantidad / OZ_POR_LIBRA;
  }
export function calcularProducto(p) {
    const cantidadLb = aLibras(p.cantidad, p.unidadCompra);
    const costoPorLb = cantidadLb > 0 ? p.costoTotal / cantidadLb : 0;
    const costoPorOz = costoPorLb / OZ_POR_LIBRA;
    const costoUnidad = p.costo_total_ / p.cantidad_comprada
    const precioLb = costoPorLb * (1 + p.margen / 100);
    const precioOz = costoPorOz * (1 + p.margen / 100);
     const precioUnidad = costoUnidad * (1 + p.margen / 100);
    const gananciaLb = precioLb - costoPorLb;
    const gananciaOz = precioOz - costoPorOz;
    const gananciaTotalEstimada = gananciaLb * cantidadLb;
    return { cantidadLb, costoPorLb, costoPorOz,costoUnidad,precioUnidad, precioLb, precioOz, gananciaLb, gananciaOz, gananciaTotalEstimada };
  }