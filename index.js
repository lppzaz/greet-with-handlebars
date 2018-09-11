'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const pg = require('pg')
const bodyParser = require('body-parser');
const app = express();
const greetMe = require('./greet');
const PORT = process.env.PORT || 3100;

app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        // 'formattedDate': function () {
        //     return moment(this.billTime).fromNow();
        // }
    }
}));
//set up database requirements
const Pool = pg.Pool;
let useSSL = false;
if (process.env.DATABASE_URL){
useSSL = true;
}
const connectionString = process.env.DATABASE_URL ||'postresql://cobus:cobus123@localhost:5432/greetings'
//triggering database request actions(open connection to db)
const pool = new Pool({
    //local environment only:
    //connectionString:'postresql://Cobus:Cobus123@@localhost:5432/greetings'
    // ssl: false

    //deployment ready environment(local+remote)
    connectionString,
    ssl: useSSL
})

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const greeter = greetMe(pool)

// home route
app.get('/', async function (req, res) {
    try {
        var context = {
            counter: await greeter.counter()
        }
        console.log(context.counter);
        
        res.render('home', context);
    } catch (err) {
        console.log(err);   
    }
});

//greet route
app.post ('/greet', async function(req,res){
    let name = req.body.name;
    let lang = req.body.Language;

    res.render('home',{
        greeting: await greeter.greetMe(name,lang),
        counter: await greeter.counter()
    })
});

app.get('/reset', function(req,res){
    greeter.clear()
    res.redirect("/")
});

app.get('/greetingz', async function(req,res){
    try {
        var counter = await greeter.counter()
        console.log (counter)
        res.render('greeted',{
            greetingz:await greeter.nameMap()
         
        })
    } catch (err) {
        console.log(err.stack);
    }
})


app.listen(PORT, function () {
    console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});