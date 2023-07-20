const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://0.0.0.0:27017/To-Do-App")
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.error("Error occured: " + err));

app.get("/todos", (req, res) => {
  Todo.find()
    .then((query) => {
      console.log("Database fetched successfully");
      res.send(query);
    })
    .catch((err) => console.log("Error occured: " + err));
});

app.post("/todos/new", (req, res) => {
  const newTodo = {
    text: req.body.text,
  };
  Todo.create(newTodo)
    .then((result) => {
      console.log("Data inserted successfully");
      res.send(result);
    })
    .catch((err) => console.error("Error occured: " + err));
});

app.delete("/todos/delete/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => console.log("Item deleted successfully"))
    .catch((err) => console.error("Error occured: " + err));
  res.redirect("/todos");
});

app.patch("/todos/complete/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((result) =>
      Todo.findByIdAndUpdate(req.params.id, { status: !result.status })
        .then((result) => {
          console.log("Item updated successfully");
          res.send(result);
        })
        .catch((err) => console.error("Error occured: " + err))
    )
    .catch((err) => console.error("Error occured: " + err));
});

app.listen("4000", () => {
  console.log("Server started on port 4000");
});
