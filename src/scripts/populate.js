import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

const populate = async () => {

    const client = await pool.connect();

    try {

        console.log("beginning txn");
        await client.query('BEGIN');
        


    }
    catch (err) {


    }

}

pool.query('SELECT * FROM users', (err, res) => {

    if(err) {
        console.log(err);
    }
    else {
        console.log(res.rows);
    }
    pool.end();
});

