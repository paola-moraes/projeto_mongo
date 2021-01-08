    const express = require("express");
    const app = express();
    const handlebars = require("express-handlebars");
    const bodyParser = require("body-parser");

    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    /*--------------------------------------------------Conexão banco----------------------------------------------------------------------------- */
    const mongoose = require('mongoose');
    const port = 5000;
    const uri = "mongodb+srv://dbPaola:dbPaola@cluster0.nnsew.mongodb.net/dados?retryWrites=true&w=majority"
    mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    });
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    });
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });


    /*--------------------------------------------------Rotas de telas----------------------------------------------------------------------------- */
    app.get('/', function(req, res){
        res.render("cadastro");
    });

    app.get('/cadastro', function(req, res){
        res.render("cadastro");
    });

    app.get('/consulta', function(req, res){
        res.render("consulta");
    });


    /*--------------------------------------------------Rotas de acesso ao banco----------------------------------------------------------------------------- */
    const router = require('express').Router();
    let UserModel = require('./user.model');

    app.post('/cons', function(req, res) {
        UserModel.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    });
    
    app.post('/add', function(req, res) {
        const username = req.body.username;
        const newUser = new UserModel({ username });
    
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        
        res.render("consulta");
    })
    
    app.listen(8080);