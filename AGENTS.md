# Agent Instructions - Link Shortener Project

⚠️ **CRITICAL: Before generating ANY code, you MUST read the relevant documentation files in the `/docs` directory first.** ⚠️

This document provides comprehensive guidance for AI coding assistants working on this Next.js-based link shortener application.

## Project Overview

This is a modern link shortener application built with:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with shadcn/ui patterns

## Quick Reference

🔴 **MANDATORY REQUIREMENT**: Before writing ANY code related to the topics below, you MUST first read and understand the corresponding documentation file. This is NOT optional. 🔴

For detailed instructions on specific topics, refer to these documents in the `/docs` directory:

- **Authentication**: [authentication.md](./docs/authentication.md) - Clerk integration, protected routes, and auth patterns
  - ⚠️ **READ THIS FIRST** before implementing any authentication-related code
- **Components**: [components.md](./docs/components.md) - shadcn/ui component usage and UI guidelines
  - ⚠️ **READ THIS FIRST** before creating or modifying any UI components

**CRITICAL**: Never skip reading the relevant documentation. The documentation contains essential patterns, conventions, and requirements that must be followed. Generating code without reading the docs will result in incorrect implementations.

## Core Principles

### 1. Type Safety First
- Use TypeScript strictly - no `any` types without explicit justification
- Define proper interfaces and types for all data structures
- Leverage Drizzle's type inference for database operations

### 2. Server-First Architecture
- Prefer Next.js Server Components and Server Actions
- Use Client Components only when necessary (interactivity, browser APIs)
- Keep business logic on the server

### 3. Database Best Practices
- All database operations through Drizzle ORM
- Use prepared statements for performance
- Implement proper error handling and transactions

### 4. Modern React Patterns
- Functional components with hooks
- Proper separation of concerns
- Composition over inheritance

### 5. Code Quality
- Follow ESLint rules strictly
- Maintain consistent formatting
- Write self-documenting code with clear naming
- Add comments only when necessary to explain "why", not "what"

## Development Workflow

1. **Before Making Changes** ⚠️ **CRITICAL STEP**
   - **FIRST**: Read the relevant documentation files in `/docs` directory
   - **SECOND**: Understand the existing code structure
   - **THIRD**: Review related components and utilities
   - **NEVER** skip the documentation step - it contains essential requirements

2. **While Coding**
   - Follow established patterns in the codebase
   - Use existing utilities and components when possible
   - Write type-safe code
   - Consider performance implications

3. **After Implementation**
   - Test functionality thoroughly
   - Update related documentation if needed
   - Ensure ESLint passes
   - Verify TypeScript compilation

## Key Conventions

### File Naming
- React components: `PascalCase.tsx`
- Utilities/helpers: `camelCase.ts`
- Types/interfaces: `types.ts` or inline with component
- Server actions: `actions.ts`
- API routes: `route.ts`

### Import Order
1. External dependencies (React, Next.js, etc.)
2. Internal absolute imports (`@/`)
3. Relative imports
4. Type imports (separate or inline)

### Component Structure
```tsx
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Helper functions (if small and local)
// 5. Export
```

## Common Patterns

### Server Components (Default)
```tsx
export default async function MyPage() {
  const data = await fetchData();
  return <div>{/* Use data directly */}</div>;
}
```

### Client Components (When Needed)
```tsx
'use client';

export function InteractiveComponent() {
  const [state, setState] = useState();
  // ... interactive logic
}
```

### Server Actions
```tsx
'use server';

export async function createLink(formData: FormData) {
  // Validate, process, database operations
  revalidatePath('/');
}
```

## Environment Variables

Required variables (see `.env.example`):
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## Important Notes

- **Never commit secrets** - Use environment variables
- **Database schema changes** require migrations via `drizzle-kit`
- **Authentication** is handled by Clerk - don't implement custom auth
- **Styling** uses Tailwind utility classes - avoid custom CSS unless necessary
- **Icons** use Lucide React library

## Getting Help

When unsure about:
- **Authentication**: Check [authentication.md](./docs/authentication.md)
- **Architecture decisions**: Consult [architecture.md](./docs/architecture.md) (if exists)
- **Code patterns**: Look for similar implementations in the codebase
- **Database operations**: Check [database.md](./docs/database.md) (if exists)
- **React patterns**: Reference [components.md](./docs/components.md) (if exists)

## Agent Behavior Guidelines

### Do:
✅ Follow established patterns in the codebase
✅ Ask clarifying questions when requirements are ambiguous
✅ Suggest improvements if you spot issues
✅ Provide type-safe solutions
✅ Consider edge cases and error handling
✅ Reference relevant documentation files

### Don't:
❌ Mix different coding styles within the project
❌ Introduce new dependencies without discussion
❌ Skip error handling
❌ Use `any` types without justification
❌ Ignore existing utilities and duplicate functionality
❌ Make breaking changes without notification

---

**Last Updated**: January 17, 2026
**Project Version**: 0.1.0
