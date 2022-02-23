const express = require('express');
const router = express.Router();

const Task = require('../../model/task');

router.get('/api/tasks',(req,res)=>{
    if(req.query.filterByUuid){
        Task.find({uuid:req.query.filterByUuid})
        .then(result=>{
            if(result.length>0) res.status(200).send(result);
            else res.sendStatus(404);            
        })
        .catch(error =>{
            res.status(404).send(error);
        })
    }else{
        Task.find()
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(error=>{
            res.status(404).send(error);
        })
    }
    
})

router.get('/api/tasks/:id',(req,res)=>{
    const id = req.params.id;

    Task.findById(id)
    .then((result)=>{
        if(result) res.status(200).send(result);
        else res.sendStatus(404);
    })
    .catch(error=>{
        res.status(404).send(error);
    })
    
})

router.post("/api/tasks",(req,res)=>{
    const task = new Task(req.body);

    task.save()
    .then((result) => {
        res.status('201').send(result);
    })
    .catch((error)=>{
        res.status('401').send(error);
    })
})

router.put('/api/tasks/:id',(req,res)=>{
    const id = req.params.id;
    Task.findByIdAndUpdate(id,{
        title:req.body.title,
        isCompleted:req.body.isCompleted,
        uuid:req.body.uuid
    },{new:true},function(err,result){
        if(err) res.status(400).send(err);

        res.status(201).send(result);
    })
    
})

module.exports = router;