const e = require("express");
const express = require("express");
const app = express();

app.use(express.json());
const todos = [];
app.get("/", (req, res) => {
  res.send({ todos });
});

app.post("/", (req, res) => {
  try {
    const todo = req.body;
    const { task } = todo;
    let max = 0;
      todos.forEach((ele) => {
        max = Math.max(max, ele.id);
      });
    
    let data = {
      id: max + 1,
      task,
    };
    todos.push(data);
    return res.send("todo has been added");
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
});

app.put('/:id',(req,res)=>{
    let tmp=null;
    let changeTodo=todos.find((ele,index)=>{
        if(ele.id==req.params.id){
            tmp=index
            return ele.id==req.params.id
        }
    })
    changeTodo={...changeTodo,...req.body}
    res.send(changeTodo)
    todos[tmp]=changeTodo
    res.send("todo has been updated")
})

app.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let index=null;
    todos.forEach((todo,i)=>{
        if(todo.id==id){
            index=i;
        }
    })
    if(index==null){
        return res.status(404).send('the todo does not exist');
    }else{
        todos.splice(index,1)
        return res.send("todo has been deleted")
    }
})

app.listen(8080, () => {
  console.log("server started on http://localhost:8080");
});
