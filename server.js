const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
const knex = require('knex');

const app = Express();
app.use(BodyParser.json())
app.use(Cors())


const db = knex(
    {
        client : 'pg',
        connection : {
            host : 'localhost',
            user : 'postgres',
            password : 'aira2018',
            database : 'eventRegister'
        }
    }
);
db.select('*').from('visitors').then(data => console.log(data[0]));

app.listen(3001, () => {
    console.log('app is working')
});
app.get('/',(req,res)=>{
    res.json(visitors)
});

app.post('/register', (req,res)=>{
    console.log('in server',req.body)
    const {name, email, address} = req.body;
    db('visitors').returning('*').insert({
        name : name,
        address : address,
        email : email,
    }).then(user => {
        console.log(user)
        res.status(200).json(user[0])
    })
})
