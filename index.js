const express = require('express');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("App is running");
})