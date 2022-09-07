import pool from '../db/index.js';
import fs from 'fs';

const populate = async () => {
    const client = await pool.connect();
    try {
        console.log('beginning txn');
        await client.query('BEGIN');
        const sql = await fs.promises.readFile(
            './src/db/sql/user/addUser.sql',
            'utf-8'
        );
        await client.query(sql, ['conk', 'conk3@gmail.com']);
        const sql2 = await fs.promises.readFile(
            './src/db/sql/user/addLogin.sql',
            'utf-8'
        );
        await client.query(sql2, ['conk@gmail.com', '123']);
        await client.query('COMMIT');
        console.log('finished txn');
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
    }
    finally {
        client.release();
    }
}

await populate();
process.exit();
