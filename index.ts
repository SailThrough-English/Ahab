import express, { Request, Response } from 'express';
import simpleGit, { SimpleGitOptions } from 'simple-git';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
import { createHmac } from 'crypto';

dotenv.config();

const app = express();
const port = 3000; // the port you want to expose

app.use(express.json()); // for parsing application/json

app.post('/', (req: Request, res: Response) => {
    const options: SimpleGitOptions = {
        baseDir: process.env.MONITORED_DIR!.toString(),
        binary: '',
        maxConcurrentProcesses: 1,
        config: [],
        trimmed: false
    };
    const git = simpleGit(options);
    const secret = process.env.SECRET; // replace with your secret

    // Get the signature from the headers
    const signature = req.headers['x-hub-signature-256'] || req.headers['x-hub-signature'];

    if (!signature) {
        res.status(401).send('No signature provided');
        return;
    }

    // Create a hash using the payload and the secret
    const hmac = createHmac('sha256', secret!);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

    // Compare the hash with the signature
    if (signature !== digest) {
        res.status(401).send('Mismatched signatures');
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