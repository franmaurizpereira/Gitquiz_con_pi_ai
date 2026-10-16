// GitQuiz - Preguntas sobre Git para principiantes
// Cada pregunta tiene 4 opciones, la correcta y una explicación

// Arreglo de preguntas del quiz
const quizData = [
    {
        pregunta: "1. ¿Qué comando se usa para inicializar un repositorio Git?",
        opciones: [
            "A) git start",
            "B) git init",
            "C) git create",
            "D) git new"
        ],
        correcta: 1, // Índice de la opción correcta (0-based)
        explicacion: "El comando `git init` crea un nuevo repositorio Git vacío en el directorio actual. Es el primer paso para empezar a versionar un proyecto."
    },
    {
        pregunta: "2. ¿Cómo se añaden archivos al área de staging (stage) en Git?",
        opciones: [
            "A) git add *",
            "B) git stage all",
            "C) git add .",
            "D) Ambos A y C son válidos"
        ],
        correcta: 2,
        explicacion: "El comando `git add .` añade todos los archivos del directorio actual al staging. `git add *` también funciona en muchos casos, pero `git add .` es más predecible al incluir archivos ocultos."
    },
    {
        pregunta: "3. ¿Qué comando confirma los cambios en el repositorio local?",
        opciones: [
            "A) git save",
            "B) git commit -m \"mensaje\"",
            "C) git store",
            "D) git push"
        ],
        correcta: 1,
        explicacion: "El comando `git commit -m \"mensaje\"` guarda los cambios del staging area en el repositorio local con un mensaje descriptivo. Es fundamental para el versionado."
    },
    {
        pregunta: "4. ¿Cómo se muestra el historial de commits en Git?",
        opciones: [
            "A) git history",
            "B) git log",
            "C) git show",
            "D) git list"
        ],
        correcta: 1,
        explicacion: "El comando `git log` muestra el historial de commits del repositorio. Con variantes como `git log --oneline` o `git log --graph` se puede personalizar la salida."
    },
    {
        pregunta: "5. ¿Cómo se crea una nueva rama en Git?",
        opciones: [
            "A) git new branch",
            "B) git rama",
            "C) git branch nombre-rama",
            "D) git create-branch"
        ],
        correcta: 2,
        explicacion: "El comando `git branch nombre-rama` crea una nueva rama con el nombre especificado. Por defecto, Git empieza en la rama 'master' o 'main'."
    },
    {
        pregunta: "6. ¿Cómo se cambia de una rama a otra en Git?",
        opciones: [
            "A) git switch rama",
            "B) git change rama",
            "C) git checkout nombre-rama",
            "D) Ambos A y C son válidos"
        ],
        correcta: 3,
        explicacion: "Tanto `git checkout nombre-rama` como `git switch rama` sirven para cambiar de rama. En versiones modernas de Git, `git switch` es el método recomendado y más seguro."
    },
    {
        pregunta: "7. ¿Qué comando fusiona dos ramas en Git?",
        opciones: [
            "A) git merge",
            "B) git join",
            "C) git combine",
            "D) git unite"
        ],
        correcta: 0,
        explicacion: "El comando `git merge` fusiona el historial de la rama especificada con la rama actual. Es esencial para integrar cambios de diferentes características o versiones."
    },
    {
        pregunta: "8. ¿Cómo se envían los commits locales al repositorio remoto?",
        opciones: [
            "A) git send remote",
            "B) git upload",
            "C) git push",
            "D) git transfer"
        ],
        correcta: 2,
        explicacion: "El comando `git push` sube los commits locales al repositorio remoto (generalmente origin). Es cómo se comparte el trabajo con otros colaboradores."
    },
    {
        pregunta: "9. ¿Cómo se obtienen los cambios más recientes del repositorio remoto?",
        opciones: [
            "A) git get remote",
            "B) git download",
            "C) git pull",
            "D) git fetch"
        ],
        correcta: 2,
        explicacion: "El comando `git pull` descarga e integra cambios del repositorio remoto a la rama local. Es una combinación de `git fetch` + `git merge`."
    },
    {
        pregunta: "10. ¿Qué hace el comando `git status`?",
        opciones: [
            "A) Muestra el historial de commits",
            "B) Muestra el estado actual del repositorio (archivos modificados, staged, etc.)",
            "C) Muestra la configuración de Git",
            "D) Muestra solo los archivos nuevos"
        ],
        correcta: 1,
        explicacion: "`git status` es uno de los comandos más utilizados en el día a día. Muestra qué archivos están modificados, cuáles están en el staging area y cuáles aún no están siendo seguidos por Git."
    },
    {
        pregunta: "11. ¿Cómo se descarta un archivo del staging area y se devuelve al directorio de trabajo?",
        opciones: [
            "A) git remove archivo",
            "B) git checkout -- archivo",
            "C) git unstage archivo",
            "D) Ambos B y C son válidos"
        ],
        correcta: 3,
        explicacion: "Ambos comandos funcionan: `git checkout -- archivo` descarta los cambios del archivo, y `git reset HEAD archivo` lo quita del staging. En versiones modernas, `git restore --staged archivo` es la opción recomendada."
    },
    {
        pregunta: "12. ¿Qué es un 'conflict' o conflicto en Git?",
        opciones: [
            "A) Cuando dos personas cometen el mismo error de escritura",
            "B) Cuando Git no puede fusionar automáticamente los cambios de dos ramas",
            "C) Cuando se ejecuta el comando merge sin argumentos",
            "D) Cuando hay conflictos de nombre de ramas"
        ],
        correcta: 1,
        explicacion: "Un conflicto ocurre cuando Git detecta cambios contradictorios en el mismo archivo de dos ramas diferentes y no puede decidir cuál mantener. Requiere intervención manual para resolverlo."
    },
    {
        pregunta: "13. ¿Cómo se ve el diff (diferencias) de un archivo en Git?",
        opciones: [
            "A) git diff archivo",
            "B) git show archivo",
            "C) git compare",
            "D) git changes"
        ],
        correcta: 0,
        explicacion: "El comando `git diff` muestra las diferencias entre el archivo working directory y el staging area, o entre commits. Es esencial para revisar qué cambios se van a cometer antes de hacer commit."
    },
    {
        pregunta: "14. ¿Cómo se renombra un archivo en Git mientras se conserva el historial?",
        opciones: [
            "A) git rename archivo nuevo-nombre",
            "B) git mv archivo nuevo-nombre",
            "C) git change nombre",
            "D) Git no puede renombrar archivos"
        ],
        correcta: 1,
        explicacion: "El comando `git mv` es en realidad un alias de `mv` seguido de `git add`. Mueve o renombra archivos y los añade automáticamente al staging, manteniendo el historial."
    },
    {
        pregunta: "15. ¿Cómo se elimina un archivo del seguimiento de Git sin borrarlo del disco?",
        opciones: [
            "A) git delete archivo",
            "B) git rm --cached archivo",
            "C) git remove archivo",
            "D) git ignore archivo"
        ],
        correcta: 1,
        explicacion: "El comando `git rm --cached` elimina el archivo del repositorio Git (lo deja de seguir) pero lo conserva en el sistema de archivos local. Sin `--cached`, también borra el archivo del disco."
    },
    {
        pregunta: "16. ¿Para qué sirve el archivo `.gitignore`?",
        opciones: [
            "A) Ignorar completamente el repositorio",
            "B) Excluir archivos y carpetas del seguimiento de Git (como node_modules, logs, etc.)",
            "C) Ocultar archivos sensibles",
            "D) Configurar permisos de acceso"
        ],
        correcta: 1,
        explicacion: "`\.gitignore` es un archivo de texto que le dice a Git qué archivos o patrones ignorar. Es crucial para no subir dependencias, archivos de construcción o datos sensibles al repositorio remoto."
    },
    {
        pregunta: "17. ¿Cómo se crea una 'tag' (etiqueta) en Git para marcar un versión específica?",
        opciones: [
            "A) git version nombre",
            "B) git tag nombre",
            "C) git label nombre",
            "D) git mark nombre"
        ],
        correcta: 1,
        explicacion: "El comando `git tag nombre` crea una etiqueta en el commit actual. Las etiquetas se usan comúnmente para marcar versiones de release (v1.0, v2.1, etc.) en el historial del proyecto."
    },
    {
        pregunta: "18. ¿Cómo se descarta un commit específico en Git?",
        opciones: [
            "A) git commit --delete",
            "B) git reset --hard commit-hash",
            "C) git remove commit",
            "D) git undo commit"
        ],
        correcta: 1,
        explicacion: "El comando `git reset --hard <hash>` mueve el puntero de la rama al commit especificado y descarta todos los cambios posteriores. **Cuidado:** Esto borra el historial y los cambios del working directory."
    },
    {
        pregunta: "19. ¿Qué muestra el comando `git log --oneline`?",
        opciones: [
            "A) El historial con el nombre de cada archivo modificado",
            "B) Una lista resumida de commits, un commit por línea, mostrando solo el hash corto y el mensaje",
            "C) Solo los commits del día actual",
            "D) El árbol de ramas y merges gráficamente"
        ],
        correcta: 1,
        explicacion: "La bandera `--oneline` muestra cada commit en una sola línea, mostrando el hash corto y el mensaje de commit. Es muy útil para ver rápidamente el historial de un proyecto grande."
    },
    {
        pregunta: "20. ¿Cómo se abre la ayuda (manual) de cualquier comando en Git?",
        opciones: [
            "A) git help comando",
            "B) git comando --help",
            "C) Las opciones A y B son válidas",
            "D) git docs comando"
        ],
        correcta: 2,
        explicacion: "Ambas formas funcionan: `git help <comando>` abre el manual completo, y `git <comando> --help` muestra la ayuda del comando concreto. También `git <comando> -h` ofrece un resumen rápido."
    }
];
