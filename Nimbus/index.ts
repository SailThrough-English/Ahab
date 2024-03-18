import express, { Request, Response } from 'express';
import simpleGit from 'simple-git';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000; // the port you want to expose

app.use(express.json()); // for parsing application/json

app.post('/', (req: Request, res: Response) => {
    const git = simpleGit();
    const secret = process.env.SECRET; // replace with your secret
    const payloadSecret = req.body.secret; // assuming the secret is sent in the body

    if (!payloadSecret || payloadSecret !== secret) {
        res.status(401).send('Mismatched secrets');
        return;
    }

    git.pull((err, update) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send('Error occurred while pulling');
        } else if (update && update.summary.changes) {
            console.log('Updated:', update);
            res.status(200).send('Updated');
        } else {
            console.log('No update');
            res.status(200).send('No update');
        }
    });
});

app.listen(port, () => {
    console.log(`Expecting a monsoon in ${port}`);
});