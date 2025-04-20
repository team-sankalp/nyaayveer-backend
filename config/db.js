import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config()
const { Pool } = pg;
const url = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: true // This accepts self-signed certificates (not recommended for production)
  }
});


pool.connect((err) => {
  if (err) {
    console.error('Database connection error', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

export default pool;
