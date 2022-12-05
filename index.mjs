import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';

import { signin_user } from './function.mjs';

const { Client } = pg;

const client = new Client({
    database: 'lokkeroom',
    host: 'localhost',
    port: 5432,
    user: 'lokkeroom_admin',
    password: '123abc',
})

const btn_submit = document.querySelector('btn_submit');

client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
        client.query("CREATE TABLE if not exists users( id SERIAL PRIMARY KEY, email VARCHAR (50) UNIQUE, password VARCHAR (50))", (err, res) => {
            if (err) throw err
            console.log(res);
        });
    }
})

btn_submit.addEventListener('onclick', signin_user);



