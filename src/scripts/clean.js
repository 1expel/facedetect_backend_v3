import pg from 'pg';
import dotenv from 'dotenv';
import { promises } from 'fs';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

const clean = async () => {
    console.log('trying to clean database');
    console.log('trying to delete tables');
    const sql = await promises.readFile(
        './src/db/sql/core/deleteTables.sql',
        'utf-8'
    );
    try {
        await pool.query(sql);
        console.log("tables deleted");
    }
    catch (err) {
        console.log(err);
    }
    console.log('trying to create tables');
    const sql2 = await promises.readFile(
        './src/db/sql/core/createTables.sql',
        'utf-8'
    );
    try {
        await pool.query(sql2);
        console.log("tables created");
    }
    catch (err) {
        console.log(err);
    }
    console.log('database successfully cleaned');
}

await clean();
process.exit();
