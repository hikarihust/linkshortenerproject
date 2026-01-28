---
description: Read this before implementing or modifying server actions for data mutations.
---

# Server Actions - Data Mutation Standards

This document defines how all data mutations must be implemented in this application.

## Core Principles

### 1. Server Actions for All Mutations
- **All data mutations** must be done via Next.js Server Actions
- No direct database operations from client components
- No API routes for mutations unless absolutely necessary

### 2. Client Component Invocation
- Server actions **must be called from client components**
- Use `'use client'` directive in components that invoke server actions
- Handle loading states and errors in the client component

## File Structure and Naming

### Action File Location
- Server action files **MUST** be named `actions.ts`
- Actions must be **colocated** in the same directory as the component that calls them
- Example structure:
  ```
  app/dashboard/
    page.tsx          # Client component
    actions.ts        # Server actions for dashboard
  ```

### Action File Pattern
```typescript
'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createLink, updateLink } from '@/data/links';

// Define validation schema
const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  // 2. Validate input
  const result = createLinkSchema.safeParse(input);
  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  // 3. Call data helper function
  const link = await createLink({
    ...result.data,
    userId,
  });

  // 4. Revalidate relevant paths
  revalidatePath('/dashboard');

  return { success: true, data: link };
}
```

## Type Safety Requirements

### Input Types
- **DO NOT** use the `FormData` TypeScript type
- Define proper TypeScript interfaces or types for all inputs
- Use Zod schema inference for type generation: `type Input = z.infer<typeof schema>`

### Validation with Zod
- **All data passed to server actions MUST be validated via Zod**
- Define validation schemas at the top of the actions file
- Use `.safeParse()` to validate and return error objects
- Check `result.success` to determine if validation passed

## Authentication Check

### Required First Step
- **All server actions** must check for a logged-in user before proceeding
- Use Clerk's `auth()` from `@clerk/nextjs/server`
- Return an error object if user is not authenticated

```typescript
const { userId } = await auth();
if (!userId) {
  return { error: 'Unauthorized' };
}
```

## Database Operations

### Use Data Helper Functions
- **DO NOT** write Drizzle queries directly in server actions
- Database operations must be done via helper functions from `/data` directory
- Helper functions encapsulate database logic and provide clean abstractions

### Example Structure
```typescript
// ❌ WRONG - Direct Drizzle query in action
export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };
  
  const result = createLinkSchema.safeParse(input);
  if (!result.success) return { error: 'Invalid input' };
  
  // DON'T DO THIS - Direct database query
  const [link] = await db.insert(links).values({
    ...result.data,
    userId,
  }).returning();
  
  return { success: true, data: link };
}

// ✅ CORRECT - Use data helper function
export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };
  
  const result = createLinkSchema.safeParse(input);
  if (!result.success) return { error: 'Invalid input' };
  
  // Use helper from /data directory
  const link = await createLink({
    ...result.data,
    userId,
  });
  
  revalidatePath('/dashboard');
  return { success: true, data: link };
}
```

## Best Practices

### Cache Revalidation
- Use `revalidatePath()` to update cached data after mutations
- Revalidate all paths that display the mutated data

### Error Handling
- **Never throw errors** from server actions
- Return objects with `error` property for failures: `{ error: string }`
- Return objects with `success` and `data` properties for successes: `{ success: true, data: T }`
- Validate early and return error objects immediately
- Provide meaningful error messages in the error property
- Client components should check for `error` property before accessing `data`

### Return Values
- Always return an object with either `error` or `success` + `data` properties
- Return type should be: `{ error: string } | { success: true; data: T }`
- Return only necessary data to the client in the `data` property
- Consider security implications of returned data
- Type the return value appropriately for type safety

## Checklist

Before submitting a server action implementation, verify:

- [ ] File is named `actions.ts` and colocated with component
- [ ] File starts with `'use server'` directive
- [ ] Called from a client component with `'use client'` directive
- [ ] Input has proper TypeScript types (not FormData)
- [ ] Input is validated with Zod schema
- [ ] Authentication check is performed first
- [ ] Database operations use helper functions from `/data`
- [ ] Relevant paths are revalidated after mutation
- [ ] Errors are handled appropriately

---

**Last Updated**: January 29, 2026
