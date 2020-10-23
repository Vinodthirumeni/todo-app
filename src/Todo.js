import React, { useState } from "react";
import "./Todo.css";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import db from "./firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Todo({ id, text, name, timestamp }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const deleteTodo = (e) => {
    e.preventDefault();
    const deleteit = window.confirm(
      "Are you sure,You want to delete the data?"
    );
    if (deleteit) {
      db.collection("todos").doc(id).delete();
    }
  };
  const updateTodo = (e) => {
    e.preventDefault();

    db.collection("todos").doc(id).set(
      {
        text: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="todoModal">
            <h1>Edit</h1>
            <input
              placeholder={text}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              disabled={!input}
              variant="contained"
              color="primary"
              type="submit"
              onClick={updateTodo}
            >
              Update Me
            </Button>
          </form>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={text}
            secondary={`Sent by ${name} on ${new Date(
              timestamp?.toDate()
            ).toUTCString()} `}
          />
        </ListItem>
        <EditIcon className="todo__icon" onClick={(e) => setOpen(true)}>
          Edit Me
        </EditIcon>
        <DeleteIcon className="todo__icon" onClick={deleteTodo} />
      </List>
    </>
  );
}
export default Todo;
