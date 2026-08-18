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
  { id: 't001', number: 1, phaseId: 'p01', skillId: 'javascript', title: 'Refactor a function using destructuring and optional chaining', estMinutes: 25, order: 1 },
  { id: 't002', number: 2, phaseId: 'p01', skillId: 'typescript', title: 'Type a utility function with generics', estMinutes: 25, order: 2 },
  { id: 't003', number: 3, phaseId: 'p01', skillId: 'react', title: 'Build a list component with keys and conditional rendering', estMinutes: 25, order: 3 },
  { id: 't004', number: 4, phaseId: 'p01', skillId: 'hooks', title: 'Create a custom useLocalStorage hook', estMinutes: 25, order: 4 },
  { id: 't005', number: 5, phaseId: 'p01', skillId: 'forms', title: 'Build a controlled form with basic validation', estMinutes: 25, order: 5 },
  { id: 't006', number: 6, phaseId: 'p01', skillId: 'apis-async', title: 'Consume a public API with loading and error handling', estMinutes: 25, order: 6 },
  { id: 't007', number: 7, phaseId: 'p01', skillId: 'state-management', title: 'Replace prop drilling with Context in a small case', estMinutes: 25, order: 7 },
  { id: 't008', number: 8, phaseId: 'p01', skillId: 'accessibility', title: 'Audit a component with axe and fix 3 issues', estMinutes: 25, order: 8 },
  { id: 't009', number: 9, phaseId: 'p01', skillId: 'responsive', title: 'Adapt a grid layout to mobile-first using clamp()', estMinutes: 25, order: 9 },
  { id: 't010', number: 10, phaseId: 'p01', skillId: 'react', title: 'Build a reusable form component', estMinutes: 25, order: 10 },
  { id: 't011', number: 11, phaseId: 'p02', skillId: 'nextjs', title: 'Create a Next.js app with App Router from scratch', estMinutes: 25, order: 11 },
  { id: 't012', number: 12, phaseId: 'p02', skillId: 'server-components', title: 'Tell Server vs Client Components apart in a real case', estMinutes: 25, order: 12 },
  { id: 't013', number: 13, phaseId: 'p02', skillId: 'data-fetching', title: 'Implement data fetching with caching on a route', estMinutes: 25, order: 13 },
  { id: 't014', number: 14, phaseId: 'p02', skillId: 'auth', title: 'Add a basic authentication flow with cookies', estMinutes: 25, order: 14 },
  { id: 't015', number: 15, phaseId: 'p02', skillId: 'performance', title: 'Measure and improve a page LCP with Lighthouse', estMinutes: 25, order: 15 },
  { id: 't016', number: 16, phaseId: 'p02', skillId: 'seo', title: 'Configure metadata and sitemap in a Next.js app', estMinutes: 25, order: 16 },
  { id: 't017', number: 17, phaseId: 'p03', skillId: 'vitest', title: 'Write the first unit test with Vitest', estMinutes: 25, order: 17 },
  { id: 't018', number: 18, phaseId: 'p03', skillId: 'rtl', title: 'Test a form component with Testing Library', estMinutes: 25, order: 18 },
  { id: 't019', number: 19, phaseId: 'p03', skillId: 'mocking', title: 'Mock an API call in an integration test', estMinutes: 25, order: 19 },
  { id: 't020', number: 20, phaseId: 'p03', skillId: 'playwright', title: 'Write an E2E test for a critical flow with Playwright', estMinutes: 25, order: 20 },
  { id: 't021', number: 21, phaseId: 'p04', skillId: 'vue3', title: 'Recreate an equivalent React component in Vue 3', estMinutes: 25, order: 21 },
  { id: 't022', number: 22, phaseId: 'p04', skillId: 'composition-api', title: 'Extract logic into a reusable composable', estMinutes: 25, order: 22 },
  { id: 't023', number: 23, phaseId: 'p04', skillId: 'pinia', title: 'Manage global state of a mini app with Pinia', estMinutes: 25, order: 23 },
  { id: 't024', number: 24, phaseId: 'p04', skillId: 'nuxt', title: 'Configure routes and layouts in a Nuxt project', estMinutes: 25, order: 24 },
  { id: 't025', number: 25, phaseId: 'p05', skillId: 'nodejs', title: 'Create a basic REST endpoint with Node.js', estMinutes: 25, order: 25 },
  { id: 't026', number: 26, phaseId: 'p05', skillId: 'api-design', title: 'Design a resource endpoints following REST', estMinutes: 25, order: 26 },
  { id: 't027', number: 27, phaseId: 'p05', skillId: 'jwt-auth', title: 'Implement JWT authentication on an endpoint', estMinutes: 25, order: 27 },
  { id: 't028', number: 28, phaseId: 'p05', skillId: 'security-basics', title: 'Review an endpoint against the OWASP Top 10 basics', estMinutes: 25, order: 28 },
  { id: 't029', number: 29, phaseId: 'p06', skillId: 'sql-joins', title: 'Practice 5 queries with JOIN on a sample schema', estMinutes: 25, order: 29 },
  { id: 't030', number: 30, phaseId: 'p06', skillId: 'schema-design', title: 'Design a normalized schema for a real case', estMinutes: 25, order: 30 },
  { id: 't031', number: 31, phaseId: 'p06', skillId: 'query-optimization', title: 'Analyze an EXPLAIN and optimize a slow query', estMinutes: 25, order: 31 },
  { id: 't032', number: 32, phaseId: 'p07', skillId: 'clean-code', title: 'Refactor a component applying a design pattern', estMinutes: 25, order: 32 },
  { id: 't033', number: 33, phaseId: 'p07', skillId: 'ci-cd', title: 'Set up a basic CI pipeline with tests and build', estMinutes: 25, order: 33 },
  { id: 't034', number: 34, phaseId: 'p07', skillId: 'code-review', title: "Review someone else's PR using a code review checklist", estMinutes: 25, order: 34 },
  { id: 't035', number: 35, phaseId: 'p07', skillId: 'system-design', title: 'Design the architecture of a mini frontend system', estMinutes: 25, order: 35 },
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
