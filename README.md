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

## Persistencia

Todo se guarda en `localStorage` detrás de una capa `repositories/`
(`SessionRepository`, `ProgressRepository`, `SettingsRepository`, `ReviewRepository`,
`ActiveSessionRepository`), de forma que la app nunca toca `window.localStorage`
directamente desde un componente. Esto permite cambiar más adelante la capa de
almacenamiento por Supabase/Postgres o una API propia sin tocar el código de las
funcionalidades.

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
