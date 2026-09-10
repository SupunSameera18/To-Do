const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Todo = require("./models/Todo");

dotenv.config();

const dbConnectionString = process.env.DB_URI;
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(dbConnectionString)
  .then(() => console.log("Connected to database successfully"))
  .catch((err) => console.error("Error occured: " + err));

function handleError(res, err) {
  console.error("Error occured: " + err);
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).send({ error: "Invalid id" });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send({ error: err.message });
  }
  res.status(500).send({ error: "Internal server error" });
}

app.get("/todos", (req, res) => {
  Todo.find()
    .then((query) => {
      console.log("Database fetched successfully");
      res.send(query);
    })
    .catch((err) => handleError(res, err));
});

app.post("/todos/new", (req, res) => {
  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (!text) {
    return res.status(400).send({ error: "Text is required" });
  }
  Todo.create({ text })
    .then((result) => {
      console.log("Data inserted successfully");
      res.status(201).send(result);
    })
    .catch((err) => handleError(res, err));
});

app.delete("/todos/delete/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ error: "Todo not found" });
      }
      console.log("Item deleted successfully");
      res.send(result);
    })
    .catch((err) => handleError(res, err));
});

app.patch("/todos/complete/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({ error: "Todo not found" });
      }
      return Todo.findByIdAndUpdate(
        req.params.id,
        { status: !todo.status },
        { new: true }
      ).then((result) => {
        console.log("Item updated successfully");
        res.send(result);
      });
    })
    .catch((err) => handleError(res, err));
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
