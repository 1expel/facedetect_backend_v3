import {Router} from 'express';
import bcrypt from 'bcrypt';

const userRouter = Router();
const saltRounds = 10;

// user signs in
userRouter.post('/signIn', async function(req, res) {
    const hash = await bcrypt.hash('123', saltRounds);
    const result = await bcrypt.compare(req.body.password, hash);
    if(req.body.email === 'conk@gmail.com' && result === true) {
        res.json('success');
    } else {
        res.json('could not sign in');
    }
});

// user signs up
userRouter.post('/signUp', async function(req, res) {
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const obj = {
        id: 1,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        entries: 0,
        date: new Date()
    }
    res.json(obj);
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