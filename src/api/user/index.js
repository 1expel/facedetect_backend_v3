import {Router} from 'express';
import bcrypt from 'bcrypt';

const userRouter = Router();
const saltRounds = 10;

// user signs in
userRouter.post('/signIn', async function(req, res) {
    const hash = await bcrypt.hash('123', saltRounds);
    const result = await bcrypt.compare(req.body.password, hash);
    if(req.body.email === 'conk@gmail.com' && result === true) {
        const obj = {
            id: 1,
            name: "conk",
            email: req.body.email,
            entries: 0,
            date: new Date()
        }
        res.status(200).json(obj);
    } else {
        res.status(400).json('could not sign in');
    }
});

// user signs up
userRouter.post('/signUp', async function(req, res) {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const obj = {
        id: 1,
        name: req.body.name,
        email: req.body.email,
        entries: 0,
        date: new Date()
    }
    res.status(201).json(obj);
});

// get user's data
userRouter.get('/:userId', function(req, res) {
    res.json(req.params.id);
});

// get user's entries
userRouter.put('/entries', function(req, res) {
    res.json('entries');
});

export default userRouter;