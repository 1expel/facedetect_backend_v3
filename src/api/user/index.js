import {Router} from 'express';
import pool from '../../db/index.js';
import fs from 'fs';
import bcrypt from 'bcrypt';

const userRouter = Router();
const saltRounds = 10;

// user signs in
userRouter.post('/signIn', async (req, res) => {
    try{
        const sql = await fs.promises.readFile(
            './src/db/sql/user/getHashByEmail.sql',
            'utf-8'
        );
        const result = await pool.query(sql, ['user0@gmail.com']);
        const hash = result.rows[0].hash;
        const same = await bcrypt.compare(req.body.password, hash);
        if(!same) {
            throw new Error();
        }
        const sql2 = await fs.promises.readFile(
            './src/db/sql/user/getUserByEmail.sql',
            'utf-8'
        );
        const result2 = await pool.query(sql2, [req.body.email]);
        const user = result2.rows[0];
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({})
    }
});

// user signs up
userRouter.post('/signUp', async (req, res) => {
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
        if(success) {
            res.status(201).json(user);
        }
        else {
            res.status(400).json({})
        }  
    } 
});

// get user's entries
userRouter.put('/entries', async (req, res) => {
    try {
        const sql = await fs.promises.readFile(
            './src/db/sql/user/getUserById.sql',
            'utf-8'
        );
        const result = await pool.query(sql, [req.params.id]);
        res.status(200).json(result.rows[0]);
        }
    catch (err) {
        res.status(400).json({});
    }
});

export default userRouter;