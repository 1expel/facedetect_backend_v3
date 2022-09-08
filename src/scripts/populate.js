import pool from '../db/index.js';
import fs from 'fs';
import users from '../assets/users.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const populate = async (user) => {
    const client = await pool.connect();
    try {
        const hash = await bcrypt.hash(user.password, saltRounds);
        console.log('beginning txn');
        await client.query('BEGIN');
        const sql = await fs.promises.readFile(
            './src/db/sql/user/addUser.sql',
            'utf-8'
        );
        await client.query(sql, [user.name, user.email, new Date()]);
        const sql2 = await fs.promises.readFile(
            './src/db/sql/user/addLogin.sql',
            'utf-8'
        );
        await client.query(sql2, [user.email, hash]);
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

for (const user of users) {
    populate(user);
}
