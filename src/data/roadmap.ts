import type { Phase, Skill, Task, Milestone, Project, Resource } from '../types';

const JS_COURSE = 'https://www.aprendejavascript.dev';

/** Enlace a un módulo concreto del curso de JavaScript de midudev. */
function jsModule(label: string, path: string): Resource {
  return { kind: 'CURSO', label: `aprendejavascript.dev · ${label}`, url: `${JS_COURSE}/clase/${path}` };
}

const TS_NINJA_1: Resource = {
  kind: 'VIDEO',
  label: 'De Novato a Ninja: Aprende TypeScript — curso intensivo #1',
  url: 'https://www.youtube.com/watch?v=fUgxxhI_bvc',
};

const TS_NINJA_2: Resource = {
  kind: 'VIDEO',
  label: 'De Novato a Ninja: Aprende TypeScript — curso intensivo #2',
  url: 'https://www.youtube.com/watch?v=L1ZSk-vPVKI',
};

const TS_UTILITY_TYPES: Resource = {
  kind: 'CURSO',
  label: 'Utility Types en TypeScript — midu.dev',
  url: 'https://midu.dev/curso/utility-types-en-typescript',
};

const TS_HANDBOOK: Resource = {
  kind: 'DOC',
  label: 'TypeScript Handbook',
  url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
};

const REACT_DOCS: Resource = { kind: 'DOC', label: 'react.dev · Learn React', url: 'https://react.dev/learn' };
const NEXT_DOCS: Resource = { kind: 'DOC', label: 'Next.js Docs · App Router', url: 'https://nextjs.org/docs/app' };
const VUE_DOCS: Resource = { kind: 'DOC', label: 'Vue 3 · Guía oficial', url: 'https://vuejs.org/guide/introduction.html' };

export const PHASES: Phase[] = [
  {
    id: 'p01',
    number: 1,
    name: 'Fundamentos de Frontend Moderno',
    goal: 'Dominar JavaScript / TypeScript moderno y React en profundidad.',
    outcome: 'Construir aplicaciones React completas sin depender constantemente de tutoriales.',
    skillIds: ['javascript', 'typescript', 'react', 'accessibility', 'responsive'],
  },
  {
    id: 'p02',
    number: 2,
    name: 'Frontend en Producción',
    goal: 'Llevar React a un contexto real de producción con Next.js.',
    outcome: 'Construir una aplicación frontend cercana a la calidad de producción.',
    skillIds: ['nextjs', 'performance', 'seo'],
  },
  {
    id: 'p03',
    number: 3,
    name: 'Testing',
    goal: 'Diseñar y mantener una estrategia de testing razonable.',
    outcome: 'Cubrir unitario, integración y E2E con confianza real en el código.',
    skillIds: ['testing-unitario', 'testing-componentes', 'testing-e2e'],
  },
  {
    id: 'p04',
    number: 4,
    name: 'Ecosistema Vue',
    goal: 'Ampliar oportunidades laborales dominando Vue 3 y Nuxt.',
    outcome: 'Ser productivo en un stack Vue sin una rampa de adaptación larga.',
    skillIds: ['vue3', 'nuxt'],
  },
  {
    id: 'p05',
    number: 5,
    name: 'Alfabetización Backend',
    goal: 'El backend suficiente para ser un buen frontend, no para cambiar de rol.',
    outcome: 'Diseñar y consumir tus propias APIs con criterio.',
    skillIds: ['http-rest', 'nodejs', 'databases'],
  },
  {
    id: 'p06',
    number: 6,
    name: 'SQL',
    goal: 'Trabajar con bases de datos relacionales con soltura real.',
    outcome: 'Diseñar esquemas normalizados y escribir consultas eficientes.',
    skillIds: ['postgresql'],
  },
  {
    id: 'p07',
    number: 7,
    name: 'Frontend Profesional',
    goal: 'Consolidar criterio de ingeniería orientado al objetivo salarial.',
    outcome: 'Funcionar como un frontend fiable dentro de un equipo de producción.',
    skillIds: ['architecture', 'git-workflows', 'observability'],
  },
];

/**
 * Árbol de skills. Las raíces (sin parentId) son el título; sus hijas son las
 * lecciones que se estudian y sobre las que cuelgan las tareas.
 */
