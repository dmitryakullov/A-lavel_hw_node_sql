const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = new Sequelize('mysql://root:224225226227@localhost/abc');

app.use(bodyParser.json());

const secret = 'mysalt987654321';

class User extends Model{}
User.init({
    username: Sequelize.STRING,
    password: Sequelize.STRING
    }, {sequelize, modelName: 'user'}    
)

app.post('/getData', (req, res) => {
    User.create(req.body);
})

app.get('/', (req, res) => {
    res.sendfile('./public/index.html');
});

app.post('/getId', (req, res) => {
    (async ()=> {
        let thisUser = await User.findByPk(req.body.id);
        if (thisUser) {
            let token = await jwt.sign(thisUser.dataValues, secret);
            res.end(token);
        } else {
            res.end('Нет данных');
        }
        
    })();
})
app.post('/getJWT', (req, res) => {
    let token = req.headers.authorization.slice('Bearer '.length);
    var decoded = jwt.verify(token, secret);
    console.log(JSON.stringify(decoded, null, 4));
})

sequelize.sync();

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});



app.get('/a', function(req, res) {
    console.log(req.headers.authorization);
});

class User {
    static get users(){
        return[
            {id: 1, login: 'Vasya', password: '123'},
            {id: 2, login: 'petya', password: '123'}
        ]
    }
    static find(query){
        return Promise.resolve(User.users.find(user=> user.login ===query.login && user.password ===query.password))
    }
}

app.get('/', function(req, res) {
    const token = req.headers.authorization && req.headers.authorization.slice('Bearer '.length);
    if(tolen) {
        const data = jwt.veryfy(token, secret);
        try {
            if(data) {
                res.send(`<h1>${data.login}</h1>`)
                } else {
                    res.send(`<h1>hacer/h1>`)
                }
        } catch(e){
            res.send(`<h1>Error/h1>`)
        }
    }
    res.send('hello world');
});

app.post('/login', function (req, res) {
    console.log(await User.find({login: req.body.login, password: req.body.password}));
    res.end(JSON.stringify({tocen: iwt.sign({id: user.id, login: user.login}, secret)}));

    app.put('/comment/:id', (req,res) => {
        let tokenData = requestVeryfy(req,secret);
        if (tokenData) {
            // let this.user
        }
    })
});



// fetch("/login",{
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({login: 'Vasya', pas: '123'})
// }).then(a=> a.json()).then()
