const express = require("express");
const cors = require("cors");

const app = express();

const index = require("./routes/index");
const cadastroPets = require("./routes/cadastropet.routes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index); 
app.use('/api/v1/', cadastroPets);
//http://localhost:3000/api/v1/listpets

module.exports = app; 






