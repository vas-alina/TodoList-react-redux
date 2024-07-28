import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../actions/delete-todo";
import { changeTodo } from "../actions/change-todo";

export const useSortAndSearchTodos = (todos = []) => {
  const dispatch = useDispatch();
  const [isSorted, setIsSorted] = useState(false);
  const [search, setNewSearch] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [localTitle, setLocalTitle] = useState("");

  const filteredTodos = todos.filter(
    (todo) =>
      search === "" || todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const displayedTodos = isSorted
    ? filteredTodos.sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const toggleSortMode = () => {
    setIsSorted(!isSorted);
  };

  const toggleEdit = (id) => {
    setEditingTodoId((prevId) => (prevId === id ? null : id));
    setLocalTitle(todos.find((todo) => todo.id === id)?.title || "");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  };

  const handleSave = (id) => {
    dispatch(changeTodo({ id, title: localTitle }));
    toggleEdit(id);
  };

  return {
    isSorted,
    search,
    handleSearchChange,
    displayedTodos,
    toggleSortMode,
    toggleEdit,
    handleTitleChange,
    handleSave,
    editingTodoId,
    localTitle,
    handleDelete,
  };
};
