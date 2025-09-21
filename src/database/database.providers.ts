import { Pool } from 'pg';

export const databaseProviders = [
  {
    provide: 'DB_POOL',
    useFactory: async () => {
      const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'escola',
        password: 'senha',
        port: 5432,
      });

      await pool.query('SELECT NOW()');

      return pool;
    },
  },
];
