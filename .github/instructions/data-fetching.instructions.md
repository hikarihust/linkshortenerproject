---
description: Read this file to understand the data fetching instructions for the project.
---

# Data Fetching Guidelines
This document outlines the best practices and guidelines for fetching data in our project. Adhering to these instructions will help ensure consistency, efficiency, and maintainability across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS using Server Components for data fetching. NEVER use Client Components for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data folder for data fetching. NEVER fetch data directly inside a component.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.