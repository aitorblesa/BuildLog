import type { Phase, Skill, Task, Milestone, Project } from '../types';

export const PHASES: Phase[] = [
  {
    id: 'p01',
    number: 1,
    name: 'Modern Frontend Foundation',
    goal: 'Master modern JavaScript / TypeScript and React in depth.',
    outcome: 'Build complete React applications without constantly depending on tutorials.',
    skillIds: ['javascript', 'typescript', 'react', 'hooks', 'state-management', 'forms', 'apis-async', 'accessibility', 'responsive'],
  },
  {
    id: 'p02',
    number: 2,
    name: 'Production Frontend',
    goal: 'Take React into a real production context with Next.js.',
    outcome: 'Build a frontend application close to production quality.',
    skillIds: ['nextjs', 'app-router', 'server-components', 'rendering', 'data-fetching', 'auth', 'caching', 'performance', 'seo'],
  },
  {
    id: 'p03',
    number: 3,
    name: 'Testing',
    goal: 'Design and maintain a reasonable testing strategy.',
    outcome: 'Cover unit, integration, and E2E with real confidence in the code.',
    skillIds: ['vitest', 'rtl', 'integration-testing', 'mocking', 'playwright'],
  },
  {
    id: 'p04',
    number: 4,
    name: 'Vue Ecosystem',
    goal: 'Broaden job opportunities by mastering Vue 3 and Nuxt.',
    outcome: 'Be productive in a Vue stack without a long ramp-up.',
    skillIds: ['vue3', 'composition-api', 'pinia', 'nuxt'],
  },
  {
    id: 'p05',
    number: 5,
    name: 'Backend Literacy',
    goal: 'Enough backend to be a strong frontend developer, not to switch roles.',
    outcome: 'Design and consume your own APIs with sound judgment.',
    skillIds: ['http-rest', 'nodejs', 'api-design', 'jwt-auth', 'databases', 'security-basics'],
  },
  {
    id: 'p06',
    number: 6,
    name: 'SQL',
    goal: 'Work with relational databases with real fluency.',
    outcome: 'Design normalized schemas and write efficient queries.',
    skillIds: ['postgresql', 'sql-joins', 'schema-design', 'query-optimization'],
  },
  {
    id: 'p07',
    number: 7,
    name: 'Professional Frontend',
    goal: 'Consolidate engineering judgment aimed at the salary target.',
    outcome: 'Operate as a reliable frontend developer inside a production team.',
    skillIds: ['architecture', 'clean-code', 'ci-cd', 'git-workflows', 'code-review', 'observability', 'system-design'],
  },
];

