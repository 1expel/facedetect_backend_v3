import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// process.env inherited from local .env file
const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
// process.env inherited from Heroku
const prodConfig = process.env.DATABASE_URL;

const pool = new pg.Pool({
    connectionString: process.env.NODE_ENV === "prod" ? prodConfig : devConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
