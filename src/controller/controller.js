const todoDb = require('../models/model')

// create and save new todos
exports.create = (req, res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: 'You must specify value for the todo'})
        return;
    }

    // create new todo
    const todo = new todoDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save new todo to DB
    todo
        .save(todo)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({message: err.message || 'There was an error while creating the todo'}))
}

// find all todos or a sigle todos with matching id
exports.find = (req, res)=>{
    const id = req.query.id;
    if(id){
        todoDb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: 'The todo with the ' + id + ' cannot be found'})
            }else{
                res.send(data);
            }
        })
        .catch(err => res.status(500).send(err.message))
    }else{
        todoDb.find()
        .then(user => res.send(user))
        .catch(err => res.status(500).send({message: err.message || 'Could not fetch todos'}))
    }
}

// update a todo with a matching id
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({message: 'data can not be updated with empty strings'})
    }
    
    const id = req.params.id;
    todoDb.findByIdAndUpdate(id, req.body,)
    .then(data  =>{
        if(!data){
            res.status(404).send({message: `Cannot update todo with id: ${id}, maybe todo not found`})
        }else{
            res.send(data);
        }
       
    })
    .catch(err => res.status(500).send({message: 'Error updating todo information'}))
}

// delete a todo with a matching id
exports.delete = (req, res)=>{
    const id = req.params.id;
    todoDb.findByIdAndDelete(id, req.body,)
    .then(data  =>{
        if(!data){
            res.status(404).send({message: `Cannot delete todo with id: ${id}, maybe todo not found`})
        }else{
            res.send({message: 'The todo was successfully deleted'});
        }
       
    })
    .catch(err => res.status(500).send({message: 'Error deleting todo information'}))
}