import pool from '../db/index.js';
import {promises} from 'fs';
import users from '../assets/users.js';
import addUser from '../api/user/addUser.js';

const populate = async (userData) => {
    try {
        const {name, email, password} = userData;
        if(name === '' || email === '' || password === '') {
            console.log('name, email, or password cannot be empty')
            return;
        }
        const sql = await promises.readFile(
            './src/db/sql/user/getUserByEmail.sql',
            'utf-8'
        );
        const result = await pool.query(sql, [email]);
        if(result.rows[0] !== undefined) {
            console.log('failed, ', email, ' has already been used');
            return;
        }
        let user = await addUser(name, email, password);
        if(Object.keys(user).length === 0) {
            throw new Error();
        }
        console.log('populated ', user.name);
    }
    catch (err) {
        console.log('an error has occured');
    }
}

for (const user of users) {
    populate(user);
}
