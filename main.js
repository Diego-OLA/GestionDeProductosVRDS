
import { actualizarPrevisualizacion } from "./previsualizacion.js";    
import { calcularProducto } from "./calcularProd.js";
import { addItem } from "./AgregarItem.js";
import {renderizarFilasInventario} from "./inventario/cargarInventario.js"
import { fmtMoney } from "./utils/formater.js";
import { fmtMoneyPreciso } from "./utils/formater.js";
import { fmtPct } from "./utils/formater.js";
import { agregarInventario } from "./inventario/agregarInventario.js";
import { agregarOptions } from "./productos/agregarFilaProducto.js";


    

  export const OZ_POR_LIBRA = 16;  
  export let productos = [];
  export let editandoId = null;
   


  // Referencias al DOM
  const form = document.getElementById("form-producto");
  const campoId = document.getElementById("producto-id");
  export const campoNombre = document.getElementById("campo-nombre");
  export const campoCantidad = document.getElementById("campo-cantidad");
  export const campoUnidad = document.getElementById("campo-unidad");
  export const campoCosto = document.getElementById("campo-costo");
  export const campoMargen = document.getElementById("campo-margen");

  const errorNombre = document.getElementById("error-nombre");
  const errorCantidad = document.getElementById("error-cantidad");
  const errorCosto = document.getElementById("error-costo");
  const errorMargen = document.getElementById("error-margen");

  
  const btnCancelar = document.getElementById("btn-cancelar");
  const btnEnviarTexto = document.getElementById("btn-enviar-texto");
  const formTitulo = document.getElementById("form-titulo");

  const resumenInvertido = document.getElementById("resumen-invertido");
  const resumenGanancia = document.getElementById("resumen-ganancia");
  const resumenMargen = document.getElementById("resumen-margen");
  const resumenMejor = document.getElementById("resumen-mejor");

  const tablaVacia = document.getElementById("tabla-vacia");
  const tablaContenedor = document.getElementById("tabla-contenedor");
  const tablaCuerpo = document.getElementById("tabla-cuerpo");
  const avisoBorrado = document.getElementById("aviso-borrado");

  function limpiarErrores() {
    [errorNombre, errorCantidad, errorCosto, errorMargen].forEach((el) => {
      el.hidden = true;
      el.textContent = "";
    });
    [campoNombre, campoCantidad, campoCosto, campoMargen].forEach((el) => el.removeAttribute("aria-invalid"));
  }

  function mostrarError(campo, mensaje) {
    const mapa = {
      nombre: [campoNombre, errorNombre],
      cantidad: [campoCantidad, errorCantidad],
      costo: [campoCosto, errorCosto],
      margen: [campoMargen, errorMargen],
    };
    const [input, error] = mapa[campo];
    input.setAttribute("aria-invalid", "true");
    error.hidden = false;
    error.textContent = mensaje;
  }

  export function validar() {
    limpiarErrores();
    let valido = true;

    if (!campoNombre.value.trim()) {
      mostrarError("nombre", "Escribe el nombre del producto.");
      valido = false;
    }
    const cantidad = parseFloat(campoCantidad.value);
    if (!(cantidad > 0)) {
      mostrarError("cantidad", "La cantidad debe ser mayor a 0.");
      valido = false;
    }
    const costoTotal = parseFloat(campoCosto.value);
    if (!(costoTotal > 0)) {
      mostrarError("costo", "El costo debe ser mayor a 0.");
      valido = false;
    }
    const margen = parseFloat(campoMargen.value);
    if (!(margen >= 0)) {
      mostrarError("margen", "El margen no puede ser negativo.");
      valido = false;
    }
    return valido;
  }

    actualizarPrevisualizacion()

  function limpiarFormulario() {
    campoId.value = "";
    campoNombre.value = "";
    campoCantidad.value = "";
    campoUnidad.value = "lb";
    campoCosto.value = "";
    campoMargen.value = "30";
    limpiarErrores();
    actualizarPrevisualizacion();
  }

  function entrarModoEdicion(producto) {
    editandoId = producto.id;
    campoId.value = producto.id;
    campoNombre.value = producto.nombre;
    campoCantidad.value = producto.cantidad;
    campoUnidad.value = producto.unidadCompra;
    campoCosto.value = producto.costoTotal;
    campoMargen.value = producto.margen;
    formTitulo.textContent = "Editar producto";
    btnEnviarTexto.textContent = "Guardar cambios";
    btnCancelar.hidden = false;
    limpiarErrores();
    actualizarPrevisualizacion();
    campoNombre.focus();
  }

  export function salirModoEdicion() {
    editandoId = null;
    formTitulo.textContent = "Agregar producto";
    btnEnviarTexto.textContent = "Agregar producto";
    btnCancelar.hidden = true;
    limpiarFormulario();
  }

  function renderizarResumen() {
    if (productos.length === 0) {
      resumenInvertido.textContent = fmtMoney(0);
      resumenGanancia.textContent = fmtMoney(0);
      resumenMargen.textContent = fmtPct(0);
      resumenMejor.textContent = "";
      return;
    }
    let totalInvertido = 0;
    let gananciaTotal = 0;
    let margenSuma = 0;
    let mejor = null;

    productos.forEach((p) => {
      const c = calcularProducto(p);
      totalInvertido += p.costoTotal;
      gananciaTotal += c.gananciaTotalEstimada;
      margenSuma += p.margen;
      if (!mejor || c.gananciaLb > mejor.gananciaLb) {
        mejor = { nombre: p.nombre, gananciaLb: c.gananciaLb };
      }
    });

    resumenInvertido.textContent = fmtMoney(totalInvertido);
    resumenGanancia.textContent = fmtMoney(gananciaTotal);
    resumenMargen.textContent = fmtPct(margenSuma / productos.length);
    resumenMejor.textContent = mejor ? "Mejor margen: " + mejor.nombre : "";
  }

  function crearFilaHTML(p, indice) {
    const c = calcularProducto(p);
    const margenBajo = p.margen < 15;
    const filaBg = indice % 2 === 0 ? "bg-white" : "bg-stone-50";
    const unidadTexto = p.unidadCompra === "lb" ? "libras" : "onzas";

    const alertaHTML = margenBajo
      ? '<span class="inline-flex items-center gap-1 text-amber-700" title="Margen bajo">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5" aria-hidden="true"><path d="M12 3 2 20h20L12 3Z" /><path d="M12 10v4M12 17h.01" /></svg>' +
        '<span class="sr-only">Margen bajo</span></span>'
      : "";

    return (
      '<tr class="' + filaBg + '" data-id="' + p.id + '">' +
        '<td class="px-4 py-3 align-top font-medium text-stone-900">' + escapeHTML(p.nombre) + "</td>" +
        '<td class="px-4 py-3 align-top font-mono text-stone-700">' + p.cantidad + " " + unidadTexto + " · " + fmtMoney(p.costoTotal) + "</td>" +
        '<td class="px-4 py-3 align-top">' +
          '<span class="inline-flex items-center gap-1 font-mono text-stone-700">' + fmtPct(p.margen) + " " + alertaHTML + "</span>" +
        "</td>" +
        '<td class="px-4 py-3 align-top font-mono text-stone-700">' +
          "<div>" + fmtMoneyPreciso(c.costoPorLb) + " / lb</div>" +
          '<div class="text-stone-500">' + fmtMoneyPreciso(c.costoPorOz) + " / oz</div>" +
        "</td>" +
        '<td class="px-4 py-3 align-top">' +
          '<div class="flex flex-col gap-1">' +
            '<span class="inline-block w-fit -rotate-2 rounded border border-dashed border-orange-700 bg-orange-700 px-2 py-0.5 font-mono text-xs font-semibold text-white">' + fmtMoneyPreciso(c.precioLb) + " / lb</span>" +
            '<span class="inline-block w-fit -rotate-2 rounded border border-dashed border-orange-700 bg-orange-700 px-2 py-0.5 font-mono text-xs font-semibold text-white">' + fmtMoneyPreciso(c.precioOz) + " / oz</span>" +
          "</div>" +
        "</td>" +
        '<td class="px-4 py-3 align-top font-mono text-emerald-800">' + fmtMoney(c.gananciaTotalEstimada) + "</td>" +
        '<td class="px-4 py-3 align-top">' +
          '<div class="flex items-center gap-1">' +
            '<button type="button" data-accion="editar" data-id="' + p.id + '" aria-label="Editar ' + escapeHTML(p.nombre) + '" ' +
              'class="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-600 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>' +
            "</button>" +
            '<button type="button" data-accion="eliminar" data-id="' + p.id + '" aria-label="Eliminar ' + escapeHTML(p.nombre) + '" ' +
              'class="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-700 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true"><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /><path d="M10 11v6M14 11v6" /></svg>' +
            "</button>" +
          "</div>" +
        "</td>" +
      "</tr>"
    );
  }



  function renderizarTabla() {
    if (productos.length === 0) {
      tablaVacia.hidden = false;
      tablaContenedor.hidden = true;
      tablaCuerpo.innerHTML = "";
      return;
    }
    tablaVacia.hidden = true;
    tablaContenedor.hidden = false;
    tablaCuerpo.innerHTML = productos.map((p, i) => crearFilaHTML(p, i)).join("");
  }

  export function renderizarTodo() {
    renderizarResumen();
    renderizarTabla();
    console.log(productos)
  }

  // Eventos de previsualización en vivo
  [campoCantidad, campoUnidad, campoCosto, campoMargen].forEach((el) => {
    el.addEventListener("input", actualizarPrevisualizacion);
    el.addEventListener("change", actualizarPrevisualizacion);
  });

