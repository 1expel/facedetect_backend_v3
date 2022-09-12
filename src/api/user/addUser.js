import pool from '../../db/index.js';
import bcrypt from 'bcrypt';

const addUser = async () => {
    let success = true;
    let user = {};
    const client = await pool.connect();
    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        await client.query('BEGIN');
        const sql = await fs.promises.readFile(
            './src/db/sql/user/addUser.sql',
            'utf-8'
        );
        const result = await client.query(sql, [req.body.name, req.body.email, new Date()]);
        user = result.rows[0];
        const sql2 = await fs.promises.readFile(
            './src/db/sql/user/addLogin.sql',
            'utf-8'
        );
        await client.query(sql2, [req.body.email, hash]);
        await client.query('COMMIT');
    }
    catch (err) {
        await client.query('ROLLBACK');
        success = false;
    }
    finally {
        client.release();
    } 
    return success, user;
}

export default addUser;