import { Pool } from 'pg';

export const databaseProviders = [
  {
    provide: 'DB_POOL',
    useFactory: async () => {
      const pool = new Pool({
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'escola',
      });

      await pool.query('SELECT 1'); // valida a conexão
      return pool;
    },
  },
];
