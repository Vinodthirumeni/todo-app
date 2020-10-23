import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo.js";
import db from "./firebase";
import firebase from "firebase";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [getname, setGetName] = useState("");
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            doc: doc.data(),
          }))
        )
      );
  }, []);
  useEffect(() => {
    const name = prompt("Please enter you name...");
    if (name) {
      setGetName(name);
    } else {
      alert("Please enter your name...");
      window.location.reload();
    }
  }, []);
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      text: input,
      name: getname,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <h1>{`Hi ${getname} Welcome....`}</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo
            id={todo.id}
            text={todo.doc.text}
            name={todo.doc.name}
            timestamp={todo.doc.timestamp}
          />
        ))}
      </ul>
    </div>
  );
}
export default App;
