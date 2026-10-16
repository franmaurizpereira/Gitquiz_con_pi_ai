// ============================================================
// GitQuiz - Lógica principal de la aplicación (app.js)
// Depende de: quiz.js (define la variable global quizData)
// Sin módulos ES ni librerías externas.
// ============================================================

// --- Referencias a los elementos del DOM ---
let preguntaEl = document.getElementById('pregunta');
let opcionesEl = document.getElementById('opciones');
let explicacionEl = document.getElementById('explicacion');
let progresoEl = document.getElementById('progreso');
let barraProgresoEl = document.getElementById('barra-progreso');
let siguienteBtn = document.getElementById('siguiente');
const quizSection = document.getElementById('quiz-section');

// --- Estado del quiz ---
let actualIdx = 0;      // Índice de la pregunta actual (0-based)
let aciertos = 0;       // Contador de respuestas correctas
let respondida = false; // ¿Ya se respondió la pregunta actual?

// ============================================================
// Función: iniciarQuiz
// Reinicia el estado y vuelve a pintar la primera pregunta.
// ============================================================
function iniciarQuiz() {
    actualIdx = 0;
    aciertos = 0;
    respondida = false;

    // Nos aseguramos de que la sección del quiz esté visible
    // (por si venimos de la pantalla de resultados).
    quizSection.hidden = false;

    // Reconstruimos la estructura interna por si fue reemplazada
    // al mostrar la pantalla final.
    if (!document.getElementById('pregunta')) {
        reconstruirEstructura();
    }

    renderPregunta();
}

// ============================================================
// Función: reconstruirEstructura
// Vuelve a crear el HTML interno del quiz tras la pantalla final.
// ============================================================
function reconstruirEstructura() {
    quizSection.innerHTML = `
        <div class="progreso">
            <span id="progreso">1 de ${quizData.length}</span>
            <div class="barra-progreso">
                <div class="progreso-actual" id="barra-progreso"></div>
            </div>
        </div>
        <h2 class="pregunta" id="pregunta"></h2>
        <div class="opciones" id="opciones"></div>
        <p class="explicacion" id="explicacion" hidden></p>
        <button class="btn-siguiente" id="siguiente" disabled>Responder</button>
    `;

    // Reasignamos las referencias a los nuevos nodos
    preguntaEl = document.getElementById('pregunta');
    opcionesEl = document.getElementById('opciones');
    explicacionEl = document.getElementById('explicacion');
    progresoEl = document.getElementById('progreso');
    barraProgresoEl = document.getElementById('barra-progreso');
    siguienteBtn = document.getElementById('siguiente');

    // Reasignamos el listener del botón siguiente
    siguienteBtn.addEventListener('click', siguientePregunta);
}

// ============================================================
// Función: renderPregunta
// Pinta la pregunta actual, sus 4 opciones y la barra de progreso.
// ============================================================
function renderPregunta() {
    const actual = quizData[actualIdx];
    respondida = false;

    // 1) Enunciado
    preguntaEl.textContent = actual.pregunta;

    // 2) Opciones: creamos un <button> real por cada opción
    opcionesEl.innerHTML = '';
    actual.opciones.forEach((texto, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'opcion';
        btn.textContent = texto;
        btn.dataset.idx = idx;
        btn.addEventListener('click', () => seleccionarOpcion(idx));
        opcionesEl.appendChild(btn);
    });

    // 3) Explicación oculta hasta responder
    explicacionEl.hidden = true;
    explicacionEl.textContent = '';

    // 4) Botón siguiente deshabilitado hasta responder
    siguienteBtn.disabled = true;
    siguienteBtn.textContent =
        actualIdx === quizData.length - 1 ? 'Ver resultados' : 'Responder';

    // 5) Barra de progreso
    actualizarProgreso();
}

// ============================================================
// Función: actualizarProgreso
// Actualiza el ancho de la barra y el texto "X de N".
// ============================================================
function actualizarProgreso() {
    const total = quizData.length;
    const porcentaje = ((actualIdx + 1) / total) * 100;
    barraProgresoEl.style.width = porcentaje + '%';
    progresoEl.textContent = (actualIdx + 1) + ' de ' + total;
}

// ============================================================
// Función: seleccionarOpcion
// Comprueba la respuesta, colorea acierto/fallo y muestra la
// explicación. Solo permite responder una vez por pregunta.
// ============================================================
function seleccionarOpcion(idxElegido) {
    if (respondida) return; // Evita doble respuesta
    respondida = true;

    const actual = quizData[actualIdx];
    const botones = opcionesEl.querySelectorAll('.opcion');

    // Recorremos los botones para colorearlos
    botones.forEach((btn) => {
        const idx = Number(btn.dataset.idx);
        btn.disabled = true; // Bloquea clics posteriores

        if (idx === actual.correcta) {
            // La correcta SIEMPRE se marca en verde
            btn.classList.add('correcta');
        }
        if (idx === idxElegido && idx !== actual.correcta) {
            // La elegida por el usuario, si es errónea, en rojo
            btn.classList.add('incorrecta');
        }
    });

    // Sumamos acierto si procede
    if (idxElegido === actual.correcta) {
        aciertos++;
    }

    // Mostramos la explicación
    explicacionEl.textContent = actual.explicacion;
    explicacionEl.hidden = false;

    // Habilitamos el avance
    siguienteBtn.disabled = false;
}

// ============================================================
// Función: siguientePregunta
// Avanza a la siguiente pregunta o muestra el resultado final.
// ============================================================
function siguientePregunta() {
    if (!respondida) return; // No avanza sin responder

    if (actualIdx < quizData.length - 1) {
        actualIdx++;
        renderPregunta();
    } else {
        mostrarResultado();
    }
}

// ============================================================
// Función: mostrarResultado
// Sustituye el quiz por la pantalla final con la puntuación.
// ============================================================
function mostrarResultado() {
    const total = quizData.length;
    const porcentaje = Math.round((aciertos / total) * 100);

    // Mensaje según el porcentaje obtenido
    let mensaje;
    if (porcentaje === 100) {
        mensaje = '¡PERFECTO! Dominas Git como un auténtico senior.';
    } else if (porcentaje >= 70) {
        mensaje = '¡Buen trabajo! Tienes una base sólida de Git.';
    } else if (porcentaje >= 40) {
        mensaje = 'Vas por buen camino, sigue practicando.';
    } else {
        mensaje = 'Toca repasar la documentación de Git. ¡Ánimo!';
    }

    quizSection.innerHTML = `
        <div class="resultado-final">
            <h2>GAME OVER</h2>
            <p class="marcador">PUNTUACIÓN: ${aciertos} / ${total}</p>
            <p class="marcador">PRECISIÓN: ${porcentaje}%</p>
            <p class="mensaje-final">${mensaje}</p>
            <button class="btn-reiniciar" id="reiniciar">INSERT COIN - JUGAR DE NUEVO</button>
        </div>
    `;

    // El botón de reinicio inicia todo de nuevo
    document.getElementById('reiniciar').addEventListener('click', iniciarQuiz);
}

// ============================================================
// Arranque: cuando el DOM esté listo, configuramos y pintamos.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    siguienteBtn.addEventListener('click', siguientePregunta);
    iniciarQuiz();
});
