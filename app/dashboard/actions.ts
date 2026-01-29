'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createLink, checkShortCodeExists, updateLink, deleteLink } from '@/data/links';

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

// Validation schema for updating a link
const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url({ message: 'Please enter a valid URL' }),
  shortCode: z
    .string()
    .min(3, { message: 'Short code must be at least 3 characters' })
    .max(10, { message: 'Short code must be at most 10 characters' })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: 'Short code can only contain letters, numbers, hyphens, and underscores',
    }),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  // 2. Validate input
  const result = updateLinkSchema.safeParse(input);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { 
      error: errors.originalUrl?.[0] || errors.shortCode?.[0] || 'Invalid input data' 
    };
  }

  try {
    // 3. Update the link
    const link = await updateLink(result.data.id, userId, {
      originalUrl: result.data.originalUrl,
      shortCode: result.data.shortCode,
    });

    // 4. Revalidate the dashboard page to show the updated link
    revalidatePath('/dashboard');

    return { success: true, data: link };
  } catch (error) {
    console.error('Failed to update link:', error);
    return { error: 'Failed to update link. Please try again.' };
  }
}

// Validation schema for deleting a link
const deleteLinkSchema = z.object({
  id: z.number(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: 'Unauthorized' };
  }

  // 2. Validate input
  const result = deleteLinkSchema.safeParse(input);
  if (!result.success) {
    return { error: 'Invalid input data' };
  }

  try {
    // 3. Delete the link
    await deleteLink(result.data.id, userId);

    // 4. Revalidate the dashboard page
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Failed to delete link:', error);
    return { error: 'Failed to delete link. Please try again.' };
  }
}
