const textoUsuario = document.getElementById("textarea-usuario");
const textoEncriptado = document.getElementById("texto-encriptado");
const areaTextoEncriptado = document.getElementById("area-texto-encriptado");
const alertas = document.getElementById("no-texto");
const muñeco = document.getElementById("muñeco");
const copiar = document.getElementById("botones-seccion2");

// Diccionario de encriptación
const encriptacion = {
  "e": "enter",
  "i": "imes",
  "a": "ai",
  "o": "ober",
  "u": "ufat"
};

// Función para encriptar el texto
function encriptar(texto = textoUsuario.value.toLowerCase()) {
  if (texto === "") {
    manejarInterfaz(false);
    return;
  }
  const resultado = texto.replace(/[eioua]/g, letra => encriptacion[letra]);
  manejarInterfaz(true, resultado);
}

// Función para desencriptar el texto
function desencriptar(texto = textoUsuario.value.toLowerCase()) {
  if (texto === "") {
    manejarInterfaz(false);
    return;
  }
  const resultado = texto
    .replace(/ufat|ober|ai|imes|enter/g, clave => Object.keys(encriptacion).find(key => encriptacion[key] === clave));
  manejarInterfaz(true, resultado);
}

// Función para manejar la visibilidad de los elementos de la interfaz
function manejarInterfaz(hayTexto, resultado = "") {
  areaTextoEncriptado.style.display = hayTexto ? "block" : "none";
  muñeco.style.display = hayTexto ? "none" : "";
  alertas.style.display = hayTexto ? "none" : "block";
  copiar.style.display = hayTexto ? "block" : "none";
  textoEncriptado.innerHTML = resultado;
}

// Función para limpiar el contenido
function limpiar() {
  textoUsuario.value = "";
  textoEncriptado.innerHTML = "";
  manejarInterfaz(false);
}

function botonCopiar() {
  navigator.clipboard.writeText(textoEncriptado.innerHTML)
    .then(() => {
      // Mostrar una notificación visual de éxito
      mostrarNotificacion("Texto copiado al portapapeles!");
    })
    .catch(err => {
      // Manejo de errores
      console.error("Error al copiar al portapapeles: ", err);
      mostrarNotificacion("Error al copiar el texto.");
    });
}

function mostrarNotificacion(mensaje) {
  // Crear una notificación visual, puedes personalizar esto según tu diseño
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion";
  notificacion.textContent = mensaje;
  document.body.appendChild(notificacion);

  // Estilos de la notificación
  setTimeout(() => {
    notificacion.style.opacity = 0;
    setTimeout(() => notificacion.remove(), 500); // Eliminar después de la animación
  }, 2000); // Mostrar durante 2 segundos
}