export const SKILLS: Skill[] = [
  { id: 'javascript', name: 'JavaScript', phaseId: 'p01' },
  { id: 'typescript', name: 'TypeScript', phaseId: 'p01' },
  { id: 'react', name: 'React', phaseId: 'p01' },
  { id: 'hooks', name: 'Hooks', phaseId: 'p01' },
  { id: 'state-management', name: 'State Management', phaseId: 'p01' },
  { id: 'forms', name: 'Forms', phaseId: 'p01' },
  { id: 'apis-async', name: 'APIs & Async Patterns', phaseId: 'p01' },
  { id: 'accessibility', name: 'Accessibility', phaseId: 'p01' },
  { id: 'responsive', name: 'Responsive Design', phaseId: 'p01' },
  { id: 'nextjs', name: 'Next.js', phaseId: 'p02' },
  { id: 'app-router', name: 'App Router', phaseId: 'p02' },
  { id: 'server-components', name: 'Server Components', phaseId: 'p02' },
  { id: 'rendering', name: 'Rendering Strategies', phaseId: 'p02' },
  { id: 'data-fetching', name: 'Data Fetching', phaseId: 'p02' },
  { id: 'auth', name: 'Authentication', phaseId: 'p02' },
  { id: 'caching', name: 'Caching', phaseId: 'p02' },
  { id: 'performance', name: 'Performance', phaseId: 'p02' },
  { id: 'seo', name: 'SEO', phaseId: 'p02' },
  { id: 'vitest', name: 'Vitest', phaseId: 'p03' },
  { id: 'rtl', name: 'React Testing Library', phaseId: 'p03' },
  { id: 'integration-testing', name: 'Integration Testing', phaseId: 'p03' },
  { id: 'mocking', name: 'Mocking', phaseId: 'p03' },
  { id: 'playwright', name: 'Playwright / E2E', phaseId: 'p03' },
  { id: 'vue3', name: 'Vue 3', phaseId: 'p04' },
  { id: 'composition-api', name: 'Composition API', phaseId: 'p04' },
  { id: 'pinia', name: 'Pinia', phaseId: 'p04' },
  { id: 'nuxt', name: 'Nuxt', phaseId: 'p04' },
  { id: 'http-rest', name: 'HTTP / REST', phaseId: 'p05' },
  { id: 'nodejs', name: 'Node.js', phaseId: 'p05' },
  { id: 'api-design', name: 'API Design', phaseId: 'p05' },
  { id: 'jwt-auth', name: 'Cookies / JWT', phaseId: 'p05' },
  { id: 'databases', name: 'Databases', phaseId: 'p05' },
  { id: 'security-basics', name: 'Security Basics', phaseId: 'p05' },
  { id: 'postgresql', name: 'PostgreSQL', phaseId: 'p06' },
  { id: 'sql-joins', name: 'SELECT / JOIN / GROUP BY', phaseId: 'p06' },
  { id: 'schema-design', name: 'Schema Design', phaseId: 'p06' },
  { id: 'query-optimization', name: 'Query Optimization', phaseId: 'p06' },
  { id: 'architecture', name: 'Frontend Architecture', phaseId: 'p07' },
  { id: 'clean-code', name: 'Clean Code & Refactoring', phaseId: 'p07' },
  { id: 'ci-cd', name: 'CI/CD', phaseId: 'p07' },
  { id: 'git-workflows', name: 'Git Workflows', phaseId: 'p07' },
  { id: 'code-review', name: 'Code Review', phaseId: 'p07' },
  { id: 'observability', name: 'Observability', phaseId: 'p07' },
  { id: 'system-design', name: 'Frontend System Design', phaseId: 'p07' },
];