let prodsMod = []
 export let inventarios = []

 export function setInventario(inv){

   inventarios.unshift(inv[0])
 }
  export function setInventarios(inv){

   inventarios = inv
 }

 

    async function guardado(){
      const p = {
        cantidad:parseFloat(campoCantidad.value),
        unidadCompra:parseFloat(campoUnidad.value),
        costoTotal:parseFloat(campoCosto.value),
        margen:campoMargen.value
      }
      const c = calcularProducto(p)
     const inventario  = {
          producto_id: campoNombre.value,
          unidad_compra: campoUnidad.value,
          cantidad_comprada: campoCantidad.value,
          costo_total: campoCosto.value,
          costo_libra: c.costoPorLb,
          costo_onza: c.costoPorOz,
          costo_unidad: c.costoUnidad,
          margen: campoMargen.value,
          precio_libra: c.precioLb,
          precio_onza: c.precioOz,
          precio_unidad: c.precioUnidad,
        
      }


     let newIn = await agregarInventario(inventario)
     setInventario(newIn)
     
  pruebaRender()
     
    }

   form.addEventListener("submit", function () {
    event.preventDefault();
     
     //addItem(productos)
     guardado()

     
   })

  function validarReturnAgregarProd(){
       if (prodsMod.length == 0 ){
        return
      }
      productos = prodsMod
  }




  btnCancelar.addEventListener("click", salirModoEdicion);

  // Delegación de eventos para editar / eliminar filas
  tablaCuerpo.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;
    const id = boton.getAttribute("data-id");
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    if (boton.getAttribute("data-accion") === "editar") {
      entrarModoEdicion(producto);
    } else if (boton.getAttribute("data-accion") === "eliminar") {
      productos = productos.filter((p) => p.id !== id);
      avisoBorrado.textContent = producto.nombre + " fue eliminado.";
      if (editandoId === id) salirModoEdicion();
      renderizarTodo();
      window.setTimeout(function () { avisoBorrado.textContent = ""; }, 2000);
    }
  });

  // Estado inicial
   actualizarPrevisualizacion()     
  //renderizarTodo();
 async function pruebaRender(){
    tablaCuerpo.innerHTML = await renderizarFilasInventario()
    tablaVacia.hidden = true;
    tablaContenedor.hidden = false;

  }

  pruebaRender()
  

  document.addEventListener('DOMContentLoaded',()=>{
      agregarOptions()
  })
  

