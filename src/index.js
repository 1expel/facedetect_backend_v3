import express from 'express';
import cors from 'cors';
import {userRouter} from './api/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);

// root
app.get('/', function(req, res) {
    res.json('Hello World');
});





app.listen(3001);