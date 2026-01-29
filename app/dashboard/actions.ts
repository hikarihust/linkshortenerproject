'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createLink, checkShortCodeExists } from '@/data/links';

// Validation schema for creating a new link
const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL' }),
  shortCode: z
    .string()
    .min(3, { message: 'Short code must be at least 3 characters' })
    .max(10, { message: 'Short code must be at most 10 characters' })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: 'Short code can only contain letters, numbers, hyphens, and underscores',
    }),
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
    const errors = result.error.flatten().fieldErrors;
    return { 
      error: errors.originalUrl?.[0] || errors.shortCode?.[0] || 'Invalid input data' 
    };
  }

  // 3. Check if short code already exists
  const shortCodeExists = await checkShortCodeExists(result.data.shortCode);
  if (shortCodeExists) {
    return { error: 'This short code is already taken. Please choose another one.' };
  }

  try {
    // 4. Create the link
    const link = await createLink({
      userId,
      originalUrl: result.data.originalUrl,
      shortCode: result.data.shortCode,
    });

    // 5. Revalidate the dashboard page to show the new link
    revalidatePath('/dashboard');

    return { success: true, data: link };
  } catch (error) {
    console.error('Failed to create link:', error);
    return { error: 'Failed to create link. Please try again.' };
  }
}
