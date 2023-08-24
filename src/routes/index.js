const dotenv = require("dotenv");
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

dotenv.config();

router.post('/login', (req, res) => {
    const {user, password} = req.body;
    if (user == 'admin' && password == 'admin' ){
        const userId = 1;
        const token = jwt.sign({ userId, user }, 
        process.env.SECRET, { expiresIn: 300 });


        return res.status(200).send({ Authorize: true, token: token });
    }
    res.status(500).send({ message: "erro ao acessa o banco de dados."});
});

router.get('/React_pet/', (req, res) => {
    res.status(200).send({
        success : 'true',
        message: " Olá, Seja bem vindo!",
        project: "PET",
     })  
})

module.exports = router;



