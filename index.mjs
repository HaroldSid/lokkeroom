import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/user.mjs'

const { Client } = pg;
const app = express();

const helloCons = () => {
    console.log("hello");
}

app.use(bodyParser.json());

app.use('/api', router);

app.listen(3000, helloCons);


