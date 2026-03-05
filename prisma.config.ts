import { defineConfig, env } from 'prisma/config';

if (typeof process.loadEnvFile === 'function') {
  process.loadEnvFile();
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts',
  },
});