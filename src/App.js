import React, { useState, useReducer } from "react";
import "./App.css";
import { Card } from "semantic-ui-react";

import { initialState, todoReducer } from "./reducer/todoReducer";

function App() {
  const [todo, setTodo] = useState("");
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleChange = e => {
    setTodo(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: "add-todos", payload: todo });
    setTodo("");
  };

  return (
    <div className="App">
      <h1>Reduce Your Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="todo"
          value={todo}
          onChange={handleChange}
          placeholder="Enter a todo..."
        />
        <button type="submit">Zang!</button>
      </form>

      <button onClick={() => dispatch({ type: "clear-todos" })}>
        Clear 'em
      </button>
      <div className="card-container">
        {state.todos.map(todo => (
          <Card
            key={todo.id}
            onClick={() => dispatch({ type: "toggle-todos", payload: todo })}
          >
            <p>{todo.item}</p>
            <p>Done yet? {todo.completed ? "Yep" : "Nope"}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
