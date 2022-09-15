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

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Face Detect is running on port ', port);
});