export const TASKS: Task[] = [
  {
    id: 't001', number: 1, phaseId: 'p01', skillId: 'javascript', title: 'Refactor a function using destructuring and optional chaining', estMinutes: 25, order: 1,
    brief: 'Take an existing function that accesses nested object properties with manual checks (obj && obj.a && obj.a.b) and rewrite it using destructuring and optional chaining (?.).',
    doneWhen: ['No more manual && chains for nested access', 'Function returns the same output for the same inputs', 'Destructured values have clear names'],
  },
  {
    id: 't002', number: 2, phaseId: 'p01', skillId: 'typescript', title: 'Type a utility function with generics', estMinutes: 25, order: 2,
    brief: 'Write a small utility function (e.g. pluck, groupBy, or firstOrDefault) and type it with a generic <T> instead of any.',
    doneWhen: ['No any in the signature', 'TypeScript infers the return type correctly at the call site', 'Works for two different types without changes'],
  },
  {
    id: 't003', number: 3, phaseId: 'p01', skillId: 'react', title: 'Build a list component with keys and conditional rendering', estMinutes: 25, order: 3,
    brief: 'Build a component that renders a list of items with a stable key, and conditionally renders an empty-state message when the list has zero items.',
    doneWhen: ['Keys are a stable id, not the array index', 'Empty list shows a message instead of nothing', 'List updates correctly when items are added or removed'],
  },
  {
    id: 't004', number: 4, phaseId: 'p01', skillId: 'hooks', title: 'Create a custom useLocalStorage hook', estMinutes: 25, order: 4,
    brief: 'Create a useLocalStorage(key, initialValue) hook that reads from localStorage on mount and writes back whenever the value changes.',
    doneWhen: ['Value persists after a page refresh', 'Works with a non-string type (e.g. an object) via JSON.stringify/parse', 'Handles localStorage being empty on first load'],
  },
  {
    id: 't005', number: 5, phaseId: 'p01', skillId: 'forms', title: 'Build a controlled form with basic validation', estMinutes: 25, order: 5,
    brief: 'Build a form with 2-3 controlled inputs and validate at least one field (required, min length) showing an inline error message.',
    doneWhen: ['Inputs are controlled via state, not refs', 'Submitting invalid data shows an error and blocks submission', 'Submitting valid data clears the error'],
  },
  {
    id: 't006', number: 6, phaseId: 'p01', skillId: 'apis-async', title: 'Consume a public API with loading and error handling', estMinutes: 25, order: 6,
    brief: 'Fetch data from a public API (JSONPlaceholder, PokeAPI) and render it with explicit loading and error states.',
    doneWhen: ['UI shows a loading indicator during the fetch', 'UI shows an error message if the request fails (test by breaking the URL)', 'Data renders correctly on success'],
  },
  {
    id: 't007', number: 7, phaseId: 'p01', skillId: 'state-management', title: 'Replace prop drilling with Context in a small case', estMinutes: 25, order: 7,
    brief: 'Take a small component tree where a prop is passed down 2-3 levels just to reach a deep child, and replace it with React Context.',
    doneWhen: ['Intermediate components no longer forward the prop', 'Provider wraps only the subtree that needs it', 'Value updates correctly re-render consumers'],
  },
  {
    id: 't008', number: 8, phaseId: 'p01', skillId: 'accessibility', title: 'Audit a component with axe and fix 3 issues', estMinutes: 25, order: 8,
    brief: 'Run an accessibility scan (axe DevTools or Lighthouse) on one of your components and fix 3 real issues it reports (missing labels, contrast, alt text).',
    doneWhen: ['Re-running the scan shows those 3 issues resolved', 'No new issues introduced', 'Fixes use semantic HTML/ARIA, not just silencing the warning'],
  },
  {
    id: 't009', number: 9, phaseId: 'p01', skillId: 'responsive', title: 'Adapt a grid layout to mobile-first using clamp()', estMinutes: 25, order: 9,
    brief: 'Take a grid layout and make it adapt from mobile to desktop using clamp() for spacing/sizing instead of multiple media query breakpoints.',
    doneWhen: ['Layout looks correct at 375px, 768px, and 1440px widths', 'Uses clamp() for at least one fluid value', 'No horizontal scroll at small widths'],
  },
  {
    id: 't010', number: 10, phaseId: 'p01', skillId: 'react', title: 'Build a reusable form component', estMinutes: 25, order: 10,
    brief: 'Extract a reusable FormField component (label + input + error) and use it to build a form with at least 3 fields.',
    doneWhen: ['Adding a new field requires no duplicated markup', 'Component accepts label, error, and standard input props', 'Errors render consistently across all fields'],
  },
  {
    id: 't011', number: 11, phaseId: 'p02', skillId: 'nextjs', title: 'Create a Next.js app with App Router from scratch', estMinutes: 25, order: 11,
    brief: 'Create a new Next.js project with the App Router and build 2 routes (e.g. / and /about) with a shared layout.',
    doneWhen: ['Both routes render inside a shared layout.tsx', 'Navigation between them works without a full page reload', 'Project builds with next build without errors'],
  },
  {
    id: 't012', number: 12, phaseId: 'p02', skillId: 'server-components', title: 'Tell Server vs Client Components apart in a real case', estMinutes: 25, order: 12,
    brief: "In an App Router project, identify a component that should be a Server Component and one that needs to be a Client Component (has state or an event handler), and mark them correctly.",
    doneWhen: ["'use client' is only where actually needed", 'Server Component ships zero client-side JS for it', 'You can explain in one sentence why each is server or client'],
  },
  {
    id: 't013', number: 13, phaseId: 'p02', skillId: 'data-fetching', title: 'Implement data fetching with caching on a route', estMinutes: 25, order: 13,
    brief: "Fetch data in a route using Next.js's fetch caching (or React Query) and verify it isn't re-fetched on every navigation.",
    doneWhen: ['Data loads on first visit', "Revisiting the route within the cache window doesn't trigger a new request (check DevTools)", 'You can force a refresh (revalidate) on demand'],
  },
  {
    id: 't014', number: 14, phaseId: 'p02', skillId: 'auth', title: 'Add a basic authentication flow with cookies', estMinutes: 25, order: 14,
    brief: 'Implement a minimal login flow: a form that sets an httpOnly cookie on success, and a protected route that checks for it.',
    doneWhen: ['Unauthenticated access to the protected route redirects to login', "Cookie is httpOnly (not readable from document.cookie)", 'Logout clears the cookie'],
  },
  {
    id: 't015', number: 15, phaseId: 'p02', skillId: 'performance', title: 'Measure and improve a page LCP with Lighthouse', estMinutes: 25, order: 15,
    brief: 'Run Lighthouse on a real page, note the LCP score, and apply one concrete fix (image optimization, preloading, removing render-blocking JS).',
    doneWhen: ['LCP score improves in a second Lighthouse run', 'You can name which change caused the improvement', 'No visual regression from the fix'],
  },
  {
    id: 't016', number: 16, phaseId: 'p02', skillId: 'seo', title: 'Configure metadata and sitemap in a Next.js app', estMinutes: 25, order: 16,
    brief: 'Add metadata exports (title, description, OG tags) to at least 2 pages and generate a basic sitemap.xml.',
    doneWhen: ['Each page has a unique title and description', 'Sitemap lists all public routes', 'OG tags render correctly (check with a social preview debugger)'],
  },
  {
    id: 't017', number: 17, phaseId: 'p03', skillId: 'vitest', title: 'Write the first unit test with Vitest', estMinutes: 25, order: 17,
    brief: 'Write unit tests for a pure function (not a component) covering the happy path and one edge case.',
    doneWhen: ['Tests run with vitest and pass', 'At least one test covers an edge case (empty input, zero, null)', 'Test names describe the behavior, not the implementation'],
  },
  {
    id: 't018', number: 18, phaseId: 'p03', skillId: 'rtl', title: 'Test a form component with Testing Library', estMinutes: 25, order: 18,
    brief: 'Test a form component with React Testing Library: fill inputs, submit, and assert the expected outcome (success message or error).',
    doneWhen: ['Test queries elements by role/label where possible', 'Test covers both a valid and an invalid submission', 'Test passes without console warnings'],
  },
  {
    id: 't019', number: 19, phaseId: 'p03', skillId: 'mocking', title: 'Mock an API call in an integration test', estMinutes: 25, order: 19,
    brief: "Write an integration test for a component that fetches data, mocking the API call so the test doesn't hit the network.",
    doneWhen: ["Test doesn't make a real network request", 'Test covers both the success and error response from the mock', 'Mock is reset between tests'],
  },
  {
    id: 't020', number: 20, phaseId: 'p03', skillId: 'playwright', title: 'Write an E2E test for a critical flow with Playwright', estMinutes: 25, order: 20,
    brief: 'Write one E2E test with Playwright covering a critical user flow end-to-end (login, or add-item-to-cart).',
    doneWhen: ['Test runs against a real running instance of the app', 'Test asserts on visible UI state, not implementation details', 'Test passes reliably on 2 consecutive runs'],
  },
  {
    id: 't021', number: 21, phaseId: 'p04', skillId: 'vue3', title: 'Recreate an equivalent React component in Vue 3', estMinutes: 25, order: 21,
    brief: 'Pick a React component you already built and recreate its behavior in Vue 3 (Composition API).',
    doneWhen: ['Same functional behavior as the React version', 'Reactive state updates the DOM correctly', 'You can name 2 concrete differences between the two mental models'],
  },
  {
    id: 't022', number: 22, phaseId: 'p04', skillId: 'composition-api', title: 'Extract logic into a reusable composable', estMinutes: 25, order: 22,
    brief: 'Extract shared logic (a counter, a fetch pattern) from a Vue component into a reusable composable function.',
    doneWhen: ['Composable can be used in 2 different components', 'Component code only handles rendering', 'Composable returns reactive refs, not plain values'],
  },
  {
    id: 't023', number: 23, phaseId: 'p04', skillId: 'pinia', title: 'Manage global state of a mini app with Pinia', estMinutes: 25, order: 23,
    brief: "Set up a Pinia store for a small app's global state (a cart or a todo list) and connect at least 2 components to it.",
    doneWhen: ['State updates in one component are reflected in the other', 'Store logic (actions) lives in the store, not in components', 'No prop drilling needed for this state'],
  },
  {
    id: 't024', number: 24, phaseId: 'p04', skillId: 'nuxt', title: 'Configure routes and layouts in a Nuxt project', estMinutes: 25, order: 24,
    brief: 'Configure file-based routes and a shared layout in a Nuxt project, including one dynamic route (e.g. /posts/[id]).',
    doneWhen: ['Dynamic route reads the param correctly', 'Shared layout wraps all pages', 'Navigation between pages works without errors'],
  },
  {
    id: 't025', number: 25, phaseId: 'p05', skillId: 'nodejs', title: 'Create a basic REST endpoint with Node.js', estMinutes: 25, order: 25,
    brief: 'Build a single REST endpoint (GET /api/items) with Node.js that returns JSON from an in-memory array or a file.',
    doneWhen: ['Endpoint returns correct JSON and status code', 'Handles a not-found case with a proper 404', 'Tested manually with curl or Postman'],
  },
  {
    id: 't026', number: 26, phaseId: 'p05', skillId: 'api-design', title: 'Design a resource endpoints following REST', estMinutes: 25, order: 26,
    brief: 'Design the full CRUD endpoint set for one resource (e.g. /tasks) following REST conventions, on paper or in a doc — routes, methods, status codes.',
    doneWhen: ['Each CRUD operation maps to the correct HTTP verb', 'Status codes are appropriate (201, 204, 404, etc.)', 'Naming is consistent and resource-based'],
  },
  {
    id: 't027', number: 27, phaseId: 'p05', skillId: 'jwt-auth', title: 'Implement JWT authentication on an endpoint', estMinutes: 25, order: 27,
    brief: 'Add JWT-based authentication to one endpoint: issue a token on login, and require/validate it on a protected route.',
    doneWhen: ['Request without a valid token is rejected with 401', 'Valid token grants access', 'Token has an expiration'],
  },
  {
    id: 't028', number: 28, phaseId: 'p05', skillId: 'security-basics', title: 'Review an endpoint against the OWASP Top 10 basics', estMinutes: 25, order: 28,
    brief: "Pick one endpoint you've built and review it against 3 items from the OWASP Top 10 basics (injection, broken auth, sensitive data exposure).",
    doneWhen: ["You've identified at least 1 real or potential issue", "You've fixed or documented a fix for it", 'You can explain the risk in your own words'],
  },
  {
    id: 't029', number: 29, phaseId: 'p06', skillId: 'sql-joins', title: 'Practice 5 queries with JOIN on a sample schema', estMinutes: 25, order: 29,
    brief: 'Using a sample schema (a simple shop or blog DB), write 5 queries that use JOIN to combine data from at least 2 tables.',
    doneWhen: ['All 5 queries run without errors', 'At least one uses a LEFT JOIN and one an INNER JOIN', 'Results match what you would expect manually'],
  },
  {
    id: 't030', number: 30, phaseId: 'p06', skillId: 'schema-design', title: 'Design a normalized schema for a real case', estMinutes: 25, order: 30,
    brief: 'Design a normalized schema (3NF) for a real case (a bookstore, a booking system) — tables, columns, keys, relationships.',
    doneWhen: ['No repeated groups or redundant data across tables', 'Foreign keys are correctly defined', 'You can explain why it is normalized to this level'],
  },
  {
    id: 't031', number: 31, phaseId: 'p06', skillId: 'query-optimization', title: 'Analyze an EXPLAIN and optimize a slow query', estMinutes: 25, order: 31,
    brief: 'Take a slow query, run EXPLAIN (ANALYZE) on it, identify the bottleneck (e.g. sequential scan), and apply a fix (index, rewrite).',
    doneWhen: ['EXPLAIN output changes after the fix (e.g. index scan instead of seq scan)', 'Query returns the same results as before', 'You can explain what the bottleneck was'],
  },
  {
    id: 't032', number: 32, phaseId: 'p07', skillId: 'clean-code', title: 'Refactor a component applying a design pattern', estMinutes: 25, order: 32,
    brief: "Refactor a component that's grown too complex by applying one design pattern (compound components, render props, or extracting a custom hook).",
    doneWhen: ['Component is meaningfully simpler or more reusable after the refactor', 'No behavior changed for the end user', 'You can name the pattern and why it fit this case'],
  },
  {
    id: 't033', number: 33, phaseId: 'p07', skillId: 'ci-cd', title: 'Set up a basic CI pipeline with tests and build', estMinutes: 25, order: 33,
    brief: 'Set up a basic CI pipeline (GitHub Actions or similar) that runs tests and a build on every push.',
    doneWhen: ['Pipeline runs automatically on push', 'A failing test fails the pipeline', 'Pipeline passes on the current main branch'],
  },
  {
    id: 't034', number: 34, phaseId: 'p07', skillId: 'code-review', title: "Review someone else's PR using a code review checklist", estMinutes: 25, order: 34,
    brief: "Review someone else's PR (or an old PR of your own) using a checklist: readability, tests, edge cases, naming, potential bugs.",
    doneWhen: ["You've left at least 3 concrete comments (not just 'LGTM')", 'At least one comment catches a real issue or improvement', 'Feedback is specific and actionable'],
  },
  {
    id: 't035', number: 35, phaseId: 'p07', skillId: 'system-design', title: 'Design the architecture of a mini frontend system', estMinutes: 25, order: 35,
    brief: 'Design the high-level architecture of a mini frontend system (a dashboard app): folder structure, state management, data flow, key components — on paper or in a doc.',
    doneWhen: ['Diagram or doc covers data flow from API to UI', "You've made and justified at least 2 architectural decisions", 'Design is scoped to something buildable in a few sessions'],
  },
];

