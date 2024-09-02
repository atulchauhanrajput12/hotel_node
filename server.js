const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body



app.get('/', function (req, res) {
    res.send('welcome to my hotel.....How i can help you ?, we have list of menus')
})

//Import the Router files
const personRoutes = require('./routes/personRoutes');
//use the routers
app.use('/person', personRoutes);

        
app.listen(3000,() =>{
    console.log('listening on port 3000');
})