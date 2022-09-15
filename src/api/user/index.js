import {Router} from 'express';
import pool from '../../db/index.js';
import {promises} from 'fs';
import bcrypt from 'bcrypt';
import addUser from './adduser.js';

const userRouter = Router();

userRouter.post('/signIn', async (req, res) => {
    try{
        const {email, password} = req.body;
        const sql = await promises.readFile(
            './src/db/sql/user/getHashByEmail.sql',
            'utf-8'
        );
        const result = await pool.query(sql, [email]);
        if(result.rows[0] === undefined) {
            res.status(400).json('Invalid email or password');
            return;
        }
        const hash = result.rows[0].hash;
        const same = await bcrypt.compare(password, hash);
        if(!same) {
            res.status(400).json('Invalid email or password');
            return;
        }
        const sql2 = await promises.readFile(
            './src/db/sql/user/getUserByEmail.sql',
            'utf-8'
        );
        const result2 = await pool.query(sql2, [email]);
        const user = result2.rows[0];
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json('Something went wrong');
    }
});

userRouter.post('/signUp', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(name === '' || email === '' || password === '') {
            res.status(400).json('name, email, or password cannot be empty');
            return;
        }
        const sql = await promises.readFile(
            './src/db/sql/user/getUserByEmail.sql',
            'utf-8'
        );
        const result = await pool.query(sql, [email]);
        if(result.rows[0] !== undefined) {
            res.status(401).json('this email has already been used');
            return;
        }
        let user = await addUser(name, email, password);
        if(Object.keys(user).length === 0) {
            throw new Error();
        }
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json('something went wrong');
    }
});

userRouter.put('/entries', async (req, res) => {
    try {
        const {id} = req.body;
        const sql = await promises.readFile(
            './src/db/sql/user/updateEntries.sql',
            'utf-8'
        );
        const result = await pool.query(sql, [id]);
        const entries = result.rows[0];
        res.status(200).json(entries);
        }
    catch (err) {
        res.status(500).json('Something went wrong');
    }
});

export default userRouter;