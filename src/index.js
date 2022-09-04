import express from 'express';
import {userRouter} from './api';

const app = express();
app.use(express.json());
app.use('./api/user/index.js', userRouter);

// root
app.get('/', function(req, res) {
    res.json('Hello World');
});





app.listen(3000);