# BuildLog — SO de Carrera Frontend

Una aplicación web personal, mobile-first, para combatir la procrastinación y
seguir una transición hacia el desarrollo frontend moderno. Hecha con Astro,
TypeScript, Tailwind CSS y React (solo islas, para el temporizador de sesión).

## Qué hace

- **Hoy** — una tarea, un botón `EMPEZAR SESIÓN`. Reduce la distancia entre
  abrir la app y arrancar una sesión de 25 minutos de foco.
- **Modo sesión** — un temporizador sin distracciones con pausa/terminar, una
  nota de cierre y un recibo de sesión generado (con checksum) al guardar.
- **Ruta** — 7 fases (JS/TS/React → Next.js → Testing → Vue → Backend → SQL →
  Frontend Profesional), cada una con sus skills y tareas.
- **Progreso** — estados de skill manuales (`SIN EMPEZAR` → `LISTO PARA
  ENTREVISTA`), un registro diario de sesiones completadas y un formulario de
  revisión semanal.
- **Carrera** — la vista "Camino a 40–50K" (fase actual, carencias, siguiente
  hito), hitos editables (M01–M10) y un esquema de portfolio de 3 proyectos.
- **Repaso** — al terminar una sesión (o desde la tarjeta de Hoy), Gemini
  genera preguntas abiertas sobre lo estudiado, tú respondes por escrito y te
  corrige: veredicto, nota, lo que te has dejado y la respuesta esperada.

## Persistencia

Todo se guarda en `localStorage` detrás de una capa `repositories/`
(`SessionRepository`, `ProgressRepository`, `SettingsRepository`, `ReviewRepository`,
`ActiveSessionRepository`), de forma que la app nunca toca `window.localStorage`
directamente desde un componente. Esto permite cambiar más adelante la capa de
almacenamiento por Supabase/Postgres o una API propia sin tocar el código de las
funcionalidades.

## Repaso con IA (Gemini)

El repaso usa la API de Gemini de Google AI Studio, que tiene nivel gratuito.
Como la app es estática y personal, no hay servidor donde esconder la clave: se
llama a la API desde el navegador con **tu propia clave**, guardada en
`localStorage` junto al resto de ajustes.

1. Crea una clave en [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Pégala en **Ajustes → Repaso con IA** y pulsa `PROBAR CONEXIÓN`: eso valida
   la clave y rellena el desplegable con los modelos que puedes usar.
3. Entra al repaso desde `REPASAR CONCEPTOS` (en Hoy o en el recibo de sesión).

El modelo por defecto es `gemini-flash-latest`, el alias que Google mantiene
apuntando al último Flash estable. El número de preguntas por repaso también se
configura en Ajustes.

La capa de llamada vive en `src/lib/gemini.ts` (cliente HTTP y errores) y
`src/lib/quiz.ts` (contexto de la tarea, prompts y esquemas de respuesta). Los
intentos se guardan en `QuizRepository`, con el mismo patrón que el resto.

Ten en cuenta que una clave guardada en el navegador es visible para cualquiera
que use ese dispositivo o abra las herramientas de desarrollo: usa una clave
dedicada a esta app y bórrala desde Ajustes si dejas de usarla.

## Comandos

| Comando            | Acción                                              |
| :----------------- | :-------------------------------------------------- |
| `npm run dev`      | Arranca el servidor de desarrollo (`localhost:4321`) |
| `npm run build`    | Genera tipos y compila a `./dist/`                   |
| `npm run preview`  | Previsualiza la build de producción en local         |
| `npm run check`    | Comprueba los tipos de todo el proyecto (`astro check`) |

## PWA

La app incluye un `manifest.webmanifest`, iconos y un service worker mínimo
(`public/sw.js`) que cachea el app shell para uso offline. En el iPhone, usa
Compartir → **Añadir a pantalla de inicio** para instalarla en modo standalone.

## Idioma

La interfaz está en castellano. Los valores que se persisten en `localStorage`
(estados de skill, estados de hito) siguen en inglés a propósito; los textos
visibles salen de los mapas de etiquetas de `src/types/index.ts`
(`SKILL_STATE_LABELS`, `MILESTONE_STATUS_LABELS`, `PROJECT_STATUS_LABELS`).
