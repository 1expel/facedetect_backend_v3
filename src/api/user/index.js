import {Router} from 'express';
import pool from '../../db/index.js';
import fs from 'fs';
import bcrypt from 'bcrypt';

const userRouter = Router();
const saltRounds = 10;

// user signs in
userRouter.post('/signIn', async function(req, res) {
    const hash = await bcrypt.hash('123', saltRounds);
    const result = await bcrypt.compare(req.body.password, hash);
    if(req.body.email === 'conk@gmail.com' && result === true) {
        const obj = {
            id: 1,
            name: "conk",
            email: req.body.email,
            entries: 0,
            date: new Date()
        }
        res.status(200).json(obj);
    } else {
        res.status(400).json('could not sign in');
    }
});

// user signs up
userRouter.post('/signUp', async function(req, res) {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const client = await pool.connect();
    let success = true;
    let result;
    try {
        console.log('beginning txn');
        await client.query('BEGIN');
        const sql = await fs.promises.readFile(
            './src/db/sql/user/addUser.sql',
            'utf-8'
        );
        result = await client.query(sql, [req.body.name, req.body.email, new Date()]);
        const sql2 = await fs.promises.readFile(
            './src/db/sql/user/addLogin.sql',
            'utf-8'
        );
        await client.query(sql2, [req.body.email, hash]);
        await client.query('COMMIT');
        console.log('finished txn');
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
        success = false;
    }
    finally {
        client.release();
        if(success) {
            res.status(201).json(result.rows[0]);
        }
        else {
            res.status(400).json({})
        }  
    } 
});

// get user's data
userRouter.get('/:userId', function(req, res) {
    res.json(req.params.id);
});

// get user's entries
userRouter.put('/entries', function(req, res) {
    res.json('entries');
});

export default userRouter;