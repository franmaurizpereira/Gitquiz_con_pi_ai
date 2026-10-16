// GitQuiz - Aplicación Principal (app.js)
// Gestiona la interacción del usuario con el quiz de Git

// Referencias a elementos del DOM
const preguntaEl = document.getElementById('pregunta');
const opcionesEl = document.querySelectorAll('.opcion'); // NodeList en vivo
const progresoEl = document.getElementById('progreso');
const barraProgresoEl = document.getElementById('barra-progreso');
const siguienteBtn = document.getElementById('siguiente');
const container = document.querySelector('.container');

// Importar las preguntas desde quiz.js
// Esto asume que quiz.js exporta la variable quizData
// Si no hay módulos, las variables globales estarán disponibles
import { quizData } from './quiz.js';

// Estado del quiz
let actualIdx = 0;
let aciertos = 0;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', iniciarQuiz);

/**
 * Inicia o reinicia el quiz
 * - Reinicia los índices y puntuación
 * - Carga la primera pregunta
 * - Configura los event listeners
 */
function iniciarQuiz() {
    actualIdx = 0;
    aciertos = 0;

    // Ocultar cualquier resultado anterior y mostrar sección del quiz
    const resultadoActual = document.querySelector('.resultado-final');
    if (resultadoActual) {
        resultadoActual.remove();
    }

    // Habilitar todas las opciones
    opcionesEl.forEach(op => {
        op.disabled = false;
        op.classList.remove('correcta', 'incorrecta');
        op.style.backgroundColor = '';
    });

    cargarPregunta();
    siguienteBtn.textContent = 'Responder';
}

/**
 * Carga la pregunta actual en la interfaz de usuario
 * - Actualiza el texto de la pregunta
 * - Configura las opciones con sus eventos
 * - Actualiza la barra de progreso
 */
function cargarPregunta() {
    const actual = quizData[actualIdx];

    // Mostrar la pregunta
    if (preguntaEl) {
        preguntaEl.textContent = actual.pregunta;
    }

    // Configurar las opciones
    opcionesEl.forEach((opcion, idx) => {
        // Establecer el texto de la opción
        if (opcion) {
            opcion.textContent = actual.opciones[idx];
        }

        // Resetear clases y estilos (para empezar limpios)
        opcion.classList.remove('correcta', 'incorrecta');
        opcion.style.backgroundColor = '';
        opcion.style.color = ''; // Resetear color de texto

        // Agregar evento de clic (solo si no ya está agregado)
        opcion.replaceWith(opcion.cloneNode(true)); // Truco para resetear event listeners
        const nuevaOpcion = document.querySelectorAll('.opcion')[idx];
        nuevaOpcion.addEventListener('click', verificarRespuesta);
    });

    // Actualizar la barra de progreso
    actualizarProgreso();
}

/**
 * Actualiza la barra de progreso visual y el texto
 * @param {number} idx - Índice actual de la pregunta (0-based)
 */
function actualizarProgreso() {
    if (progresoEl && barraProgresoEl) {
        const porcentaje = ((actualIdx + 1) / quizData.length) * 100;
        barraProgresoEl.style.width = `${porcentaje}%`;
        progresoEl.textContent = `${actualIdx + 1} de ${quizData.length}`;
    }
}

/**
 * Verifica la respuesta seleccionada por el usuario
 * @param {Event} e - Evento de clic
 */
function verificarRespuesta(e) {
    const seleccionado = e.target;
    const idx = Array.from(opcionesEl).indexOf(seleccionado);
    
    const actual = quizData[actualIdx];

    // Deshabilitar todas las opciones para evitar múltiples clics
    opcionesEl.forEach(op => op.disabled = true);

    // Resetear color de fondo anterior en todas
    opcionesEl.forEach(op => {
        op.style.backgroundColor = '';
    });

    if (idx === actual.correcta) {
        // === RESPUESTA CORRECTA ===
        seleccionado.classList.add('correcta');
        seleccionado.style.backgroundColor = '#d4edda'; // Verde muy claro
        seleccionado.style.color = '#155724';
        aciertos++;
    } else {
        // === RESPUESTA INCORRECTA ===
        seleccionado.classList.add('incorrecta');
        seleccionado.style.backgroundColor = '#f8d7da'; // Rojo muy claro
        seleccionado.style.color = '#721c24';

        // Resaltar la respuesta correcta en verde
        opcionesEl.forEach(op => {
            const opIdx = Array.from(opcionesEl).indexOf(op);
            if (opIdx === actual.correcta) {
                op.classList.add('correcta');
                op.style.backgroundColor = '#d4edda';
                op.style.color = '#155724';
            }
        });
    }

    // Cambiar texto del botón a "Siguiente pregunta"
    if (siguienteBtn) {
        siguienteBtn.textContent = 'Siguiente pregunta';
    }
}

/**
 * Navega a la siguiente pregunta o muestra la pantalla final
 */
function siguientePregunta() {
    if (actualIdx < quizData.length - 1) {
        actualIdx++;
        cargarPregunta();
        siguienteBtn.textContent = 'Responder';
        
        // Re-habilitar opciones para la próxima pregunta (ya resetearon sus clases)
        opcionesEl.forEach(op => {
            op.disabled = false;
            op.classList.remove('correcta', 'incorrecta');
            op.style.backgroundColor = '';
            op.style.color = '';
        });
    } else {
        // Mostrar pantalla de resultados finales
        mostrarResultado();
    }
}

/**
 * Muestra la pantalla final con la puntuación
 */
function mostrarResultado() {
    const porcentaje = ((aciertos / quizData.length) * 100).toFixed(1);
    
    const resultadoHTML = `
        <div class="resultado-final">
            <h2>¡Quiz completado!</h2>
            <p>Obtuviste <strong>${aciertos}</strong> de <strong>${quizData.length}</strong> correctas</p>
            <p>Porcentaje: <strong>${porcentaje}%</strong></p>
            <a href="#" id="reiniciarBtn" class="btn-reiniciar">Jugar de nuevo</a>
        </div>
    `;

    // Insertar el resultado en el container
    if (container) {
        container.insertAdjacentHTML('beforeend', resultadoHTML);
    }

    // Agregar evento al botón de reiniciar
    const nuevoReiniciar = document.getElementById('reiniciarBtn');
    if (nuevoReiniciar) {
        nuevoReiniciar.addEventListener('click', (e) => {
            e.preventDefault();
            iniciarQuiz();
        });
    }
}

// Event listeners para la navegación
if (siguienteBtn) {
    siguienteBtn.addEventListener('click', () => {
        // Verificar si ya respondió (tiene clase correcta/incorrecta)
        const opcionesSeleccionadas = document.querySelector('.opcion.correcta, .opcion.incorrecta');
        if (opcionesSeleccionadas) {
            // Ya respondió, ir a siguiente pregunta
            siguientePregunta();
        } else {
            // Todno no responde, verificar esta vez
            verificarRespuesta({ target: document.querySelector('.opcion:checked') || event.target });
        }
    });
}