const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const DBURL = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@restful-api.npkmz.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

const tasks = require('./api/tasks/tasks')

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.all('/api/tasks*',tasks);

mongoose.connect(DBURL)
.then((result)=>{    
    app.listen(process.env.PORT || 3000,()=>{
        console.log("Listening on port 3000");
    })
})
.catch((error)=>{
    console.log(error);
})