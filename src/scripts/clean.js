import { promises } from 'fs';
import pool from '../db/index.js';

const clean = async () => {

    console.log("trying to clean database");

    const sql = await promises.readFile(
        './src/db/sql/core/deleteTables.sql',
        'utf-8'
    );

    


}
