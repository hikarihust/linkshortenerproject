import 'dotenv/config';
import { db } from './index';
import { links } from './schema';

async function seed() {
  console.log('Seeding database with example links...');

  const exampleLinks = await db.insert(links).values([
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://github.com/vercel/next.js',
      shortCode: 'gh-nextjs',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://www.typescriptlang.org/docs/',
      shortCode: 'ts-docs',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://tailwindcss.com/docs/installation',
      shortCode: 'tw-setup',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://orm.drizzle.team/docs/overview',
      shortCode: 'drizzle',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://clerk.com/docs/quickstarts/nextjs',
      shortCode: 'clerk-qs',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://react.dev/learn',
      shortCode: 'react-lrn',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://www.postgresql.org/docs/current/',
      shortCode: 'pg-docs',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://neon.tech/docs/introduction',
      shortCode: 'neon-docs',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://ui.shadcn.com/docs',
      shortCode: 'shadcn-ui',
      updatedAt: new Date(),
    },
    {
      userId: 'user_38QJiIk3380HNzvXqUYW21saZVr',
      originalUrl: 'https://lucide.dev/icons/',
      shortCode: 'lucide',
      updatedAt: new Date(),
    },
  ]).returning();

  console.log(`✅ Successfully inserted ${exampleLinks.length} example links`);
  console.log('Example links:', exampleLinks);
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
