import { useDispatch } from "react-redux";
import { useState } from "react";
import { addTodo } from "../actions/add-todo";
import { deleteTodo } from "../actions/delete-todo";
import { changeTodo } from "../actions/change-todo";

export const useAddDeleteChangeTodos = () => {
  const dispatch = useDispatch();
  const [updateAddTodos, setUpdateAddTodos] = useState(false);
  const [updateDeleteTodos, setUpdateDeleteTodos] = useState(false);
  const [updateChangeTodos, setUpdateChangeTodos] = useState(false);

  const handleAddTodo = (todo) => {
    setUpdateAddTodos(true);
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(todo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при добавлении задачи");
        }
        return response.json();
      })
      .then((newTodo) => {
        dispatch(addTodo(newTodo));
        setUpdateAddTodos(false);
      })
      .catch((error) => {
        console.error(error.message);
        setUpdateAddTodos(false);
      });
  };

  const handleDeleteTodo = (id) => {
    setUpdateDeleteTodos(true);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Ошибка при удалении задачи с ID ${id}: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(() => {
        dispatch(deleteTodo(id));
        setUpdateDeleteTodos(false);
      })
      .catch((error) => {
        console.error(error.message);
        setUpdateDeleteTodos(false);
      });
  };

  const handleChangeTodo = (id, newData) => {
    setUpdateChangeTodos(true);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        dispatch(changeTodo(updatedTodo));
        setUpdateChangeTodos(false);
      })
      .catch((error) => {
        console.error("Ошибка изменения задачи:", error);
        setUpdateChangeTodos(false);
      });
  };

  return {
    updateAddTodos,
    handleAddTodo,
    updateDeleteTodos,
    handleDeleteTodo,
    updateChangeTodos,
    handleChangeTodo,
  };
};
