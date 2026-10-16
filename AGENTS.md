# AGENTS.md

Guía para agentes de IA (y personas) que trabajen en este repositorio.

## Descripción del proyecto

**GitQuiz** es un quiz interactivo de preguntas sobre **Git** para **principiantes**.
Se ejecuta íntegramente en el navegador (front-end puro), sin backend.

Comportamiento esperado:

- Se muestra **una pregunta cada vez**.
- Cada pregunta tiene **4 opciones** de respuesta, una sola correcta.
- Al responder:
  - La opción **correcta** se marca en **verde**.
  - Si el usuario falla, su opción se marca en **rojo**.
  - Se muestra una **explicación** de la respuesta correcta.
- Hay una **barra de progreso** de la pregunta actual.
- Al terminar aparece una **pantalla final** con la **puntuación** y un botón para **volver a empezar**.

## Estructura de archivos

| Archivo       | Responsabilidad                                                        |
|---------------|------------------------------------------------------------------------|
| `index.html`  | Estructura HTML5 semántica (un solo `<main>`, secciones, `<footer>`).   |
| `style.css`   | Todos los estilos. Tema **retro arcade años 80** (neón + CRT).          |
| `quiz.js`     | Datos del quiz: arreglo `quizData` con las 20 preguntas.                |
| `app.js`      | Lógica de la aplicación: render, validación, puntuación y reinicio.     |

Orden de carga en `index.html` (importante):

```html
<script src="quiz.js"></script>  <!-- primero: define quizData -->
<script src="app.js"></script>   <!-- después: usa quizData -->
```

## Reglas del proyecto (OBLIGATORIAS)

1. **Sin librerías ni frameworks.** Solo HTML5, CSS y JavaScript vanilla.
   Nada de jQuery, React, Vue, Bootstrap, Tailwind, fuentes externas, CDNs, etc.
2. **Sin módulos ES.** No usar `import`/`export` ni `type="module"`.
   Los scripts se comunican mediante variables globales (`quizData`).
3. **HTML5 semántico.** Usar etiquetas con significado: `<header>`, `<main>`,
   `<section>`, `<footer>`, `<h1>`/`<h2>`, etc.
4. **Botones reales.** Las opciones y acciones deben ser elementos `<button>`,
   nunca `<div>` ni `<a>` simulando botones.
5. **Todo comentado en español.** El código debe llevar comentarios claros en español.
6. **Textos de la interfaz en español.**
7. **Accesibilidad.** Mantener estados `:disabled`, foco y
   `prefers-reduced-motion` en el CSS.

## Formato de los datos (`quiz.js`)

Cada pregunta del arreglo `quizData` sigue esta estructura:

```js
{
    pregunta: "Enunciado de la pregunta",
    opciones: [ "A) ...", "B) ...", "C) ...", "D) ..." ], // exactamente 4
    correcta: 1,        // índice (0-3) de la opción correcta
    explicacion: "Por qué esa respuesta es la correcta."
}
```

Reglas de los datos:

- Exactamente **20 preguntas** (aunque el código soporta cualquier número).
- **4 opciones** por pregunta.
- `correcta` debe ser un índice entre **0 y 3**.
- Toda pregunta debe tener `explicacion` no vacía.
- Las preguntas van **numeradas** en el propio enunciado (`"1. ..."`, `"2. ..."`).

## Cómo ejecutar y probar

No hay build ni dependencias. Solo se necesita un servidor estático
(importante: abrir con `file://` puede fallar por restricciones del navegador).

```bash
cd /home/samael/Documentos/desarrollo_ia/pi/devquiz
python3 -m http.server 8080
```

Abrir en el navegador: <http://localhost:8080>

Si el puerto está ocupado:

```bash
python3 -m http.server 3000   # → http://localhost:3000
```

Comprobaciones rápidas:

```bash
# Comprobar sintaxis de los JS (si hay node instalado)
node --check quiz.js && node --check app.js

# Comprobar que las 20 preguntas son válidas
node -e "const fs=require('fs');const m={exports:{}};new Function('module','exports',fs.readFileSync('quiz.js','utf8')+'\n;module.exports=quizData;')(m,m.exports);m.exports.forEach((q,i)=>{if(q.opciones.length!==4)throw Error('P'+(i+1));if(q.correcta<0||q.correcta>3)throw Error('P'+(i+1));});console.log('OK',m.exports.length,'preguntas')"
```

## Arquitectura de `app.js`

- Estado: `actualIdx` (pregunta actual), `aciertos` (puntuación), `respondida` (bloqueo).
- `renderPregunta()` crea dinámicamente los 4 `<button class="opcion">`.
- `seleccionarOpcion(idx)` valida, colorea y muestra la explicación (una sola vez).
- `siguientePregunta()` avanza o llama a `mostrarResultado()`.
- `mostrarResultado()` pinta la puntuación y el botón de reinicio.
- `iniciarQuiz()` reinicia el estado y vuelve a empezar.

Clases CSS de estado: `.correcta` (verde) e `.incorrecta` (rojo).

## Flujo de trabajo con Git

- Repositorio remoto: `git@github.com:franmaurizpereira/Gitquiz_con_pi_ai.git`
- Rama principal: `main`.
- Antes de terminar una tarea, dejar el árbol limpio y subir los cambios:

```bash
git add .
git commit -m "descripción breve del cambio"
git push
```

## Estilo visual

Tema **retro arcade 1980** definido en `style.css`:

- Fondo oscuro con estrellas y degradado morado.
- Neones: cian, magenta, amarillo, verde y rojo.
- Efecto CRT: scanlines y parpadeo (`body::after`).
- Tipografía monoespaciada y textos en mayúsculas.
- Animaciones: latido del título, temblor al fallar, destello al acertar.

Mantener esta estética en cualquier cambio posterior.
