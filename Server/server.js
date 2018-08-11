const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mysql');
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const sqlite3 = require('sqlite3').verbose();
/**/
http.listen(3000);
/*
db.all('', [], (err, rows) => {
    if (err) {
        console.log(err);
    }
    data.data = rows;
});
*/
//database config

//database connection
const db = new sqlite3.Database('./db/chat.db', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected')
    }
});

//express config

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.get('/msgs/:from/:to', (req, res) => {

    db.all('select * from msgs where to_id = ? and from_id = ? or to_id = ? and from_id = ?', [req.params.from, req.params.to, req.params.to, req.params.from], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });

});

app.post('/msg/:to', (req, res) => {

    db.run('insert into msgs(from_id,to_id,text) values(?,?,?)', [req.body.id, req.params.to, req.body.text], (err) => {

        if (err) {
            console.log(err);
        } else {
            res.json({
                msg: 'succses'
            });


        }

    });


});



app.post('/signup', (req, res) => {

    db.all('select * from users where email = ?', [req.body.email], (err, row) => {

        if (err) {
            console.log(err);
        } else {
            if (row.length == 0) {

                db.run('insert into users (name,email,pass) values(?,?,?)', [req.body.name, req.body.email, req.body.pass], (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            error: false,
                            msg: 'success'
                        });
                    }
                });
            } else {
                res.json({
                    error: true,
                    errormsg: 'Email already exists'
                });
            }
        }

    });


});



app.post('/login', (req, res) => {

    db.all('select * from users where email = ? and pass = ?', [req.body.email, req.body.password], (err, row) => {

        if (err) {
            console.log(err);
        } else {
            if (row.length == 0) {
                res.json({
                    error: true,
                    errormsg: 'Wrong email or password'
                });
            } else {

                res.json({
                    error: false,
                    user: row
                });
            }
        }

    });

});


app.get('/users', (req, res) => {

    db.all('select id,name from users', [], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });

});

app.get('/user/:id', (req, res) => {

    db.all('select id,name from users where id = ?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }

    });

});
//SELECT count(*),to_id FROM `msgs` WHERE from_id = 2 or to_id = 2 GROUP BY to_id
app.get('/chats/:id', (req, res) => {

    db.all('SELECT to_id,name FROM msgs LEFT OUTER JOIN users on users.id = to_id WHERE from_id = ? OR to_id = ? GROUP BY to_id', [req.params.id, req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });

});

app.get('/sound', (req, res) => {

    res.sendFile(__dirname + '/sound.mp3');

});

io.on('connection', (socket) => {
    console.log('connect');
    socket.on('hello', (d) => {
        console.log(d);
        setTimeout(() => {

            getLast(d.id, d.to, socket);
        }, 300);
    });
});


function getLast(from, to, socket) {
    let data = {};

    db.all('select * from msgs where to_id = ? and from_id = ? or to_id = ? and from_id = ? order by id DESC', [to, from, from, to], (err, rows) => {

        if (err) {
            console.log(err);
        } else {
            data = rows[0];
            io.sockets.emit('msg', data);
        }
    });

}
