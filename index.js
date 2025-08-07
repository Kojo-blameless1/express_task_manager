const express = require('express');
const app = express();

app.use(express.json());
let tasks = [
    {
        id: 1,
        title: 'kdot',
        completed: false,
    },
    {
        id: 2,
        title: 'sleep',
        completed: false,
    }
];
let idCounter =tasks.length +1 ;

//creating a task using  post
app.post('/tasks',(req,res)=>{
    const {title} = req.body;
    console.log(req.body)
    //checking to see if task already exist
    for(let i = 0;i <= tasks.length-1; i++){
        if(tasks[i].title === title){
            return res.json({message: 'Task already Exist'})
        }

    }
    const newtask = {id: idCounter++, title,completed: false}
    tasks.push(newtask);
    res.json(tasks);
})
//get request that returns all the tasks
app.get('/tasks',(req,res)=>{
    if(tasks.length === 0 ){
        return res.json({message: 'Your task list is empty'})
    }
    res.json(tasks)
})

//Get task by id
app.get('/tasks/:id',(req,res)=>{
    const task = tasks.find(t => t.id === parseInt(req.params.id) );
    if(!task){
        return res.status(404).json({error: 'task not fount'})   
    }
    res.json(task)
})

//update a taskto completed  using put
app.put('/tasks/:id',(req,res) =>{
    let task = tasks.find(t => t.id === parseInt(req.params.id))
    if(!task){
        return res.status(404).json({error : 'Task not fount'})
    }
    const {title,completed} = task ;
    if(title !== undefined)task.title =title;
    if(completed !== undefined)task.completed = true;
    console.log(task.completed,task.title)
     
    res.json(task)
})

//deletind a task 
app.delete('/tasks/:id',(req,res)=>{
    let index = tasks.findIndex(t=> t.id === parseInt(req.params.id))
    if(index === -1)return res.json({error:'task not found'})

    const deleted = tasks.splice(index,1);
    
    res.json(deleted)
    
    
    
})
const PORT = 300;
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})