import express, { Router } from "express";
import pg from 'pg';

const router = express.Router();
const { Client } = pg;

let usersObj = new Array();
let users = [];
let user;

const client = new Client({
    database: 'lokkeroom',
    host: 'localhost',
    port: 5432,
    user: 'lokkeroom_admin',
    password: '123abc',
})

const getUsers = (resBE) => {
    client.query("SELECT * FROM users;", (err, resDB) => {
        if (err) throw err;
        usersObj = resDB;
        users = usersObj.rows;
        resBE.json(users);
    });
}

const getUser = (resBE, id) => {
    client.query(`SELECT * FROM users WHERE id = ${id};`, (err, resDB) => {
        if (err) throw err;
        user = resDB.rows;
        resBE.json(user);
    });
}

const getUsersLobby = async (idLob) => {
    try {
        let userlobby;
        userlobby = await client.query(`SELECT * FROM profile_lobby WHERE id_lobbys = ${idLob}`);
        return userlobby.rows;
    }
    catch (err) {
        throw err;
    }    
}

const getDelete = (res, id) => {
    client.query(`DELETE FROM users WHERE id = ${id};`, (err, resp) => {
        if (err) throw err;
    });
}


client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
})

router.get('/users', (req, res) => {
    getUsers(res);
})

router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    getUser(res, id);
})

router.get('/lobby/:idLob', async (req, res) => {
    const idLob = req.params.idLob;
    const usersLobby = await getUsersLobby(idLob);
    const tokenUser = req.headers.authorization.split(' ')[1];
    let userinLobby = false;
    for (let userLobby of usersLobby) {
        if (tokenUser == userLobby.id_profiles) {
            userinLobby = true;
            console.log(userinLobby)
        }
    }
    if (userinLobby) {
        client.query(`SELECT message FROM messages WHERE id_lobbys = ${idLob};`, (err, resp) => {
            if (err) throw err;
            res.json(resp.rows);
        });
    }
    else {
        res.send("mauvais token looooooooooooser");
    }
})

router.get('/lobby/:idLob/:idMes', async(req, res) => {
    const idLob = req.params.idLob;
    const idMes = req.params.idMes;
    const tokenUser = req.headers.authorization.split(' ')[1];
    const usersLobby = await getUsersLobby(idLob);
    let userinLobby = false;
    for (let userLobby of usersLobby) {
        if (tokenUser == userLobby.id_profiles) {
            userinLobby = true;
            console.log(userinLobby)
        }
    }
    if (userinLobby) {
        client.query(`SELECT message FROM messages WHERE id_lobbys = ${idLob} AND id = ${idMes};`, (err, resp) => {
            if (err) throw err;
            res.json(resp.rows);
        });
    }
    else {
        res.send("mauvais token looooooooooooser");
    }
})

router.get('/users/lobby/:idLob', async (req, res) => {
    const idLob = req.params.idLob;
    const usersLobby = await getUsersLobby(idLob);
    const tokenUser = req.headers.authorization.split(' ')[1];
    let userinLobby = false;
    for (let userLobby of usersLobby) {
        if (tokenUser == userLobby.id_profiles) {
            userinLobby = true;
            console.log(userinLobby)
        }
    }
    if (userinLobby) {
        client.query(`SELECT id_users FROM profile_lobby WHERE id_lobbys = ${idLob};`, (err, resp) => {
            if (err) throw err;
            res.json(resp.rows);
        });
    }
    else {
        res.send("mauvais token looooooooooooser");
    }
})

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    client.query(`INSERT INTO users (email, password) VALUES ('${email}', '${password}');`)
    res.send(`the user ${email} has been created`);
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    client.query(`SELECT * FROM users WHERE  email = '${email}' AND password = '${password}';`, (err, resp) => {
        if (err) throw err;
        user = resp.rows;
        if (user != null)
        {
            res.send(`token ${email}token est créé`);    
        }
    });
})

router.post('/lobby/:idLob', async(req, res) => {
    const idLob = req.params.idLob;
    const { message } = req.body;
    const tokenUser = req.headers.authorization.split(' ')[1];
    const usersLobby = await getUsersLobby(idLob);
    let userinLobby = false;
    for (let userLobby of usersLobby) {
        if (tokenUser == userLobby.id_profiles) {
            userinLobby = true;
            console.log(userinLobby)
        }
    }
    if (userinLobby == true) {
        client.query(`INSERT INTO messages ( id_lobbys , id_profiles , message) VALUES ('${idLob}', '${tokenUser}', '${message}');`);
        res.send("votre message est enregistré")
    }
    else {
        res.send("vous n'avez pas le droit d'être ici...Salaud")
    }
})

router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    getDelete(res, id);
    getUsers(res);
})



export default router;