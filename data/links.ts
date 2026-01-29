import { db } from '@/db';
import { links, type NewLink } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLink(data: Omit<NewLink, 'id' | 'createdAt' | 'updatedAt'>) {
  const [newLink] = await db
    .insert(links)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();
  
  return newLink;
}

export async function checkShortCodeExists(shortCode: string): Promise<boolean> {
  const existing = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  
  return existing.length > 0;
}