export const MILESTONES: Milestone[] = [
  { id: 'm01', code: 'M01', title: 'React Foundation', status: 'ACTIVE' },
  { id: 'm02', code: 'M02', title: 'React Production Ready', status: 'PENDING' },
  { id: 'm03', code: 'M03', title: 'Testing Competence', status: 'PENDING' },
  { id: 'm04', code: 'M04', title: 'Next.js Production Project', status: 'PENDING' },
  { id: 'm05', code: 'M05', title: 'Backend + SQL Literacy', status: 'PENDING' },
  { id: 'm06', code: 'M06', title: 'Strong Portfolio', status: 'PENDING' },
  { id: 'm07', code: 'M07', title: 'Interview Ready', status: 'PENDING' },
  { id: 'm08', code: 'M08', title: 'Frontend Role / Transition', status: 'PENDING' },
  { id: 'm09', code: 'M09', title: 'Mid-level Frontend Consolidation', status: 'PENDING' },
  { id: 'm10', code: 'M10', title: '40-50K Target Readiness', status: 'PENDING' },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj01',
    code: 'PROJECT 01',
    title: 'Production Frontend Application',
    type: 'Next.js + TypeScript',
    competencies: ['architecture', 'React', 'Next.js', 'accessibility', 'performance'],
    status: 'PLANNED',
  },
  {
    id: 'proj02',
    code: 'PROJECT 02',
    title: 'Full-Stack Application',
    type: 'Next.js + Node.js + PostgreSQL',
    competencies: ['APIs', 'auth', 'SQL', 'testing', 'state management'],
    status: 'PLANNED',
  },
  {
    id: 'proj03',
    code: 'PROJECT 03',
    title: 'Advanced Frontend System',
    type: 'React + design system',
    competencies: ['architecture', 'testing strategy', 'performance', 'accessibility'],
    status: 'PLANNED',
  },
];

export function getPhase(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

export function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

export function getSkillsForPhase(phaseId: string): Skill[] {
  return SKILLS.filter((s) => s.phaseId === phaseId);
}

export function getTasksForPhase(phaseId: string): Task[] {
  return TASKS.filter((t) => t.phaseId === phaseId).sort((a, b) => a.order - b.order);
}
