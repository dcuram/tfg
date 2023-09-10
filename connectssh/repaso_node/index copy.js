
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = require('./config/enviroment');
const routesCommands = require('./routes/shellCommand');



const app = express();
console.log('Proyecto node !!!!');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Habilitar cors

app.use( cors() );

app.get('/', function( req, res) {

    let data = {
        mensaje: "Primera url"
    }
    res.json(data).status(200);
}); 

app.use('/shell', routesCommands.appCommands );

app.listen( port, () => {
    console.log(`listen port http://localhost:${port}/`);
})