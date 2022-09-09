import express from 'express';
import cors from 'cors';
import {userRouter, clarifaiRouter} from './api/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/clarifai', clarifaiRouter);

// root
app.get('/', function(req, res) {
    res.json('Hello World');
});

app.listen(process.env.EXPRESS_PORT);