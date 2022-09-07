import pool from '../db/index.js';
import fs from 'fs';

const clean = async () => {
    try {
        console.log('trying to clean database');
        const sql = await fs.promises.readFile(
            './src/db/sql/core/deleteTables.sql',
            'utf-8'
        );
        await pool.query(sql);
        const sql2 = await fs.promises.readFile(
            './src/db/sql/core/createTables.sql',
            'utf-8'
        );
        await pool.query(sql2);
        console.log('database successfully cleaned');
    }
    catch (err) {
        console.log(err);
    }
}

await clean();
process.exit();
