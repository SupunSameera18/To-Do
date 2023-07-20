import { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./components/ListItem";
import Greet from "./components/Greet";
import AddItem from "./components/AddItem";
import Popup from "./components/Popup";

function App() {
  const [todo, setTodo] = useState([]);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  function showPopup() {
    setPopup(!popup);
  }

  const fetchTodos = () => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        console.log("Data fetched successfully");
        setTodo(res.data);
      })
      .catch((err) => console.error("Error occured: " + err));
  };

  const completeTodo = (id) => {
    axios
      .patch("http://localhost:4000/todos/complete/" + id)
      .then(() => {
        setTodo((prevTodos) =>
          prevTodos.map((todoItem) =>
            todoItem._id === id
              ? { ...todoItem, status: !todoItem.status }
              : todoItem
          )
        );
        fetchTodos();
        console.log("Updated status successfully");
      })
      .catch((err) => console.error("Error occured: " + err));
  };

  const addTodo = (todo) => {
    const todoItem = {
      text: todo,
    };
    axios
      .post("http://localhost:4000/todos/new", todoItem)
      .then((res) => {
        console.log("Todo added successfully:", res.data);
        fetchTodos();
      })
      .catch((err) => console.error("Error occurred: " + err));
  };

  return (
    <div className="mt-5">
      <Greet />
      <h2 className="text-center">Here is your todo list.</h2>
      <div className="todo-list mx-auto mt-5">
        {todo.map((item) => (
          <ListItem
            key={item._id}
            id={item._id}
            isCompleted={item.status}
            text={item.text}
            onComplete={() => completeTodo(item._id)}
          />
        ))}
      </div>
      <AddItem handleAdd={() => showPopup()} />
      {popup && <Popup handleClose={showPopup} handleAdd={addTodo} />}
    </div>
  );
}

export default App;
