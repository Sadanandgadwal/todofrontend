import "./App.css";
import { useState, useEffect } from "react";
// import axios from "axios";

const API_BASE = "https://todoapi-production-db90.up.railway.app";
function App() {
  const [todos, setTodos] = useState([]);

  const [popupActive, setPopupActive] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("error", err));
  };

  const completeTodo = async (id) => {
    await fetch(API_BASE + "/todo/" + id, {
      method: "PATCH",
    }).then();
    window.location.reload();
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const res = await fetch(API_BASE + "/todo/" + id, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log(data);
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
    window.location.reload();
  };

  return (
    <>
      <div className="App">
        <h1>welcome, Sadanand</h1>
        <h4>Your Task</h4>
        <div className="todos">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div
                className={"todo" + (todo.complete ? " is-complete" : "")}
                key={todo._id}
              >
                <div
                  className="checkbox"
                  onClick={() => completeTodo(todo._id)}
                ></div>

                <div className="text">{todo.text}</div>

                <button
                  className="delete-todo"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTodo(todo._id);
                  }}
                >
                  x
                </button>
              </div>
            ))
          ) : (
            <p>You currently have no tasks</p>
          )}
        </div>

        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div>
        {popupActive ? (
          <div className="popup">
            <div className="closepopup" onClick={() => setPopupActive(false)}>
              x
            </div>
            <div className="content">
              <h3>Add Task</h3>

              <input
                type="text"
                className="add-todo-input"
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <div className="button" onClick={addTodo}>
                Create Task{" "}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