export const SKILLS: Skill[] = [
  // ── p01 · JavaScript ──────────────────────────────────────────────────────
  {
    id: 'javascript',
    name: 'JavaScript',
    phaseId: 'p01',
    summary:
      'La base de todo lo demás. Se aprende entero siguiendo el curso de aprendejavascript.dev, módulo a módulo, sin ejercicios inventados por el camino.',
    resources: [{ kind: 'CURSO', label: 'Curso completo · aprendejavascript.dev', url: `${JS_COURSE}/` }],
  },
  {
    id: 'js-introduccion',
    name: 'Introducción',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Qué es JavaScript, la consola del navegador, variables, tipos de datos, typeof, null y undefined, operadores lógicos y de comparación.',
    resources: [jsModule('Introducción', 'introduccion/que-es-javascript')],
  },
  {
    id: 'js-control',
    name: 'Estructuras de control',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Expresiones y declaraciones, if, switch, y bucles for / while / do-while.',
    resources: [jsModule('Estructuras de control', 'estructuras-de-control/expresiones-y-declaraciones')],
  },
  {
    id: 'js-funciones',
    name: 'Funciones',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Declaración vs expresión, parámetros, funciones flecha, scope, closures y recursividad.',
    resources: [jsModule('Funciones', 'funciones/tu-primera-funcion')],
  },
  {
    id: 'js-arrays',
    name: 'Arrays',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Iteración, métodos, transformación (map / filter / reduce), búsqueda, ordenación y matrices.',
    resources: [jsModule('Arrays', 'arrays/arrays-que-son')],
  },
  {
    id: 'js-objetos',
    name: 'Objetos',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Estructura de un objeto, atajos de sintaxis, iteración y optional chaining.',
    resources: [jsModule('Objetos', 'objetos/introduccion')],
  },
  {
    id: 'js-primitivos',
    name: 'Tipos de datos primitivos',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'String, Number, BigInt, Symbol y los métodos que aparecen sobre los primitivos.',
    resources: [jsModule('Tipos de datos primitivos', 'tipos-de-datos-primitivos/string')],
  },
  {
    id: 'js-referencias',
    name: 'Referencias y prototipos',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Valor vs referencia, prototipos, funciones constructoras, clases y herencia.',
    resources: [jsModule('Referencias y prototipos', 'referencia-prototipo/objetos-referencia')],
  },
  {
    id: 'js-errores',
    name: 'Manejo de errores',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'try / catch, finally y errores personalizados.',
    resources: [jsModule('Manejo de errores', 'manejo-de-errores/try-catch')],
  },
  {
    id: 'js-async',
    name: 'Programación asíncrona',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Callbacks, promesas (básico y avanzado), async / await y fetch.',
    resources: [jsModule('Programación asíncrona', 'programacion-asincrona/callbacks')],
  },
  {
    id: 'js-modulos',
    name: 'Módulos',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'import / export, importaciones dinámicas y buenas prácticas de organización.',
    resources: [jsModule('Módulos', 'modulos/que-son-los-modulos')],
  },
  {
    id: 'js-dom',
    name: 'DOM y eventos',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Selección de elementos, manipulación del DOM, eventos y el proyecto guiado del módulo.',
    resources: [jsModule('DOM y eventos', 'dom-y-eventos/seleccion-elementos')],
  },
  {
    id: 'js-sets-maps',
    name: 'Sets y Maps',
    phaseId: 'p01',
    parentId: 'javascript',
    summary: 'Set, Map, sus operaciones y las variantes Weak.',
    resources: [jsModule('Sets y Maps', 'sets-y-maps/introduccion')],
  },

  // ── p01 · TypeScript ──────────────────────────────────────────────────────
  {
    id: 'typescript',
    name: 'TypeScript',
    phaseId: 'p01',
    summary:
      'JavaScript con tipos. Dos vídeos intensivos para el lenguaje y un curso corto para los utility types que aparecen en cualquier código real.',
    resources: [TS_NINJA_1, TS_NINJA_2, TS_UTILITY_TYPES, TS_HANDBOOK],
  },
  {
    id: 'ts-intensivo-1',
    name: 'Curso intensivo #1',
    phaseId: 'p01',
    parentId: 'typescript',
    summary: 'Tipos primitivos, inferencia, objetos, type vs interface, uniones e intersecciones.',
    resources: [TS_NINJA_1],
  },
  {
    id: 'ts-intensivo-2',
    name: 'Curso intensivo #2',
    phaseId: 'p01',
    parentId: 'typescript',
    summary: 'Genéricos, narrowing, type guards, tipos indexados y configuración de tsconfig.',
    resources: [TS_NINJA_2],
  },
  {
    id: 'ts-utility-types',
    name: 'Utility Types',
    phaseId: 'p01',
    parentId: 'typescript',
    summary: 'Partial, Required, Omit, Pick, Readonly, Exclude, Extract, ReturnType, Parameters, NonNullable y Awaited.',
    resources: [TS_UTILITY_TYPES],
  },
  {
    id: 'ts-react',
    name: 'TypeScript en React',
    phaseId: 'p01',
    parentId: 'typescript',
    summary: 'Tipar props, estado, eventos, refs y hooks personalizados sin recurrir a any.',
    resources: [{ kind: 'DOC', label: 'React · TypeScript', url: 'https://react.dev/learn/typescript' }],
  },

  // ── p01 · React ───────────────────────────────────────────────────────────
  {
    id: 'react',
    name: 'React',
    phaseId: 'p01',
    summary: 'El núcleo de la fase: componentes, estado, hooks, formularios, datos y rendimiento.',
    resources: [REACT_DOCS],
  },
  {
    id: 'react-componentes',
    name: 'Componentes y props',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'JSX, props tipadas, composición con children y extracción de componentes reutilizables.',
    resources: [{ kind: 'DOC', label: 'Describing the UI', url: 'https://react.dev/learn/describing-the-ui' }],
  },
  {
    id: 'react-estado',
    name: 'Estado y renderizado',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'useState, estado derivado, elevar el estado, listas con keys estables y renderizado condicional.',
    resources: [{ kind: 'DOC', label: 'Managing State', url: 'https://react.dev/learn/managing-state' }],
  },
  {
    id: 'hooks',
    name: 'Hooks',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'useEffect y su limpieza, useRef, useMemo / useCallback y hooks personalizados.',
    resources: [{ kind: 'DOC', label: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' }],
  },
  {
    id: 'forms',
    name: 'Formularios',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'Inputs controlados, validación, errores accesibles y react-hook-form con zod.',
    resources: [{ kind: 'DOC', label: 'React Hook Form', url: 'https://react-hook-form.com/get-started' }],
  },
  {
    id: 'apis-async',
    name: 'Datos y asincronía',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'fetch desde componentes, estados de carga y error, cancelación y race conditions.',
    resources: [{ kind: 'DOC', label: 'TanStack Query', url: 'https://tanstack.com/query/latest/docs/framework/react/overview' }],
  },
  {
    id: 'state-management',
    name: 'Gestión de estado global',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'Cuándo basta Context, cuándo hace falta una store y cómo evitar prop drilling.',
    resources: [{ kind: 'DOC', label: 'Zustand', url: 'https://zustand.docs.pmnd.rs/getting-started/introduction' }],
  },
  {
    id: 'react-rendimiento',
    name: 'Renders y rendimiento',
    phaseId: 'p01',
    parentId: 'react',
    summary: 'Detectar re-renders con React DevTools, memo, y cuándo optimizar (y cuándo no).',
    resources: [{ kind: 'DOC', label: 'React DevTools Profiler', url: 'https://react.dev/learn/react-developer-tools' }],
  },

  // ── p01 · Fundamentos web ─────────────────────────────────────────────────
  {
    id: 'accessibility',
    name: 'Accesibilidad',
    phaseId: 'p01',
    summary: 'HTML semántico, foco, teclado y ARIA solo cuando el HTML no llega.',
    resources: [
      { kind: 'DOC', label: 'ARIA Authoring Practices Guide', url: 'https://www.w3.org/WAI/ARIA/apg/' },
      { kind: 'PRACTICA', label: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/' },
    ],
  },
  {
    id: 'responsive',
    name: 'Diseño Responsive',
    phaseId: 'p01',
    summary: 'Mobile-first, unidades fluidas con clamp(), grid moderno y container queries.',
    resources: [{ kind: 'DOC', label: 'MDN · CSS layout', url: 'https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout' }],
  },

  // ── p02 · Next.js ─────────────────────────────────────────────────────────
  {
    id: 'nextjs',
    name: 'Next.js',
    phaseId: 'p02',
    summary: 'El framework donde React se vuelve producción: rutas, servidor, datos, caché y auth.',
    resources: [NEXT_DOCS],
  },
  {
    id: 'app-router',
    name: 'App Router',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'Rutas por ficheros, layouts anidados, rutas dinámicas, loading.tsx y error.tsx.',
    resources: [{ kind: 'DOC', label: 'Routing', url: 'https://nextjs.org/docs/app/building-your-application/routing' }],
  },
  {
    id: 'server-components',
    name: 'Server Components',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'Qué corre en servidor, qué necesita "use client" y dónde poner la frontera.',
    resources: [{ kind: 'DOC', label: 'Server and Client Components', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components' }],
  },
  {
    id: 'rendering',
    name: 'Estrategias de renderizado',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'Estático, dinámico, streaming con Suspense e ISR: qué elegir y por qué.',
    resources: [{ kind: 'DOC', label: 'Rendering', url: 'https://nextjs.org/docs/app/building-your-application/rendering' }],
  },
  {
    id: 'data-fetching',
    name: 'Obtención de datos',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'fetch en servidor, Server Actions, mutaciones y revalidación.',
    resources: [{ kind: 'DOC', label: 'Data Fetching', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching' }],
  },
  {
    id: 'caching',
    name: 'Caché',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'Las capas de caché de Next, revalidate, tags y cuándo desactivarla.',
    resources: [{ kind: 'DOC', label: 'Caching', url: 'https://nextjs.org/docs/app/building-your-application/caching' }],
  },
  {
    id: 'auth',
    name: 'Autenticación',
    phaseId: 'p02',
    parentId: 'nextjs',
    summary: 'Sesiones con cookies httpOnly, rutas protegidas y middleware.',
    resources: [{ kind: 'DOC', label: 'Authentication', url: 'https://nextjs.org/docs/app/building-your-application/authentication' }],
  },
  {
    id: 'performance',
    name: 'Rendimiento',
    phaseId: 'p02',
    summary: 'Core Web Vitals, imágenes, fuentes y peso de JavaScript.',
    resources: [{ kind: 'DOC', label: 'web.dev · Core Web Vitals', url: 'https://web.dev/articles/vitals' }],
  },
  {
    id: 'seo',
    name: 'SEO',
    phaseId: 'p02',
    summary: 'Metadatos, Open Graph, sitemap y datos estructurados.',
    resources: [{ kind: 'DOC', label: 'Metadata', url: 'https://nextjs.org/docs/app/building-your-application/optimizing/metadata' }],
  },

  // ── p03 · Testing ─────────────────────────────────────────────────────────
  {
    id: 'testing-unitario',
    name: 'Testing unitario',
    phaseId: 'p03',
    summary: 'Tests rápidos sobre lógica pura: el suelo de la pirámide.',
    resources: [{ kind: 'DOC', label: 'Vitest', url: 'https://vitest.dev/guide/' }],
  },
  { id: 'vitest', name: 'Vitest', phaseId: 'p03', parentId: 'testing-unitario', summary: 'Configuración, describe / it / expect, watch mode y cobertura.' },
  { id: 'mocking', name: 'Mocking', phaseId: 'p03', parentId: 'testing-unitario', summary: 'vi.fn, vi.mock, temporizadores falsos y MSW para la red.', resources: [{ kind: 'DOC', label: 'Mock Service Worker', url: 'https://mswjs.io/docs/' }] },
  {
    id: 'testing-componentes',
    name: 'Testing de componentes',
    phaseId: 'p03',
    summary: 'Probar lo que ve el usuario, no la implementación interna.',
    resources: [{ kind: 'DOC', label: 'Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/' }],
  },
  { id: 'rtl', name: 'React Testing Library', phaseId: 'p03', parentId: 'testing-componentes', summary: 'Queries por rol y label, userEvent y asserts sobre el DOM accesible.' },
  { id: 'integration-testing', name: 'Tests de integración', phaseId: 'p03', parentId: 'testing-componentes', summary: 'Varios componentes juntos, con red mockeada y datos realistas.' },
  {
    id: 'testing-e2e',
    name: 'Testing E2E',
    phaseId: 'p03',
    summary: 'Los flujos críticos, en un navegador real.',
    resources: [{ kind: 'DOC', label: 'Playwright', url: 'https://playwright.dev/docs/intro' }],
  },
  { id: 'playwright', name: 'Playwright', phaseId: 'p03', parentId: 'testing-e2e', summary: 'Selectores accesibles, esperas automáticas, fixtures y trazas.' },

  // ── p04 · Vue ─────────────────────────────────────────────────────────────
  {
    id: 'vue3',
    name: 'Vue 3',
    phaseId: 'p04',
    summary: 'El segundo framework: mismo problema, otro modelo mental.',
    resources: [VUE_DOCS],
  },
  { id: 'composition-api', name: 'Composition API', phaseId: 'p04', parentId: 'vue3', summary: 'ref, reactive, computed, watch y composables reutilizables.' },
  { id: 'pinia', name: 'Pinia', phaseId: 'p04', parentId: 'vue3', summary: 'Stores, getters y acciones para el estado global.', resources: [{ kind: 'DOC', label: 'Pinia', url: 'https://pinia.vuejs.org/introduction.html' }] },
  {
    id: 'nuxt',
    name: 'Nuxt',
    phaseId: 'p04',
    summary: 'El Next.js del mundo Vue: rutas por ficheros, layouts y renderizado en servidor.',
    resources: [{ kind: 'DOC', label: 'Nuxt', url: 'https://nuxt.com/docs/getting-started/introduction' }],
  },

  // ── p05 · Backend ─────────────────────────────────────────────────────────
  {
    id: 'http-rest',
    name: 'HTTP y REST',
    phaseId: 'p05',
    summary: 'Lo que pasa entre el navegador y el servidor, y cómo se diseña esa conversación.',
    resources: [{ kind: 'DOC', label: 'MDN · HTTP', url: 'https://developer.mozilla.org/es/docs/Web/HTTP' }],
  },
  { id: 'api-design', name: 'Diseño de APIs', phaseId: 'p05', parentId: 'http-rest', summary: 'Recursos, verbos, códigos de estado, paginación y errores consistentes.' },
  { id: 'security-basics', name: 'Fundamentos de seguridad', phaseId: 'p05', parentId: 'http-rest', summary: 'OWASP Top 10 aplicado: inyección, XSS, CORS y datos sensibles.', resources: [{ kind: 'DOC', label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }] },
  {
    id: 'nodejs',
    name: 'Node.js',
    phaseId: 'p05',
    summary: 'Servir tus propias APIs con el mismo lenguaje que ya usas.',
    resources: [{ kind: 'DOC', label: 'Node.js Docs', url: 'https://nodejs.org/docs/latest/api/' }],
  },
  { id: 'jwt-auth', name: 'Cookies y JWT', phaseId: 'p05', parentId: 'nodejs', summary: 'Emitir, validar y caducar tokens; cookies httpOnly frente a localStorage.' },
  {
    id: 'databases',
    name: 'Bases de datos',
    phaseId: 'p05',
    summary: 'Persistencia: relacional frente a documental y cuándo usar cada una.',
  },

  // ── p06 · SQL ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    phaseId: 'p06',
    summary: 'SQL de verdad sobre la base de datos relacional más usada en producción.',
    resources: [{ kind: 'DOC', label: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html' }],
  },
  { id: 'sql-joins', name: 'SELECT / JOIN / GROUP BY', phaseId: 'p06', parentId: 'postgresql', summary: 'Consultas sobre varias tablas, agregaciones y filtrado con HAVING.' },
  { id: 'schema-design', name: 'Diseño de esquemas', phaseId: 'p06', parentId: 'postgresql', summary: 'Claves, relaciones, normalización hasta 3FN y restricciones.' },
  { id: 'query-optimization', name: 'Optimización de consultas', phaseId: 'p06', parentId: 'postgresql', summary: 'EXPLAIN ANALYZE, índices y cómo leer un plan de ejecución.' },

  // ── p07 · Frontend profesional ────────────────────────────────────────────
  {
    id: 'architecture',
    name: 'Arquitectura Frontend',
    phaseId: 'p07',
    summary: 'Decidir estructura, límites y patrones antes de que el proyecto los decida por ti.',
  },
  { id: 'clean-code', name: 'Clean code y refactorización', phaseId: 'p07', parentId: 'architecture', summary: 'Nombrado, funciones pequeñas, patrones de composición y refactor seguro.' },
  { id: 'system-design', name: 'Diseño de sistemas frontend', phaseId: 'p07', parentId: 'architecture', summary: 'Flujo de datos, capas, design system y decisiones justificadas.' },
  {
    id: 'git-workflows',
    name: 'Git y entrega',
    phaseId: 'p07',
    summary: 'Cómo se trabaja en equipo: ramas, PRs, revisión y automatización.',
    resources: [{ kind: 'DOC', label: 'GitHub Actions', url: 'https://docs.github.com/actions' }],
  },
  { id: 'ci-cd', name: 'CI/CD', phaseId: 'p07', parentId: 'git-workflows', summary: 'Pipelines que ejecutan lint, tests y build en cada push.' },
  { id: 'code-review', name: 'Revisión de código', phaseId: 'p07', parentId: 'git-workflows', summary: 'Dar y recibir feedback concreto, accionable y sin ego.' },
  {
    id: 'observability',
    name: 'Observabilidad',
    phaseId: 'p07',
    summary: 'Saber qué está pasando en producción: errores, logs y métricas de usuario real.',
    resources: [{ kind: 'DOC', label: 'Sentry para frontend', url: 'https://docs.sentry.io/platforms/javascript/' }],
  },
];

export const TASKS: Task[] = [
  // ── p01 · JavaScript (curso de aprendejavascript.dev) ─────────────────────
  {
    id: 't001', number: 1, phaseId: 'p01', skillId: 'js-introduccion', title: 'Curso JS · Introducción: consola, variables y tipos', estMinutes: 25, order: 1,
    brief: 'Primer módulo del curso: qué es JavaScript, la consola del navegador, variables, tipos de datos, typeof, null / undefined y operadores.',
    steps: [
      'Abre el módulo Introducción y ve las lecciones hasta "Operadores lógicos".',
      'Repite en la consola del navegador cada ejemplo que aparezca, sin copiar y pegar.',
      'Prueba typeof sobre un número, un string, undefined, null y un array; anota el resultado raro de null.',
      'Escribe en tu cuaderno la diferencia entre == y ===, con un ejemplo propio de cada uno.',
    ],
    doneWhen: ['Has terminado las lecciones del módulo Introducción', 'Sabes explicar la diferencia entre null y undefined', 'Sabes por qué typeof null devuelve "object"'],
    resources: [jsModule('Introducción', 'introduccion/que-es-javascript')],
  },
  {
    id: 't002', number: 2, phaseId: 'p01', skillId: 'js-control', title: 'Curso JS · Estructuras de control: condicionales y bucles', estMinutes: 25, order: 2,
    brief: 'Expresiones frente a declaraciones, if, switch y los tres bucles (for, while, do-while).',
    steps: [
      'Ve las lecciones del módulo Estructuras de control de principio a fin.',
      'Reescribe uno de los ejemplos con if/else usando switch, y comprueba que hace lo mismo.',
      'Escribe el mismo bucle con for, con while y con do-while para ver cuándo conviene cada uno.',
      'Anota en qué caso do-while ejecuta algo que while no ejecutaría.',
    ],
    doneWhen: ['Has terminado el módulo Estructuras de control', 'Sabes cuándo un switch es más legible que una cadena de if', 'Sabes explicar la diferencia entre while y do-while'],
    resources: [jsModule('Estructuras de control', 'estructuras-de-control/expresiones-y-declaraciones')],
  },
  {
    id: 't003', number: 3, phaseId: 'p01', skillId: 'js-funciones', title: 'Curso JS · Funciones: declaración, parámetros y scope', estMinutes: 25, order: 3,
    brief: 'Primera mitad del módulo de funciones: tu primera función, function expression, parámetros y scope.',
    steps: [
      'Ve las lecciones desde "Tu primera función" hasta "Scope".',
      'Escribe la misma función en las tres formas: declaración, expresión y función flecha.',
      'Prueba parámetros por defecto y el operador rest en una función propia.',
      'Provoca a propósito un error de scope (usar una variable fuera de su bloque) y lee el mensaje de error.',
    ],
    doneWhen: ['Has terminado las lecciones hasta Scope', 'Sabes explicar la diferencia entre declarar y ejecutar una función', 'Sabes qué variables ve una función y cuáles no'],
    resources: [jsModule('Funciones', 'funciones/tu-primera-funcion')],
  },
  {
    id: 't004', number: 4, phaseId: 'p01', skillId: 'js-funciones', title: 'Curso JS · Funciones: closures y recursividad', estMinutes: 25, order: 4,
    brief: 'Segunda mitad del módulo: funciones flecha, closures y recursividad, que son la base de los hooks de React.',
    steps: [
      'Ve las lecciones de funciones flecha, closures y recursividad.',
      'Escribe un contador con closure: una función que devuelve otra función y conserva su estado entre llamadas.',
      'Escribe una función recursiva sencilla (factorial o recorrer un árbol) e identifica su caso base.',
      'Anota con tus palabras qué es un closure, en una sola frase.',
    ],
    doneWhen: ['El contador con closure funciona y mantiene el valor entre llamadas', 'Tu función recursiva termina y no desborda la pila', 'Sabes explicar un closure sin leer la definición'],
    resources: [jsModule('Closures', 'funciones/closures')],
  },
  {
    id: 't005', number: 5, phaseId: 'p01', skillId: 'js-arrays', title: 'Curso JS · Arrays: qué son, iteración y métodos', estMinutes: 25, order: 5,
    brief: 'Primer bloque del módulo de arrays: qué son, cómo se recorren y los métodos básicos.',
    steps: [
      'Ve las lecciones desde "Arrays, qué son" hasta "Métodos".',
      'Prueba en consola push, pop, shift, unshift, slice y splice sobre el mismo array.',
      'Anota cuáles mutan el array original y cuáles devuelven uno nuevo.',
      'Recorre un array con for, con for...of y con forEach y compara la legibilidad.',
    ],
    doneWhen: ['Has terminado las lecciones hasta Métodos', 'Tienes una lista escrita de métodos que mutan frente a los que no', 'Sabes cuándo usar for...of en lugar de forEach'],
    resources: [jsModule('Arrays', 'arrays/arrays-que-son')],
  },
  {
    id: 't006', number: 6, phaseId: 'p01', skillId: 'js-arrays', title: 'Curso JS · Arrays: map, filter y reduce', estMinutes: 25, order: 6,
    brief: 'La lección de transformación: los tres métodos que vas a usar todos los días en React.',
    steps: [
      'Ve la lección de transformación del módulo de arrays.',
      'Sobre un array de objetos (por ejemplo productos), saca con map solo los nombres.',
      'Filtra con filter los que cumplan una condición y encadena map después.',
      'Calcula un total con reduce y explica en un comentario qué es el acumulador.',
    ],
    doneWhen: ['Las tres transformaciones devuelven lo esperado', 'Has encadenado filter y map en una sola expresión', 'Sabes explicar los parámetros de reduce sin mirar'],
    resources: [jsModule('Transformación', 'arrays/transformacion')],
  },
  {
    id: 't007', number: 7, phaseId: 'p01', skillId: 'js-arrays', title: 'Curso JS · Arrays: búsqueda, orden y matrices', estMinutes: 25, order: 7,
    brief: 'Cierre del módulo: find, some, every, includes, sort y arrays de arrays.',
    steps: [
      'Ve las lecciones de búsqueda, ordenar, matrices y algoritmos.',
      'Busca un elemento con find y comprueba qué devuelve cuando no existe.',
      'Ordena un array de objetos por un campo numérico y por un campo de texto.',
      'Anota por qué sort muta el array original y cómo evitarlo con toSorted o una copia.',
    ],
    doneWhen: ['Has terminado el módulo de Arrays', 'Sabes la diferencia entre find, filter, some y includes', 'Tu ordenación no rompe el array original'],
    resources: [jsModule('Ordenar', 'arrays/ordenar')],
  },
  {
    id: 't008', number: 8, phaseId: 'p01', skillId: 'js-objetos', title: 'Curso JS · Objetos, destructuring y optional chaining', estMinutes: 25, order: 8,
    brief: 'Módulo de objetos completo: estructura, atajos de sintaxis, iteración y optional chaining.',
    steps: [
      'Ve las cuatro lecciones del módulo Objetos.',
      'Crea un objeto anidado (usuario con dirección) y accede a un campo profundo con optional chaining.',
      'Destructura ese objeto con renombrado y con valor por defecto.',
      'Recórrelo con Object.keys, Object.values y Object.entries y compara los tres.',
    ],
    doneWhen: ['Has terminado el módulo Objetos', 'Accedes a datos anidados sin cadenas de && manuales', 'Sabes cuándo usar entries en lugar de keys'],
    resources: [jsModule('Optional chaining', 'objetos/optional-chaining')],
  },
  {
    id: 't009', number: 9, phaseId: 'p01', skillId: 'js-primitivos', title: 'Curso JS · Tipos primitivos: string, number y compañía', estMinutes: 25, order: 9,
    brief: 'String, Number, BigInt, Symbol y por qué un primitivo puede tener métodos.',
    steps: [
      'Ve las lecciones del módulo Tipos de datos primitivos.',
      'Prueba en consola los métodos de string más habituales: trim, split, replaceAll, padStart.',
      'Comprueba el clásico 0.1 + 0.2 y anota por qué pasa.',
      'Formatea un número con toLocaleString en español.',
    ],
    doneWhen: ['Has terminado el módulo de primitivos', 'Sabes explicar por qué 0.1 + 0.2 no da 0.3', 'Sabes formatear un precio para España'],
    resources: [jsModule('Tipos primitivos', 'tipos-de-datos-primitivos/string')],
  },
  {
    id: 't010', number: 10, phaseId: 'p01', skillId: 'js-referencias', title: 'Curso JS · Valor, referencia, prototipos y clases', estMinutes: 25, order: 10,
    brief: 'El módulo que explica por qué dos objetos iguales no son iguales, y de dónde salen los métodos que no escribiste.',
    steps: [
      'Ve las lecciones desde "Objetos y referencia" hasta "Herencia en clases".',
      'Comprueba en consola que dos objetos con el mismo contenido no son ===.',
      'Copia un objeto con spread y comprueba qué pasa con sus propiedades anidadas.',
      'Escribe una clase pequeña con constructor y un método, y mira su prototipo en la consola.',
    ],
    doneWhen: ['Has terminado el módulo de referencias y prototipos', 'Sabes explicar la diferencia entre copia superficial y profunda', 'Sabes de dónde vienen los métodos de un objeto que no definiste'],
    resources: [jsModule('Referencias y prototipos', 'referencia-prototipo/objetos-referencia')],
  },
  {
    id: 't011', number: 11, phaseId: 'p01', skillId: 'js-errores', title: 'Curso JS · Manejo de errores: try, catch y errores propios', estMinutes: 25, order: 11,
    brief: 'try / catch / finally y errores personalizados, la base para tratar fallos de red sin romper la UI.',
    steps: [
      'Ve las tres lecciones del módulo Manejo de errores.',
      'Envuelve un JSON.parse con datos inválidos en try/catch y muestra un mensaje útil.',
      'Crea una clase de error propia que extienda Error y lánzala desde una función.',
      'Comprueba qué se ejecuta en finally cuando hay error y cuando no lo hay.',
    ],
    doneWhen: ['Has terminado el módulo de errores', 'Tu catch distingue tu error personalizado de uno genérico', 'Sabes para qué sirve finally con un ejemplo propio'],
    resources: [jsModule('Manejo de errores', 'manejo-de-errores/try-catch')],
  },
  {
    id: 't012', number: 12, phaseId: 'p01', skillId: 'js-async', title: 'Curso JS · Asincronía: callbacks y promesas', estMinutes: 25, order: 12,
    brief: 'Callbacks, promesas básicas y avanzadas: el modelo mental antes de tocar async/await.',
    steps: [
      'Ve las lecciones de callbacks, promesas básico y promesas avanzado.',
      'Escribe una función que devuelva una promesa que se resuelve con setTimeout.',
      'Encadena dos .then y añade un .catch; provoca un rechazo para verlo funcionar.',
      'Prueba Promise.all y Promise.allSettled con dos promesas, una de ellas fallando.',
    ],
    doneWhen: ['Has terminado las lecciones de promesas', 'Sabes explicar los tres estados de una promesa', 'Sabes cuándo usar allSettled en lugar de all'],
    resources: [jsModule('Programación asíncrona', 'programacion-asincrona/callbacks')],
  },
  {
    id: 't013', number: 13, phaseId: 'p01', skillId: 'js-async', title: 'Curso JS · Asincronía: async / await y fetch', estMinutes: 25, order: 13,
    brief: 'La sintaxis que usarás siempre y la primera llamada real a una API.',
    steps: [
      'Ve las lecciones de async/await y fetch.',
      'Pide datos a una API pública con fetch y async/await, y pinta el resultado en consola.',
      'Comprueba response.ok y lanza un error cuando la respuesta no sea correcta.',
      'Rompe la URL a propósito y asegúrate de que tu catch lo captura.',
    ],
    doneWhen: ['Has terminado el módulo de asincronía', 'Tu función distingue un error de red de una respuesta 404', 'Sabes por qué fetch no lanza error con un 500'],
    resources: [jsModule('Fetch', 'programacion-asincrona/fetch')],
  },
  {
    id: 't014', number: 14, phaseId: 'p01', skillId: 'js-modulos', title: 'Curso JS · Módulos: import, export y carga dinámica', estMinutes: 25, order: 14,
    brief: 'Cómo se parte el código en ficheros, que es exactamente lo que haces en cualquier proyecto React.',
    steps: [
      'Ve las cuatro lecciones del módulo Módulos.',
      'Parte un fichero con varias funciones en dos módulos y conéctalos con import / export.',
      'Prueba un export por defecto y compáralo con los exports nombrados.',
      'Carga un módulo con import() dinámico dentro de una función y observa cuándo se descarga.',
    ],
    doneWhen: ['Has terminado el módulo Módulos', 'Sabes cuándo conviene un export por defecto y cuándo no', 'Has visto en la pestaña Network que el import dinámico llega más tarde'],
    resources: [jsModule('Módulos', 'modulos/que-son-los-modulos')],
  },
  {
    id: 't015', number: 15, phaseId: 'p01', skillId: 'js-dom', title: 'Curso JS · DOM: seleccionar y manipular elementos', estMinutes: 25, order: 15,
    brief: 'Primera mitad del módulo DOM: querySelector, crear nodos y modificar el documento.',
    steps: [
      'Ve las lecciones de selección de elementos y manipulación del DOM.',
      'En una página en blanco, crea una lista desde un array de datos con createElement.',
      'Cambia clases con classList y compara textContent con innerHTML.',
      'Anota por qué innerHTML con datos de usuario es un riesgo de seguridad.',
    ],
    doneWhen: ['La lista se pinta desde el array sin escribir el HTML a mano', 'Sabes la diferencia entre textContent e innerHTML', 'Sabes qué devuelve querySelectorAll y cómo recorrerlo'],
    resources: [jsModule('DOM y eventos', 'dom-y-eventos/seleccion-elementos')],
  },
  {
    id: 't016', number: 16, phaseId: 'p01', skillId: 'js-dom', title: 'Curso JS · Eventos y proyecto guiado del módulo', estMinutes: 25, order: 16,
    brief: 'Eventos, delegación y el proyecto que propone el curso al final del módulo.',
    steps: [
      'Ve la lección de eventos y empieza el proyecto guiado del módulo.',
      'Añade un listener a un contenedor y resuelve el clic por delegación en lugar de uno por hijo.',
      'Usa event.target y comprueba la diferencia con event.currentTarget.',
      'Avanza el proyecto hasta donde llegues en la sesión y anota dónde te has quedado.',
    ],
    doneWhen: ['La delegación de eventos funciona al añadir elementos nuevos', 'Sabes explicar target frente a currentTarget', 'El punto de avance del proyecto queda anotado en la nota de la sesión'],
    resources: [jsModule('Eventos', 'dom-y-eventos/eventos')],
  },
  {
    id: 't017', number: 17, phaseId: 'p01', skillId: 'js-sets-maps', title: 'Curso JS · Sets, Maps y sus operaciones', estMinutes: 25, order: 17,
    brief: 'Las dos estructuras que resuelven en una línea lo que con arrays y objetos cuesta cinco.',
    steps: [
      'Ve las lecciones del módulo Sets y Maps.',
      'Elimina duplicados de un array con Set y vuelve a convertirlo en array.',
      'Guarda en un Map datos con clave no string (por ejemplo un objeto) y recórrelo.',
      'Anota una situación real de tu código donde un Map sería mejor que un objeto.',
    ],
    doneWhen: ['Has terminado el módulo Sets y Maps', 'Sabes cuándo un Map gana a un objeto plano', 'Has cerrado el temario del curso de JavaScript'],
    resources: [jsModule('Sets y Maps', 'sets-y-maps/introduccion')],
  },

  // ── p01 · TypeScript ──────────────────────────────────────────────────────
  {
    id: 't018', number: 18, phaseId: 'p01', skillId: 'ts-intensivo-1', title: 'TS intensivo #1 · tipos, inferencia y objetos', estMinutes: 25, order: 18,
    brief: 'Primera parte del curso intensivo: tipos primitivos, inferencia, arrays y tipado de objetos.',
    steps: [
      'Ve el vídeo hasta la parte de tipado de objetos, con el editor abierto en paralelo.',
      'Reproduce cada ejemplo en el playground de TypeScript en lugar de solo mirar.',
      'Quita un tipo a propósito para ver qué infiere TypeScript solo.',
      'Anota las tres cosas que más te hayan sorprendido.',
    ],
    doneWhen: ['Sabes cuándo NO hace falta anotar un tipo porque ya se infiere', 'Sabes tipar un objeto con propiedades opcionales', 'Los ejemplos del vídeo compilan en tu editor'],
    resources: [TS_NINJA_1],
  },
  {
    id: 't019', number: 19, phaseId: 'p01', skillId: 'ts-intensivo-1', title: 'TS intensivo #1 · type, interface y uniones', estMinutes: 25, order: 19,
    brief: 'Segunda parte del vídeo: type frente a interface, uniones, intersecciones y tipos literales.',
    steps: [
      'Retoma el vídeo donde lo dejaste y termínalo.',
      'Escribe el mismo tipo con type y con interface y anota qué te permite cada uno.',
      'Crea una unión de literales (por ejemplo un estado: "idle" | "loading" | "error") y úsala en una función.',
      'Comprueba el error que da TypeScript al pasar un valor fuera de la unión.',
    ],
    doneWhen: ['Sabes decir cuándo usarías interface y cuándo type', 'Tienes una unión de literales usada en una función propia', 'Entiendes el mensaje de error de una unión no cubierta'],
    resources: [TS_NINJA_1],
  },
  {
    id: 't020', number: 20, phaseId: 'p01', skillId: 'ts-intensivo-2', title: 'TS intensivo #2 · genéricos', estMinutes: 25, order: 20,
    brief: 'Primera parte del segundo vídeo: genéricos en funciones y en tipos.',
    steps: [
      'Ve la parte de genéricos del segundo vídeo.',
      'Escribe una función de utilidad genérica (por ejemplo first<T>(items: T[]): T | undefined).',
      'Úsala con dos tipos distintos y comprueba que el retorno se infiere bien en cada caso.',
      'Añade una restricción con extends y observa qué llamadas deja de aceptar.',
    ],
    doneWhen: ['No hay ningún any en la firma de tu utilidad', 'El tipo de retorno se infiere correctamente en ambas llamadas', 'Sabes para qué sirve extends en un genérico'],
    resources: [TS_NINJA_2],
  },
  {
    id: 't021', number: 21, phaseId: 'p01', skillId: 'ts-intensivo-2', title: 'TS intensivo #2 · narrowing, guards y tsconfig', estMinutes: 25, order: 21,
    brief: 'Cierre del segundo vídeo: estrechamiento de tipos, type guards y configuración estricta.',
    steps: [
      'Termina el vídeo prestando atención a la parte de narrowing y tsconfig.',
      'Escribe una función que reciba una unión y use typeof o "in" para estrechar el tipo.',
      'Escribe un type guard propio con la sintaxis "x is Tipo".',
      'Activa strict en un tsconfig y arregla los errores que aparezcan.',
    ],
    doneWhen: ['Tu función trata cada rama de la unión sin castings', 'Tu type guard funciona y TypeScript lo respeta después del if', 'El proyecto compila con strict activado'],
    resources: [TS_NINJA_2, TS_HANDBOOK],
  },
  {
    id: 't022', number: 22, phaseId: 'p01', skillId: 'ts-utility-types', title: 'Utility Types · Partial, Required, Pick, Omit y Readonly', estMinutes: 25, order: 22,
    brief: 'Capítulos 1 y 2 del curso de utility types de midu.dev: los que aparecen en cualquier código real.',
    steps: [
      'Haz la introducción y la configuración inicial del curso.',
      'Completa las lecciones de Partial, Required, Omit, Pick y Readonly.',
      'Sobre un tipo Usuario propio, deriva un UsuarioFormulario con Partial y un UsuarioPublico con Omit.',
      'Haz el examen "Practica lo aprendido" del capítulo 2.',
    ],
    doneWhen: ['Los capítulos 1 y 2 están completados', 'Tienes dos tipos derivados de Usuario sin duplicar propiedades', 'Sabes cuándo Pick es mejor que Omit y al revés'],
    resources: [TS_UTILITY_TYPES],
  },
  {
    id: 't023', number: 23, phaseId: 'p01', skillId: 'ts-utility-types', title: 'Utility Types · Exclude, Extract, ReturnType y Awaited', estMinutes: 25, order: 23,
    brief: 'Capítulo 3 del curso: los utility types avanzados sobre uniones, funciones y promesas.',
    steps: [
      'Completa las lecciones de Exclude, Extract, ReturnType, Parameters, NonNullable y Awaited.',
      'Deriva el tipo de retorno de una función tuya con ReturnType en lugar de escribirlo a mano.',
      'Extrae con Awaited el tipo que resuelve una función async propia.',
      'Haz el examen del capítulo 3 y el cierre del curso.',
    ],
    doneWhen: ['El curso de utility types está terminado', 'Un tipo de tu código se deriva de una función en lugar de duplicarse', 'Sabes explicar la diferencia entre Exclude y Omit'],
    resources: [TS_UTILITY_TYPES],
  },
  {
    id: 't024', number: 24, phaseId: 'p01', skillId: 'ts-react', title: 'Tipar props y estado de un componente React', estMinutes: 25, order: 24,
    brief: 'Llevar lo aprendido de TypeScript a React: props, children y useState tipado.',
    steps: [
      'Coge un componente existente y tipa sus props con una interface propia.',
      'Tipa un children con ReactNode y una prop opcional con valor por defecto.',
      'Tipa un useState con un objeto y otro que pueda ser null al inicio.',
      'Elimina cualquier any que quede en el fichero.',
    ],
    doneWhen: ['El componente no tiene ningún any', 'Pasar una prop incorrecta da error en el editor', 'El estado que puede ser null obliga a comprobarlo antes de usarlo'],
    resources: [{ kind: 'DOC', label: 'React · TypeScript', url: 'https://react.dev/learn/typescript' }],
  },
  {
    id: 't025', number: 25, phaseId: 'p01', skillId: 'ts-react', title: 'Tipar eventos, refs y un hook personalizado', estMinutes: 25, order: 25,
    brief: 'La parte que más se atasca: los tipos de los eventos del DOM en React y el retorno de un hook propio.',
    steps: [
      'Tipa el onChange de un input y el onSubmit de un formulario con los tipos de React.',
      'Tipa un useRef que apunte a un elemento del DOM.',
      'Escribe un hook propio y tipa su retorno con "as const" o con una tupla explícita.',
      'Comprueba en el editor que al desestructurar el hook los tipos son correctos.',
    ],
    doneWhen: ['Los manejadores de eventos están tipados sin any', 'El ref del DOM está correctamente tipado y se comprueba antes de usarse', 'Al usar tu hook el editor sugiere los tipos correctos'],
    resources: [{ kind: 'DOC', label: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/' }],
  },

  // ── p01 · React ───────────────────────────────────────────────────────────
  {
    id: 't026', number: 26, phaseId: 'p01', skillId: 'react-componentes', title: 'Componente con props tipadas y composición con children', estMinutes: 25, order: 26,
    brief: 'El ladrillo básico: un componente que recibe datos por props y admite contenido por children.',
    steps: [
      'Crea un componente Card que reciba título, descripción opcional y children.',
      'Úsalo dos veces con contenidos distintos para comprobar que la composición funciona.',
      'Extrae los estilos repetidos a clases en lugar de duplicarlos en cada uso.',
      'Comprueba en el editor qué pasa si olvidas una prop obligatoria.',
    ],
    doneWhen: ['El componente se reutiliza en dos sitios sin tocarlo', 'Las props están tipadas y la opcional tiene comportamiento por defecto', 'No hay lógica de negocio dentro del componente'],
    resources: [{ kind: 'DOC', label: 'Passing Props to a Component', url: 'https://react.dev/learn/passing-props-to-a-component' }],
  },
  {
    id: 't027', number: 27, phaseId: 'p01', skillId: 'react-componentes', title: 'Extraer un FormField reutilizable', estMinutes: 25, order: 27,
    brief: 'Extraer un componente FormField (label + input + error) y montar con él un formulario de tres campos.',
    steps: [
      'Identifica el marcado que se repite en cada campo de un formulario existente.',
      'Extrae un componente FormField que reciba label, error y el resto de props del input.',
      'Reescribe el formulario usando FormField en los tres campos.',
      'Añade un cuarto campo y comprueba cuánto marcado has tenido que escribir.',
    ],
    doneWhen: ['Añadir un campo nuevo no duplica marcado', 'El error se renderiza igual en todos los campos', 'El id del input y el for del label están enlazados'],
  },
  {
    id: 't028', number: 28, phaseId: 'p01', skillId: 'react-estado', title: 'Lista con keys estables y estado vacío', estMinutes: 25, order: 28,
    brief: 'Renderizar una colección con key estable y cubrir el caso de lista vacía, que casi siempre se olvida.',
    steps: [
      'Renderiza una lista de elementos con map y una key que sea un id, no el índice.',
      'Añade un mensaje de estado vacío cuando el array no tenga elementos.',
      'Añade botones para insertar y borrar elementos y comprueba que nada se descoloca.',
      'Cambia la key al índice a propósito y observa el bug que aparece al borrar del medio.',
    ],
    doneWhen: ['Las keys son un id estable', 'La lista vacía muestra un mensaje en lugar de nada', 'Sabes explicar qué rompe usar el índice como key'],
    resources: [{ kind: 'DOC', label: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists' }],
  },
  {
    id: 't029', number: 29, phaseId: 'p01', skillId: 'react-estado', title: 'Eliminar estado duplicado y calcular estado derivado', estMinutes: 25, order: 29,
    brief: 'Detectar estado que no debería existir: lo que se puede calcular no se guarda.',
    steps: [
      'Busca en un componente dos piezas de estado donde una se pueda calcular de la otra.',
      'Borra la derivada y calcúlala durante el render.',
      'Si hay estado compartido entre hermanos, elévalo al padre común.',
      'Comprueba que ya no hay ningún useEffect cuyo único trabajo sea sincronizar estados.',
    ],
    doneWhen: ['No queda estado que se pueda calcular a partir de otro', 'No hay useEffect dedicados a copiar un estado en otro', 'El comportamiento visible no ha cambiado'],
    resources: [{ kind: 'DOC', label: 'Choosing the State Structure', url: 'https://react.dev/learn/choosing-the-state-structure' }],
  },
  {
    id: 't030', number: 30, phaseId: 'p01', skillId: 'hooks', title: 'useEffect con limpieza y dependencias correctas', estMinutes: 25, order: 30,
    brief: 'Un efecto con suscripción real (evento, intervalo o listener) y su función de limpieza.',
    steps: [
      'Añade un efecto que se suscriba a un evento de window (resize o keydown).',
      'Devuelve la función de limpieza que quita el listener.',
      'Comprueba en React DevTools que al desmontar el componente no queda nada suscrito.',
      'Ajusta el array de dependencias hasta que el linter no se queje ni el efecto se repita de más.',
    ],
    doneWhen: ['El listener se elimina al desmontar', 'El efecto no se ejecuta en cada render sin motivo', 'Sabes explicar por qué el efecto se ejecuta dos veces en desarrollo'],
    resources: [{ kind: 'DOC', label: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects' }],
  },
  {
    id: 't031', number: 31, phaseId: 'p01', skillId: 'hooks', title: 'Hook personalizado useLocalStorage', estMinutes: 25, order: 31,
    brief: 'Un hook useLocalStorage(key, initialValue) que lee al montar y escribe al cambiar.',
    steps: [
      'Crea el hook con la misma firma que useState pero persistiendo en localStorage.',
      'Lee el valor inicial de forma perezosa, dentro de la función de inicialización de useState.',
      'Envuelve el JSON.parse en try/catch para no romper con datos corruptos.',
      'Úsalo en dos componentes distintos con claves distintas.',
    ],
    doneWhen: ['El valor persiste tras recargar la página', 'Funciona con un objeto, no solo con strings', 'Un valor inválido en localStorage no rompe la aplicación'],
    resources: [{ kind: 'DOC', label: 'Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks' }],
  },
  {
    id: 't032', number: 32, phaseId: 'p01', skillId: 'hooks', title: 'useRef para el DOM y useMemo para cálculos caros', estMinutes: 25, order: 32,
    brief: 'Los dos hooks que se usan mal más a menudo: refs que no provocan render y memos que sí hacen falta.',
    steps: [
      'Usa useRef para dar el foco a un input al montar el componente.',
      'Guarda con useRef un valor que cambie sin necesidad de re-render (por ejemplo un id de intervalo).',
      'Aplica useMemo a un cálculo caro real (filtrar u ordenar una lista grande) y mide antes y después.',
      'Quita un useMemo que no aporte nada y comprueba que no cambia el rendimiento.',
    ],
    doneWhen: ['El foco funciona sin usar document.querySelector', 'El valor del ref cambia sin provocar re-render', 'Cada useMemo que queda tiene una razón medible'],
  },
  {
    id: 't033', number: 33, phaseId: 'p01', skillId: 'forms', title: 'Formulario controlado con validación accesible', estMinutes: 25, order: 33,
    brief: 'Formulario de dos o tres campos controlados con validación y errores anunciados correctamente.',
    steps: [
      'Controla los inputs por estado y evita los valores no controlados.',
      'Valida al menos un campo (obligatorio y longitud mínima) al enviar.',
      'Muestra el error junto al campo y enlázalo con aria-describedby.',
      'Comprueba con el teclado que el foco va al primer campo con error.',
    ],
    doneWhen: ['Enviar datos inválidos bloquea el envío y muestra el error', 'Enviar datos válidos limpia los errores', 'El error es accesible para un lector de pantalla'],
  },
  {
    id: 't034', number: 34, phaseId: 'p01', skillId: 'forms', title: 'Rehacer el formulario con react-hook-form y zod', estMinutes: 25, order: 34,
    brief: 'El mismo formulario, pero con las herramientas que se usan en producción.',
    steps: [
      'Instala react-hook-form y zod y define el esquema de validación con zod.',
      'Conecta el esquema con el resolver de react-hook-form.',
      'Sustituye el estado manual por register y handleSubmit.',
      'Compara el número de líneas y el comportamiento con la versión anterior.',
    ],
    doneWhen: ['La validación vive en el esquema, no repartida por el componente', 'Los tipos del formulario salen del esquema de zod', 'El formulario se comporta igual o mejor que la versión manual'],
    resources: [{ kind: 'DOC', label: 'React Hook Form + zod', url: 'https://react-hook-form.com/get-started#SchemaValidation' }],
  },
  {
    id: 't035', number: 35, phaseId: 'p01', skillId: 'apis-async', title: 'Consumir una API con estados de carga y error', estMinutes: 25, order: 35,
    brief: 'Pedir datos a una API pública y renderizar los tres estados: cargando, error y datos.',
    steps: [
      'Pide datos a una API pública (JSONPlaceholder o PokeAPI) desde un efecto.',
      'Modela los tres estados de forma explícita, sin banderas sueltas contradictorias.',
      'Comprueba response.ok y lanza el error para que lo recoja el estado de error.',
      'Rompe la URL a propósito y comprueba que se ve el mensaje de error.',
    ],
    doneWhen: ['Se ve un indicador de carga durante la petición', 'Un fallo muestra un mensaje, no una pantalla en blanco', 'No hay combinación de estados imposible (cargando y error a la vez)'],
  },
  {
    id: 't036', number: 36, phaseId: 'p01', skillId: 'apis-async', title: 'Cancelar peticiones y evitar race conditions', estMinutes: 25, order: 36,
    brief: 'El bug clásico del buscador: llega antes la respuesta vieja que la nueva.',
    steps: [
      'Monta un input de búsqueda que dispare una petición al escribir.',
      'Reproduce el bug ralentizando la red en DevTools y escribiendo rápido.',
      'Añade AbortController en la limpieza del efecto para cancelar la petición anterior.',
      'Ignora el error de tipo AbortError para no mostrarlo como fallo real.',
    ],
    doneWhen: ['El resultado mostrado siempre corresponde al último texto escrito', 'Las peticiones canceladas aparecen como canceladas en DevTools', 'Una cancelación no pinta un mensaje de error'],
  },
  {
    id: 't037', number: 37, phaseId: 'p01', skillId: 'state-management', title: 'Sustituir prop drilling por Context', estMinutes: 25, order: 37,
    brief: 'Quitar una prop que baja tres niveles solo de paso, usando Context donde de verdad hace falta.',
    steps: [
      'Localiza una prop que atraviese dos o más componentes sin que la usen.',
      'Crea el contexto y un provider que envuelva solo el subárbol que lo necesita.',
      'Crea un hook useX() que lance un error claro si se usa fuera del provider.',
      'Elimina la prop de los componentes intermedios.',
    ],
    doneWhen: ['Los componentes intermedios ya no propagan la prop', 'El provider envuelve solo lo necesario', 'Usar el hook fuera del provider da un error entendible'],
    resources: [{ kind: 'DOC', label: 'Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context' }],
  },
  {
    id: 't038', number: 38, phaseId: 'p01', skillId: 'state-management', title: 'Montar una store global con Zustand', estMinutes: 25, order: 38,
    brief: 'Estado global de verdad (carrito, sesión, preferencias) con una librería, y la comparación con Context.',
    steps: [
      'Crea una store de Zustand con su estado y sus acciones.',
      'Conéctala desde dos componentes que no tengan relación de padre e hijo.',
      'Selecciona solo el trozo de estado que necesita cada componente.',
      'Anota en qué se diferencia esto de haberlo hecho con Context.',
    ],
    doneWhen: ['Los cambios en un componente se reflejan en el otro', 'La lógica vive en la store, no en los componentes', 'Un componente no se re-renderiza por cambios que no le afectan'],
    resources: [{ kind: 'DOC', label: 'Zustand', url: 'https://zustand.docs.pmnd.rs/getting-started/introduction' }],
  },
  {
    id: 't039', number: 39, phaseId: 'p01', skillId: 'react-rendimiento', title: 'Detectar re-renders con el Profiler y arreglar uno', estMinutes: 25, order: 39,
    brief: 'Medir antes de optimizar: encontrar un re-render innecesario real y quitarlo.',
    steps: [
      'Abre React DevTools y activa el resaltado de renders.',
      'Interactúa con la aplicación y localiza un componente que se re-renderiza sin motivo.',
      'Arregla la causa (estado mal colocado, objeto recreado en cada render o falta de memo).',
      'Vuelve a medir con el Profiler y compara.',
    ],
    doneWhen: ['Has identificado la causa concreta del re-render', 'El Profiler muestra menos trabajo tras el cambio', 'No has añadido memo "por si acaso" en sitios sin problema'],
  },
  {
    id: 't040', number: 40, phaseId: 'p01', skillId: 'accessibility', title: 'Auditar un componente con axe y corregir 3 problemas', estMinutes: 25, order: 40,
    brief: 'Pasar axe DevTools o Lighthouse a un componente propio y arreglar tres hallazgos reales.',
    steps: [
      'Pasa el análisis con axe DevTools sobre una página real de tu proyecto.',
      'Elige tres problemas concretos (labels ausentes, contraste, texto alternativo, jerarquía de encabezados).',
      'Corrígelos con HTML semántico, y con ARIA solo cuando el HTML no llegue.',
      'Vuelve a pasar el análisis y compara.',
    ],
    doneWhen: ['Los tres problemas ya no aparecen al repetir el análisis', 'No se han introducido problemas nuevos', 'Ninguna corrección consiste en silenciar el aviso'],
    resources: [{ kind: 'PRACTICA', label: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/' }],
  },
  {
    id: 't041', number: 41, phaseId: 'p01', skillId: 'accessibility', title: 'Recorrer la interfaz solo con el teclado', estMinutes: 25, order: 41,
    brief: 'La prueba más barata de accesibilidad: aparta el ratón y navega con Tab.',
    steps: [
      'Recorre una pantalla completa usando solo Tab, Shift+Tab, Enter y Escape.',
      'Anota cada punto donde el foco desaparece, se queda atrapado o salta en mal orden.',
      'Arregla el foco visible y sustituye los div clicables por button o a reales.',
      'Comprueba que un modal, si lo hay, devuelve el foco al cerrarse.',
    ],
    doneWhen: ['Todos los elementos interactivos son alcanzables con Tab', 'El foco se ve siempre con claridad', 'El orden de tabulación sigue el orden visual'],
  },
  {
    id: 't042', number: 42, phaseId: 'p01', skillId: 'responsive', title: 'Layout mobile-first con clamp() en lugar de breakpoints', estMinutes: 25, order: 42,
    brief: 'Escalar espaciados y tipografía de forma fluida y reducir el número de media queries.',
    steps: [
      'Parte del ancho móvil y añade estilos hacia arriba, no al revés.',
      'Sustituye al menos dos valores fijos por clamp() para tipografía y espaciado.',
      'Elimina las media queries que hayan quedado sin utilidad.',
      'Revisa el resultado a 375, 768 y 1440 px de ancho.',
    ],
    doneWhen: ['El layout se ve bien en los tres anchos', 'Al menos un valor escala de forma fluida con clamp()', 'No hay scroll horizontal en móvil'],
  },
  {
    id: 't043', number: 43, phaseId: 'p01', skillId: 'responsive', title: 'Grid fluido con auto-fit y container queries', estMinutes: 25, order: 43,
    brief: 'Un grid que se adapta por el espacio disponible del contenedor y no por el ancho de la ventana.',
    steps: [
      'Monta un grid con repeat(auto-fit, minmax(...)) y comprueba cómo cambia de columnas solo.',
      'Aplica una container query a una tarjeta para que cambie de disposición según su contenedor.',
      'Prueba la misma tarjeta en una columna estrecha y en una ancha de la misma página.',
      'Comprueba el comportamiento con texto largo y con imágenes.',
    ],
    doneWhen: ['El grid cambia de columnas sin media queries', 'La tarjeta se adapta a su contenedor, no a la ventana', 'Nada desborda con contenidos largos'],
    resources: [{ kind: 'DOC', label: 'MDN · Container queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries' }],
  },

  // ── p02 · Frontend en producción ──────────────────────────────────────────
  {
    id: 't044', number: 44, phaseId: 'p02', skillId: 'app-router', title: 'App Next.js con App Router y layout compartido', estMinutes: 25, order: 44,
    brief: 'Proyecto nuevo con App Router y dos rutas que comparten layout.',
    steps: [
      'Crea el proyecto con create-next-app y TypeScript.',
      'Añade las rutas / y /about como carpetas con su page.tsx.',
      'Extrae la cabecera y la navegación al layout.tsx raíz.',
      'Navega entre rutas con el componente Link y comprueba que no hay recarga completa.',
    ],
    doneWhen: ['Las dos rutas se renderizan dentro del mismo layout', 'La navegación no recarga la página entera', 'next build termina sin errores'],
    resources: [NEXT_DOCS],
  },
  {
    id: 't045', number: 45, phaseId: 'p02', skillId: 'app-router', title: 'Ruta dinámica con loading.tsx y error.tsx', estMinutes: 25, order: 45,
    brief: 'Los ficheros especiales del App Router que resuelven carga y error sin escribir estados a mano.',
    steps: [
      'Crea una ruta dinámica del tipo /posts/[id] que lea el parámetro.',
      'Añade un loading.tsx y comprueba que aparece mientras carga.',
      'Añade un error.tsx y provoca un fallo para verlo.',
      'Añade un not-found.tsx y llama a notFound() cuando el id no exista.',
    ],
    doneWhen: ['La ruta dinámica lee bien el parámetro', 'El estado de carga aparece sin gestionarlo manualmente', 'Un id inexistente lleva a la página de no encontrado'],
  },
  {
    id: 't046', number: 46, phaseId: 'p02', skillId: 'server-components', title: 'Colocar bien la frontera entre servidor y cliente', estMinutes: 25, order: 46,
    brief: 'Decidir qué componente debe ser de servidor y cuál necesita "use client", y bajar la frontera todo lo posible.',
    steps: [
      'Identifica en una página qué parte necesita estado o eventos y cuál no.',
      'Marca con "use client" solo el componente más pequeño posible.',
      'Sube la obtención de datos al componente de servidor que lo envuelve.',
      'Comprueba en el bundle qué JavaScript ha dejado de enviarse al cliente.',
    ],
    doneWhen: ['"use client" está solo donde hace falta', 'El componente de servidor no envía su código al cliente', 'Sabes explicar en una frase por qué cada componente está donde está'],
  },
  {
    id: 't047', number: 47, phaseId: 'p02', skillId: 'rendering', title: 'Estático, dinámico y streaming con Suspense', estMinutes: 25, order: 47,
    brief: 'Ver en la práctica qué se genera en build, qué se genera por petición y cómo se hace streaming de lo lento.',
    steps: [
      'Ejecuta next build y mira en la salida qué rutas son estáticas y cuáles dinámicas.',
      'Fuerza una ruta a dinámica y comprueba cómo cambia esa salida.',
      'Envuelve un componente lento en Suspense con un fallback.',
      'Comprueba que el resto de la página aparece antes que la parte lenta.',
    ],
    doneWhen: ['Sabes leer la tabla de rutas de next build', 'Una ruta hace streaming de su parte lenta', 'Sabes qué hace que una ruta deje de ser estática'],
  },
  {
    id: 't048', number: 48, phaseId: 'p02', skillId: 'data-fetching', title: 'Leer datos en servidor y mutar con Server Actions', estMinutes: 25, order: 48,
    brief: 'El ciclo completo: pedir datos en el servidor y escribir con una Server Action que revalide la vista.',
    steps: [
      'Pide datos con fetch dentro de un Server Component.',
      'Crea una Server Action que reciba un formulario y modifique los datos.',
      'Llama a revalidatePath o revalidateTag al terminar la acción.',
      'Comprueba que la lista se actualiza sin recargar la página a mano.',
    ],
    doneWhen: ['La lectura ocurre en servidor, sin useEffect', 'La mutación funciona desde un formulario sin JavaScript propio', 'La vista se actualiza tras la mutación'],
  },
  {
    id: 't049', number: 49, phaseId: 'p02', skillId: 'caching', title: 'Controlar la caché con revalidate y tags', estMinutes: 25, order: 49,
    brief: 'Entender las capas de caché de Next y decidir conscientemente qué se cachea y por cuánto tiempo.',
    steps: [
      'Añade revalidate a un fetch y comprueba en DevTools que no se repite la petición.',
      'Etiqueta ese fetch con un tag y revalídalo desde una acción.',
      'Desactiva la caché en un fetch que deba ser siempre fresco y anota por qué.',
      'Escribe en tres líneas qué capa de caché actúa en cada caso.',
    ],
    doneWhen: ['Una ruta sirve datos cacheados dentro de su ventana', 'Puedes forzar el refresco bajo demanda', 'Sabes decir qué datos no deben cachearse nunca en tu app'],
  },
  {
    id: 't050', number: 50, phaseId: 'p02', skillId: 'auth', title: 'Login con cookie httpOnly y ruta protegida', estMinutes: 25, order: 50,
    brief: 'Flujo mínimo de autenticación: iniciar sesión, guardar la sesión en cookie segura y proteger una ruta.',
    steps: [
      'Crea un formulario de login que valide unas credenciales de prueba.',
      'Al ir bien, escribe una cookie httpOnly y con SameSite desde el servidor.',
      'Protege una ruta comprobando la cookie y redirigiendo si no existe.',
      'Añade un logout que borre la cookie.',
    ],
    doneWhen: ['Entrar sin sesión en la ruta protegida redirige al login', 'La cookie no es legible desde document.cookie', 'El logout deja la ruta protegida inaccesible otra vez'],
  },
  {
    id: 't051', number: 51, phaseId: 'p02', skillId: 'performance', title: 'Medir y mejorar el LCP con Lighthouse', estMinutes: 25, order: 51,
    brief: 'Una medición real, un cambio concreto y una segunda medición que lo demuestre.',
    steps: [
      'Pasa Lighthouse en modo móvil sobre una página real y anota el LCP.',
      'Identifica cuál es el elemento LCP en la pestaña Performance.',
      'Aplica una mejora concreta: optimizar esa imagen, precargarla o quitar JS que bloquea.',
      'Vuelve a medir y anota el antes y el después.',
    ],
    doneWhen: ['El LCP mejora en la segunda medición', 'Sabes qué cambio concreto lo provocó', 'Nada se ha roto visualmente'],
    resources: [{ kind: 'DOC', label: 'web.dev · Optimizar LCP', url: 'https://web.dev/articles/optimize-lcp' }],
  },
  {
    id: 't052', number: 52, phaseId: 'p02', skillId: 'performance', title: 'Reducir el JavaScript y el peso de imágenes y fuentes', estMinutes: 25, order: 52,
    brief: 'Bajar el coste de la página en lo que más pesa: bundle, imágenes y tipografías.',
    steps: [
      'Analiza el bundle y localiza la dependencia más pesada.',
      'Sustitúyela, cárgala de forma dinámica o elimínala.',
      'Pasa las imágenes por next/image con tamaños correctos.',
      'Carga las fuentes con next/font y comprueba que no hay salto de texto.',
    ],
    doneWhen: ['El JavaScript de la ruta baja respecto a la medición inicial', 'Las imágenes se sirven en formato y tamaño adecuados', 'No hay desplazamiento de layout al cargar las fuentes'],
  },
  {
    id: 't053', number: 53, phaseId: 'p02', skillId: 'seo', title: 'Metadatos, Open Graph y sitemap', estMinutes: 25, order: 53,
    brief: 'Que las páginas se compartan y se indexen bien, con la API de metadata de Next.',
    steps: [
      'Añade el export metadata con título y descripción propios en dos páginas.',
      'Añade las etiquetas Open Graph, incluida una imagen.',
      'Genera sitemap.xml y robots.txt con los ficheros de convención de Next.',
      'Comprueba la previsualización con un depurador de tarjetas sociales.',
    ],
    doneWhen: ['Cada página tiene título y descripción propios', 'El sitemap lista todas las rutas públicas', 'La previsualización social se ve correctamente'],
  },

  // ── p03 · Testing ─────────────────────────────────────────────────────────
  {
    id: 't054', number: 54, phaseId: 'p03', skillId: 'vitest', title: 'Configurar Vitest y escribir el primer test', estMinutes: 25, order: 54,
    brief: 'Dejar el proyecto listo para testear y cubrir una función pura.',
    steps: [
      'Instala y configura Vitest en el proyecto y añade el script de test.',
      'Escribe los tests de una función pura: caso normal y caso límite.',
      'Nombra los tests describiendo el comportamiento, no la implementación.',
      'Deja el modo watch corriendo mientras cambias la función.',
    ],
    doneWhen: ['npm test ejecuta la suite y pasa', 'Hay al menos un caso límite cubierto (vacío, cero o null)', 'Los nombres de los tests se leen como frases'],
    resources: [{ kind: 'DOC', label: 'Vitest', url: 'https://vitest.dev/guide/' }],
  },
  {
    id: 't055', number: 55, phaseId: 'p03', skillId: 'vitest', title: 'Cobertura y tests que fallan por el motivo correcto', estMinutes: 25, order: 55,
    brief: 'Comprobar qué cubren de verdad tus tests y verificar que detectan errores reales.',
    steps: [
      'Genera el informe de cobertura y localiza una rama sin cubrir.',
      'Escribe el test que la cubra.',
      'Rompe la función a propósito y confirma que el test falla.',
      'Deshaz el cambio y comprueba que vuelve a pasar.',
    ],
    doneWhen: ['La rama que faltaba queda cubierta', 'Un cambio incorrecto en el código hace fallar la suite', 'No hay tests que pasen siempre pase lo que pase'],
  },
  {
    id: 't056', number: 56, phaseId: 'p03', skillId: 'mocking', title: 'Mockear módulos y temporizadores', estMinutes: 25, order: 56,
    brief: 'Aislar la unidad bajo test de sus dependencias y del paso del tiempo.',
    steps: [
      'Mockea un módulo con vi.mock y devuelve una implementación controlada.',
      'Comprueba con vi.fn cuántas veces y con qué argumentos se llamó.',
      'Usa temporizadores falsos para testear un debounce o un setTimeout sin esperar.',
      'Resetea los mocks entre tests.',
    ],
    doneWhen: ['El test no depende de la implementación real de la dependencia', 'El test del temporizador corre en milisegundos', 'Los mocks no se filtran de un test a otro'],
  },
  {
    id: 't057', number: 57, phaseId: 'p03', skillId: 'mocking', title: 'Interceptar la red con MSW', estMinutes: 25, order: 57,
    brief: 'Simular la API a nivel de red, sin tocar el código de producción.',
    steps: [
      'Configura MSW con un handler para el endpoint que usa tu componente.',
      'Escribe el test del caso de éxito con datos realistas.',
      'Añade un handler que devuelva un 500 y testea el estado de error.',
      'Comprueba que ningún test hace peticiones reales.',
    ],
    doneWhen: ['El componente se testea sin cambiar su código de producción', 'Están cubiertos el caso de éxito y el de error', 'La suite funciona sin conexión a internet'],
    resources: [{ kind: 'DOC', label: 'Mock Service Worker', url: 'https://mswjs.io/docs/' }],
  },
  {
    id: 't058', number: 58, phaseId: 'p03', skillId: 'rtl', title: 'Testear un formulario con Testing Library', estMinutes: 25, order: 58,
    brief: 'Rellenar, enviar y comprobar el resultado como lo haría una persona usando la interfaz.',
    steps: [
      'Renderiza el formulario y localiza los campos por su label.',
      'Rellénalos con userEvent, no con fireEvent.',
      'Comprueba el mensaje de éxito tras un envío válido.',
      'Repite con datos inválidos y comprueba el mensaje de error.',
    ],
    doneWhen: ['Las queries usan rol o label, no clases CSS', 'Están cubiertos el envío válido y el inválido', 'No hay avisos de act() en la consola'],
  },
  {
    id: 't059', number: 59, phaseId: 'p03', skillId: 'rtl', title: 'Reescribir tests frágiles con queries accesibles', estMinutes: 25, order: 59,
    brief: 'Un test que se rompe al cambiar una clase CSS no está testeando lo importante.',
    steps: [
      'Busca en tu suite tests que dependan de clases, ids o estructura del DOM.',
      'Sustituye esas queries por getByRole, getByLabelText o getByText.',
      'Refactoriza el marcado del componente sin tocar el test.',
      'Comprueba que el test sigue pasando después del refactor.',
    ],
    doneWhen: ['Ninguna query depende de detalles de estilo', 'El test sobrevive a un cambio de marcado equivalente', 'Las queries que fallan dan un mensaje de error útil'],
  },
  {
    id: 't060', number: 60, phaseId: 'p03', skillId: 'integration-testing', title: 'Test de integración de una pantalla completa', estMinutes: 25, order: 60,
    brief: 'Varios componentes trabajando juntos, con la red mockeada y datos realistas.',
    steps: [
      'Renderiza la pantalla completa, no un componente aislado.',
      'Simula el recorrido real: cargar, filtrar o buscar, y seleccionar un elemento.',
      'Comprueba el resultado visible en cada paso, no el estado interno.',
      'Añade el caso de error de la API y comprueba qué ve el usuario.',
    ],
    doneWhen: ['El test recorre un flujo completo de la pantalla', 'No se hacen peticiones de red reales', 'El fallo de la API está cubierto'],
  },
  {
    id: 't061', number: 61, phaseId: 'p03', skillId: 'playwright', title: 'Test E2E de un flujo crítico', estMinutes: 25, order: 61,
    brief: 'El recorrido que no puede romperse nunca, probado en un navegador real.',
    steps: [
      'Configura Playwright y arranca la aplicación desde la propia configuración.',
      'Escribe el test del flujo crítico (login o añadir al carrito) con selectores accesibles.',
      'Evita esperas fijas y apóyate en las esperas automáticas de Playwright.',
      'Ejecútalo dos veces seguidas para comprobar que no es inestable.',
    ],
    doneWhen: ['El test corre contra la aplicación real en marcha', 'Comprueba estado visible, no detalles internos', 'Pasa dos ejecuciones seguidas sin cambios'],
    resources: [{ kind: 'DOC', label: 'Playwright', url: 'https://playwright.dev/docs/intro' }],
  },
  {
    id: 't062', number: 62, phaseId: 'p03', skillId: 'playwright', title: 'Trazas, capturas y E2E en CI', estMinutes: 25, order: 62,
    brief: 'Que cuando falle en CI puedas ver exactamente qué pasó.',
    steps: [
      'Activa trace, screenshot y vídeo solo cuando el test falle.',
      'Provoca un fallo y abre la traza con el visor de Playwright.',
      'Añade el paso de E2E al pipeline de CI.',
      'Configura la subida de los artefactos del fallo.',
    ],
    doneWhen: ['Un fallo deja traza y captura descargables', 'Los E2E se ejecutan en CI', 'Sabes diagnosticar un fallo de CI sin reproducirlo en local'],
  },

  // ── p04 · Vue ─────────────────────────────────────────────────────────────
  {
    id: 't063', number: 63, phaseId: 'p04', skillId: 'vue3', title: 'Recrear en Vue 3 un componente que ya hiciste en React', estMinutes: 25, order: 63,
    brief: 'Mismo comportamiento, otro modelo mental: la forma más rápida de aprender el segundo framework.',
    steps: [
      'Elige un componente React tuyo con estado y eventos.',
      'Recréalo con script setup y la Composition API.',
      'Traduce el estado a ref o reactive y los eventos a la sintaxis de Vue.',
      'Anota dos diferencias concretas entre los dos modelos.',
    ],
    doneWhen: ['El comportamiento es equivalente al de la versión React', 'El estado reactivo actualiza la vista correctamente', 'Sabes nombrar dos diferencias reales entre ambos'],
    resources: [VUE_DOCS],
  },
  {
    id: 't064', number: 64, phaseId: 'p04', skillId: 'vue3', title: 'Formulario con v-model, v-if y v-for', estMinutes: 25, order: 64,
    brief: 'Las directivas que sustituyen a lo que en React haces con JavaScript puro.',
    steps: [
      'Monta un formulario con v-model en sus campos.',
      'Renderiza una lista con v-for y su :key correspondiente.',
      'Muestra un mensaje de validación con v-if.',
      'Compara con cómo lo habrías escrito en React.',
    ],
    doneWhen: ['El formulario funciona con enlace bidireccional', 'La lista tiene key estable', 'Sabes cuándo usar v-if y cuándo v-show'],
  },
  {
    id: 't065', number: 65, phaseId: 'p04', skillId: 'composition-api', title: 'Extraer lógica a un composable reutilizable', estMinutes: 25, order: 65,
    brief: 'El equivalente a los hooks personalizados: sacar la lógica del componente.',
    steps: [
      'Localiza lógica repetida en dos componentes Vue.',
      'Extráela a un composable en su propio fichero.',
      'Devuelve refs reactivas y computed, no valores planos.',
      'Úsalo desde los dos componentes.',
    ],
    doneWhen: ['El composable funciona en dos componentes distintos', 'Los componentes se limitan a presentar', 'La reactividad no se pierde al desestructurar'],
  },
  {
    id: 't066', number: 66, phaseId: 'p04', skillId: 'pinia', title: 'Estado global de una mini app con Pinia', estMinutes: 25, order: 66,
    brief: 'Una store real (carrito o lista de tareas) conectada a varios componentes.',
    steps: [
      'Define la store con su estado, sus getters y sus acciones.',
      'Conéctala desde dos componentes sin relación directa.',
      'Mueve toda la lógica de mutación a las acciones.',
      'Comprueba los cambios con las devtools de Vue.',
    ],
    doneWhen: ['Los cambios se reflejan en los dos componentes', 'La lógica vive en la store', 'No hace falta pasar props entre niveles para este estado'],
    resources: [{ kind: 'DOC', label: 'Pinia', url: 'https://pinia.vuejs.org/introduction.html' }],
  },
  {
    id: 't067', number: 67, phaseId: 'p04', skillId: 'nuxt', title: 'Rutas, layouts y ruta dinámica en Nuxt', estMinutes: 25, order: 67,
    brief: 'El mismo mapa mental que el App Router, con la convención de Nuxt.',
    steps: [
      'Crea el proyecto y añade dos páginas en el directorio pages.',
      'Define un layout compartido con la navegación.',
      'Añade una ruta dinámica del tipo /posts/[id] y lee el parámetro.',
      'Comprueba la navegación con NuxtLink.',
    ],
    doneWhen: ['La ruta dinámica lee bien el parámetro', 'El layout envuelve todas las páginas', 'La navegación funciona sin errores en consola'],
    resources: [{ kind: 'DOC', label: 'Nuxt', url: 'https://nuxt.com/docs/getting-started/routing' }],
  },
  {
    id: 't068', number: 68, phaseId: 'p04', skillId: 'nuxt', title: 'Obtener datos en Nuxt con useFetch y SSR', estMinutes: 25, order: 68,
    brief: 'Datos pedidos en el servidor y entregados ya renderizados al navegador.',
    steps: [
      'Pide datos con useFetch en una página.',
      'Comprueba en el HTML servido que los datos ya vienen renderizados.',
      'Gestiona los estados pending y error que devuelve el composable.',
      'Anota la diferencia entre useFetch y useAsyncData.',
    ],
    doneWhen: ['Los datos llegan renderizados en el HTML inicial', 'Los estados de carga y error están cubiertos', 'Sabes cuándo usar cada uno de los dos composables'],
  },

  // ── p05 · Backend ─────────────────────────────────────────────────────────
  {
    id: 't069', number: 69, phaseId: 'p05', skillId: 'http-rest', title: 'Diseccionar peticiones HTTP reales en DevTools', estMinutes: 25, order: 69,
    brief: 'Antes de escribir una API, entender de verdad qué viaja entre navegador y servidor.',
    steps: [
      'Abre la pestaña Network en una aplicación real y observa una petición completa.',
      'Anota método, código de estado, cabeceras de petición y de respuesta.',
      'Localiza las cabeceras de caché y las de tipo de contenido.',
      'Provoca un error de CORS a propósito y lee el mensaje del navegador.',
    ],
    doneWhen: ['Sabes leer una petición entera sin ayuda', 'Sabes explicar qué significa cada familia de códigos de estado', 'Sabes explicar con tus palabras qué es CORS y quién lo impone'],
    resources: [{ kind: 'DOC', label: 'MDN · HTTP', url: 'https://developer.mozilla.org/es/docs/Web/HTTP' }],
  },
  {
    id: 't070', number: 70, phaseId: 'p05', skillId: 'api-design', title: 'Diseñar el CRUD completo de un recurso', estMinutes: 25, order: 70,
    brief: 'Sobre el papel: rutas, verbos, códigos de estado y forma de las respuestas de un recurso.',
    steps: [
      'Elige un recurso (por ejemplo /tasks) y escribe sus cinco endpoints CRUD.',
      'Asigna a cada uno su verbo y sus códigos de estado de éxito y de error.',
      'Define la forma del cuerpo de la respuesta, incluida la de error.',
      'Añade paginación y filtrado al listado.',
    ],
    doneWhen: ['Cada operación usa el verbo correcto', 'Los códigos de estado son los adecuados (201, 204, 404, 422)', 'Los errores tienen todos la misma forma'],
  },
  {
    id: 't071', number: 71, phaseId: 'p05', skillId: 'security-basics', title: 'Revisar un endpoint con el OWASP Top 10', estMinutes: 25, order: 71,
    brief: 'Pasar tres puntos del OWASP Top 10 por un endpoint propio y corregir lo que aparezca.',
    steps: [
      'Elige un endpoint tuyo y revisa inyección, control de acceso y exposición de datos sensibles.',
      'Comprueba si un usuario puede acceder a datos de otro cambiando un id.',
      'Revisa qué campos devuelve la respuesta y quita los que no deberían salir.',
      'Corrige al menos un problema o documenta cómo se corregiría.',
    ],
    doneWhen: ['Has identificado al menos un problema real o potencial', 'Está corregido o documentado con su solución', 'Sabes explicar el riesgo con tus palabras'],
    resources: [{ kind: 'DOC', label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }],
  },
  {
    id: 't072', number: 72, phaseId: 'p05', skillId: 'nodejs', title: 'Endpoint REST básico con Node.js', estMinutes: 25, order: 72,
    brief: 'Un GET que devuelve JSON, servido por tu propio servidor.',
    steps: [
      'Levanta un servidor mínimo con Node (o Express / Hono si lo prefieres).',
      'Sirve GET /api/items devolviendo datos desde memoria o desde un fichero.',
      'Añade GET /api/items/:id con su 404 correspondiente.',
      'Pruébalo con curl y comprueba cabeceras y códigos.',
    ],
    doneWhen: ['El endpoint devuelve el JSON y el código correctos', 'El caso no encontrado responde 404', 'Probado a mano con curl o Postman'],
  },
  {
    id: 't073', number: 73, phaseId: 'p05', skillId: 'nodejs', title: 'Validar la entrada y unificar los errores', estMinutes: 25, order: 73,
    brief: 'Nunca confiar en el cuerpo de la petición: validar y responder errores consistentes.',
    steps: [
      'Añade POST /api/items con validación del cuerpo mediante zod.',
      'Devuelve 422 con el detalle de los campos inválidos.',
      'Centraliza el manejo de errores en un único punto.',
      'Comprueba que un fallo inesperado no filtra el stack trace al cliente.',
    ],
    doneWhen: ['Un cuerpo inválido responde 422 con detalle útil', 'Todos los errores tienen la misma forma', 'Ningún error expone detalles internos del servidor'],
  },
  {
    id: 't074', number: 74, phaseId: 'p05', skillId: 'jwt-auth', title: 'Autenticación con JWT en un endpoint protegido', estMinutes: 25, order: 74,
    brief: 'Emitir un token al iniciar sesión y exigirlo en una ruta protegida.',
    steps: [
      'Crea POST /api/login que valide credenciales y devuelva un JWT firmado.',
      'Añade caducidad al token y guárdalo en una cookie httpOnly.',
      'Protege un endpoint validando la firma y la caducidad.',
      'Prueba sin token, con token caducado y con token manipulado.',
    ],
    doneWhen: ['Sin token válido la respuesta es 401', 'Un token válido da acceso', 'El token caduca y el caducado se rechaza'],
  },
  {
    id: 't075', number: 75, phaseId: 'p05', skillId: 'databases', title: 'Conectar la API a una base de datos real', estMinutes: 25, order: 75,
    brief: 'Sustituir los datos en memoria por una base de datos que sobreviva al reinicio.',
    steps: [
      'Levanta PostgreSQL en local con Docker.',
      'Crea la tabla del recurso con el que estás trabajando.',
      'Conecta la API a la base de datos y sustituye el array en memoria.',
      'Comprueba que los datos siguen ahí tras reiniciar el servidor.',
    ],
    doneWhen: ['La API lee y escribe en PostgreSQL', 'Los datos persisten tras reiniciar', 'Las credenciales están en variables de entorno, no en el código'],
  },

  // ── p06 · SQL ─────────────────────────────────────────────────────────────
  {
    id: 't076', number: 76, phaseId: 'p06', skillId: 'postgresql', title: 'Crear una base de datos y hacer CRUD con psql', estMinutes: 25, order: 76,
    brief: 'Soltura con la consola: crear, insertar, consultar, actualizar y borrar sin ORM de por medio.',
    steps: [
      'Conéctate con psql y crea una base de datos y una tabla.',
      'Inserta varias filas con INSERT.',
      'Consulta con SELECT filtrando con WHERE y ordenando.',
      'Actualiza y borra filas, comprobando siempre el WHERE antes de ejecutar.',
    ],
    doneWhen: ['Manejas psql sin buscar cada comando', 'Sabes usar los metacomandos básicos como \\dt y \\d tabla', 'Ningún UPDATE o DELETE se te ha ido sin WHERE'],
  },
  {
    id: 't077', number: 77, phaseId: 'p06', skillId: 'sql-joins', title: 'Cinco consultas con JOIN sobre un esquema de ejemplo', estMinutes: 25, order: 77,
    brief: 'Combinar datos de varias tablas hasta que INNER y LEFT JOIN dejen de confundirse.',
    steps: [
      'Parte de un esquema sencillo con al menos tres tablas relacionadas.',
      'Escribe cinco consultas con JOIN de dificultad creciente.',
      'Incluye al menos un INNER JOIN y un LEFT JOIN.',
      'Comprueba a mano que los resultados son los que esperabas.',
    ],
    doneWhen: ['Las cinco consultas se ejecutan sin errores', 'Sabes explicar la diferencia entre INNER y LEFT con un ejemplo tuyo', 'Los resultados coinciden con lo previsto'],
  },
  {
    id: 't078', number: 78, phaseId: 'p06', skillId: 'sql-joins', title: 'Agregaciones con GROUP BY y HAVING', estMinutes: 25, order: 78,
    brief: 'Contar, sumar y agrupar: las consultas que responden preguntas de negocio.',
    steps: [
      'Escribe una consulta que cuente elementos por categoría.',
      'Añade SUM o AVG sobre un campo numérico.',
      'Filtra los grupos con HAVING y compáralo con filtrar antes con WHERE.',
      'Ordena por el valor agregado y limita el resultado.',
    ],
    doneWhen: ['Sabes cuándo va WHERE y cuándo va HAVING', 'Las agregaciones dan los números correctos', 'La consulta responde a una pregunta concreta bien formulada'],
  },
  {
    id: 't079', number: 79, phaseId: 'p06', skillId: 'schema-design', title: 'Diseñar un esquema normalizado hasta 3FN', estMinutes: 25, order: 79,
    brief: 'Modelar un caso real con tablas, claves y relaciones bien puestas.',
    steps: [
      'Elige un caso (reservas, tienda o biblioteca) y lista sus entidades.',
      'Define tablas, columnas y tipos, con su clave primaria.',
      'Resuelve las relaciones con claves foráneas, incluida alguna de muchos a muchos.',
      'Añade las restricciones NOT NULL y UNIQUE que correspondan.',
    ],
    doneWhen: ['No hay datos repetidos entre tablas', 'Las claves foráneas están definidas', 'Sabes justificar por qué está normalizado a este nivel'],
  },
  {
    id: 't080', number: 80, phaseId: 'p06', skillId: 'query-optimization', title: 'Leer un EXPLAIN ANALYZE y optimizar una consulta', estMinutes: 25, order: 80,
    brief: 'Encontrar el cuello de botella real de una consulta lenta y arreglarlo con criterio.',
    steps: [
      'Genera datos suficientes para que la consulta tarde de verdad.',
      'Ejecuta EXPLAIN ANALYZE y localiza el paso más caro.',
      'Crea el índice adecuado o reescribe la consulta.',
      'Vuelve a ejecutar EXPLAIN ANALYZE y compara el plan y el tiempo.',
    ],
    doneWhen: ['El plan cambia tras la corrección (por ejemplo de seq scan a index scan)', 'La consulta devuelve exactamente los mismos resultados', 'Sabes explicar cuál era el cuello de botella'],
  },

  // ── p07 · Frontend profesional ────────────────────────────────────────────
  {
    id: 't081', number: 81, phaseId: 'p07', skillId: 'architecture', title: 'Reorganizar un proyecto por features', estMinutes: 25, order: 81,
    brief: 'Pasar de carpetas por tipo de fichero a carpetas por funcionalidad, con límites claros.',
    steps: [
      'Dibuja la estructura actual y marca qué depende de qué.',
      'Agrupa por feature, dejando fuera solo lo verdaderamente compartido.',
      'Define qué expone cada feature hacia fuera y qué se queda dentro.',
      'Mueve los ficheros y comprueba que todo sigue compilando.',
    ],
    doneWhen: ['Una feature se puede localizar entera en una carpeta', 'Lo compartido está claramente separado de lo específico', 'El proyecto compila y los tests siguen pasando'],
  },
  {
    id: 't082', number: 82, phaseId: 'p07', skillId: 'clean-code', title: 'Refactorizar un componente complejo con un patrón', estMinutes: 25, order: 82,
    brief: 'Aplicar compound components, render props o extracción de hook a un componente que se ha ido de las manos.',
    steps: [
      'Elige el componente más difícil de leer del proyecto y anota por qué lo es.',
      'Separa la lógica de la presentación extrayendo un hook.',
      'Aplica el patrón que mejor encaje y justifícalo en un comentario.',
      'Comprueba que el comportamiento visible es idéntico.',
    ],
    doneWhen: ['El componente es más simple o más reutilizable', 'El comportamiento para el usuario no ha cambiado', 'Sabes nombrar el patrón y por qué encajaba aquí'],
  },
  {
    id: 't083', number: 83, phaseId: 'p07', skillId: 'system-design', title: 'Diseñar la arquitectura de un mini sistema frontend', estMinutes: 25, order: 83,
    brief: 'El ejercicio típico de entrevista: diseñar un dashboard de principio a fin sobre el papel.',
    steps: [
      'Define el alcance y los requisitos en cinco líneas.',
      'Dibuja el flujo de datos desde la API hasta la interfaz.',
      'Decide gestión de estado, estructura de carpetas y componentes clave.',
      'Escribe dos decisiones de arquitectura con su alternativa descartada y el porqué.',
    ],
    doneWhen: ['El diagrama cubre el flujo completo de datos', 'Hay dos decisiones justificadas por escrito', 'El alcance es construible en pocas sesiones'],
  },
  {
    id: 't084', number: 84, phaseId: 'p07', skillId: 'git-workflows', title: 'Trabajar con ramas, commits limpios y una PR', estMinutes: 25, order: 84,
    brief: 'El flujo de equipo: rama por cambio, commits que se entienden y una PR bien descrita.',
    steps: [
      'Crea una rama para un cambio concreto y trabaja solo en él.',
      'Haz commits pequeños con mensajes convencionales.',
      'Limpia el historial con rebase interactivo antes de abrir la PR.',
      'Abre la PR con descripción, contexto y cómo probarlo.',
    ],
    doneWhen: ['Cada commit tiene un propósito claro', 'El historial de la rama se lee de arriba abajo', 'La PR explica qué cambia, por qué y cómo probarlo'],
  },
  {
    id: 't085', number: 85, phaseId: 'p07', skillId: 'ci-cd', title: 'Pipeline de CI con lint, tests y build', estMinutes: 25, order: 85,
    brief: 'Que la máquina compruebe en cada push lo que ahora compruebas a mano.',
    steps: [
      'Crea el workflow de GitHub Actions que se dispare en push y en pull request.',
      'Añade los pasos de instalación, lint, test y build.',
      'Cachea las dependencias para que no tarde de más.',
      'Rompe un test a propósito y comprueba que el pipeline falla.',
    ],
    doneWhen: ['El pipeline corre automáticamente en cada push', 'Un test roto hace fallar el pipeline', 'El pipeline pasa en la rama principal'],
    resources: [{ kind: 'DOC', label: 'GitHub Actions', url: 'https://docs.github.com/actions' }],
  },
  {
    id: 't086', number: 86, phaseId: 'p07', skillId: 'code-review', title: 'Revisar una PR con una checklist', estMinutes: 25, order: 86,
    brief: 'Revisar el trabajo de otra persona (o una PR antigua tuya) buscando algo más que erratas.',
    steps: [
      'Lee la PR entera antes de comentar nada.',
      'Recorre la checklist: legibilidad, tests, casos límite, nombrado y posibles bugs.',
      'Deja al menos tres comentarios concretos y accionables.',
      'Separa lo que bloquea de lo que es solo una sugerencia.',
    ],
    doneWhen: ['Has dejado al menos tres comentarios concretos', 'Al menos uno detecta un problema o mejora real', 'Queda claro qué bloquea la PR y qué no'],
  },
  {
    id: 't087', number: 87, phaseId: 'p07', skillId: 'observability', title: 'Instrumentar errores y métricas de usuario real', estMinutes: 25, order: 87,
    brief: 'Enterarte de los fallos por tu panel de errores y no por el usuario.',
    steps: [
      'Integra Sentry (o similar) en el proyecto y sube los source maps.',
      'Provoca un error en producción y compruébalo en el panel.',
      'Envía las métricas de Web Vitals reales de los usuarios.',
      'Define qué situación merecería una alerta.',
    ],
    doneWhen: ['Un error real aparece en el panel con su traza legible', 'Se recogen métricas de usuario real, no solo de laboratorio', 'Está escrito qué se considera digno de alerta'],
    resources: [{ kind: 'DOC', label: 'Sentry para JavaScript', url: 'https://docs.sentry.io/platforms/javascript/' }],
  },
];

export const MILESTONES: Milestone[] = [
  { id: 'm01', code: 'M01', title: 'Base de React', status: 'ACTIVE' },
  { id: 'm02', code: 'M02', title: 'React listo para producción', status: 'PENDING' },
  { id: 'm03', code: 'M03', title: 'Competencia en testing', status: 'PENDING' },
  { id: 'm04', code: 'M04', title: 'Proyecto Next.js en producción', status: 'PENDING' },
  { id: 'm05', code: 'M05', title: 'Nociones de backend y SQL', status: 'PENDING' },
  { id: 'm06', code: 'M06', title: 'Portfolio sólido', status: 'PENDING' },
  { id: 'm07', code: 'M07', title: 'Listo para entrevistas', status: 'PENDING' },
  { id: 'm08', code: 'M08', title: 'Puesto de frontend / transición', status: 'PENDING' },
  { id: 'm09', code: 'M09', title: 'Consolidación como frontend mid', status: 'PENDING' },
  { id: 'm10', code: 'M10', title: 'Preparado para el objetivo de 40-50K', status: 'PENDING' },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj01',
    code: 'PROYECTO 01',
    title: 'Aplicación Frontend de Producción',
    type: 'Next.js + TypeScript',
    competencies: ['arquitectura', 'React', 'Next.js', 'accesibilidad', 'rendimiento'],
    status: 'PLANNED',
  },
  {
    id: 'proj02',
    code: 'PROYECTO 02',
    title: 'Aplicación Full-Stack',
    type: 'Next.js + Node.js + PostgreSQL',
    competencies: ['APIs', 'autenticación', 'SQL', 'testing', 'gestión de estado'],
    status: 'PLANNED',
  },
  {
    id: 'proj03',
    code: 'PROYECTO 03',
    title: 'Sistema Frontend Avanzado',
    type: 'React + design system',
    competencies: ['arquitectura', 'estrategia de testing', 'rendimiento', 'accesibilidad'],
    status: 'PLANNED',
  },
];

export function getPhase(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

/** Todas las skills de una fase, raíces e hijas, en orden de declaración. */
export function getSkillsForPhase(phaseId: string): Skill[] {
  return SKILLS.filter((s) => s.phaseId === phaseId);
}

/** Solo los títulos: React, TypeScript, Next.js... */
export function getRootSkillsForPhase(phaseId: string): Skill[] {
  return SKILLS.filter((s) => s.phaseId === phaseId && !s.parentId);
}

/** Las lecciones que cuelgan de una skill raíz. */
export function getChildSkills(skillId: string): Skill[] {
  return SKILLS.filter((s) => s.parentId === skillId);
}

/** Nombre completo para mostrar fuera del árbol: "React · Hooks". */
export function getSkillLabel(id: string): string {
  const skill = getSkill(id);
  if (!skill) return '';
  const parent = skill.parentId ? getSkill(skill.parentId) : undefined;
  return parent ? `${parent.name} · ${skill.name}` : skill.name;
}

export function getTasksForPhase(phaseId: string): Task[] {
  return TASKS.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export function getTasksForSkill(skillId: string): Task[] {
  return TASKS.filter((t) => t.skillId === skillId).sort((a, b) => a.order - b.order);
}

/** Tareas de una skill raíz y de todas sus hijas, en orden. */
export function getTasksForSkillTree(skillId: string): Task[] {
  const ids = new Set([skillId, ...getChildSkills(skillId).map((s) => s.id)]);
  return TASKS.filter((t) => ids.has(t.skillId)).sort((a, b) => a.order - b.order);
}
