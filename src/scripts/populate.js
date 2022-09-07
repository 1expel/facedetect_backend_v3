import pg from 'pg';

const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

pool.query('select * from users', (err, res) => {
    console.log(err, res);
    pool.end();
});