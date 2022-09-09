import express from 'express';
import cors from 'cors';
import {userRouter, clarifaiRouter} from './api/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/clarifai', userRouter);

// root
app.get('/', function(req, res) {
    res.json('Hello World');
});





app.listen(3001);