# Authentication - Clerk Integration

This document outlines authentication implementation standards for this application.

## Core Principle

**All authentication is handled exclusively by Clerk.** Do not implement, suggest, or use any other authentication methods or libraries.

## Protected Routes

### Dashboard Route
- **Path**: `/dashboard`
- **Access**: Requires authenticated user
- **Implementation**: Use Clerk's `auth()` or middleware to protect this route
- **Behavior**: Unauthenticated users should be redirected to sign-in

### Home Page Redirect
- **Path**: `/` (home page)
- **Behavior**: If user is already logged in, redirect to `/dashboard`
- **Purpose**: Prevents authenticated users from seeing the landing page

## Authentication UI

### Modal-Based Authentication
- Sign-in and sign-up flows **must always launch as modals**
- Use Clerk's `<SignIn />` and `<SignUp />` components with modal mode
- Do not create separate pages for authentication unless absolutely necessary

### Implementation Pattern
```tsx
// Clerk components should be configured for modal display
import { SignIn, SignUp } from '@clerk/nextjs';

// Modal configuration
<SignIn 
  routing="modal" 
  // ... other props
/>
```

## Required Environment Variables

Ensure these Clerk environment variables are configured:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public key for client-side
- `CLERK_SECRET_KEY` - Secret key for server-side operations

## Common Patterns

### Protecting Server Components
```tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  // Protected content
}
```

### Protecting Client Components
```tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function ProtectedComponent() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/');
    }
  }, [isLoaded, userId, router]);
  
  if (!isLoaded || !userId) return null;
  
  // Protected content
}
```

### Getting User Information
```tsx
// Server Component
import { currentUser } from '@clerk/nextjs/server';

const user = await currentUser();

// Client Component
import { useUser } from '@clerk/nextjs';

const { user, isLoaded } = useUser();
```

## Middleware Configuration

Use Next.js middleware with Clerk for route protection:

```tsx
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicRoute = createRouteMatcher(['/']);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  
  // Protect dashboard routes
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  // Redirect authenticated users from home to dashboard
  if (isPublicRoute(req) && userId && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## Best Practices

### Do:
✅ Use Clerk's built-in components and hooks
✅ Leverage Clerk's middleware for route protection
✅ Check authentication status before database operations
✅ Handle loading states properly (`isLoaded`)
✅ Use modal-based sign-in/sign-up flows
✅ Redirect logged-in users from home to dashboard

### Don't:
❌ Implement custom authentication logic
❌ Use other auth libraries (NextAuth, Passport, etc.)
❌ Store passwords or auth tokens manually
❌ Create custom sign-in/sign-up pages without modals
❌ Skip authentication checks on protected routes
❌ Allow authenticated users to see the landing page

## User Data Access

Clerk provides user information through:
- `auth()` - Basic auth info (userId, sessionId)
- `currentUser()` - Full user object with profile data
- `useAuth()` - Client-side auth hook
- `useUser()` - Client-side user hook

Always use Clerk's methods to access user data - never query user data from your own database for authentication purposes.

## Session Management

Session management is automatically handled by Clerk:
- Sessions are created on sign-in
- Sessions are persisted across page loads
- Sessions expire based on Clerk dashboard configuration
- No manual session management required

---

**Last Updated**: January 17, 2026
**Related**: [AGENTS.md](../AGENTS.md)
