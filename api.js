const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// const todos = [{
//     id: 1,
//     title: "eren",
//     isComplated: false,
//     date: new Date()
// }
// ];

const todos = [];
let id = 0;

app.get("/todo-api/todos", (req,res) => {
    res.json(todos);
});

app.post("/todo-api/todos/create", (req, res)=>{
    const body = req.body;
    id++;
    const data = {
        id: id,
        title: body.title,
        isComplated: false,
        date: new Date()
    }
    todos.push(data);
    res.json({message: "Create is succes"});
});

app.post("/todo-api/todos/update", (req,res) => {
    const body = req.body;
    const index = todos.findIndex(p=> p.id===+body.id);
    if(index === -1){
        res.status(500).json({message: "This record you want to delete was no found!"});
    }
    else{
        todos[index].title = body.title;
        res.json({message: "Update is succes"});
    }
});

app.get("/todo-api/todos/remove/:id", (req,res) => {
    const id = req.params.id;
    const index = todos.findIndex(p=> p.id === +id);
    if(index === -1) res.status(500).json({message: "The reacord you want to delete was no found!"});
    else{
        todos.splice(index,1);
        res.json({message: "Remove is successful"});
    }
});

app.post("/todo-api/todos/isComplated", (req,res) => {
    const body = req.body;
    const index = todos.findIndex(p=> p.id===+body.isComplated);
    if(index === -1){
        res.status(500).json({message: "This record you want to delete was no found!"});
    }
    else{
        todos[index].isComplated = body.isComplated;
        res.json({message: "Update is succes"});
    }
});


app.listen(5000,()=> console.log("api running"));