import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../actions/fetch-todo";
import { useSortAndSearchTodos } from "../../hooks/useSortAndSearchTodos";
import { useAddDeleteChangeTodos } from "../../hooks/useAddDeleteChangeTodos";
import { TodoListLayout } from "../../layout/TodoListLayout";
import { selectTodos } from "../../selectors/select-todos";
export const TodoList = () => {
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch()
    const { todos, isLoading, error } = useSelector(selectTodos);
    const { handleAddTodo } = useAddDeleteChangeTodos();
    
    const {
        search,
        isSorted,
        handleSearchChange,
        toggleSortMode,
        displayedTodos,
        toggleEdit,
        handleTitleChange,
        handleSave,
        handleDelete,
        editingTodoId,
        localTitle
        } = useSortAndSearchTodos(todos);
    
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = () => {
        const newTodo = { title: todo, text: todo }; 
        handleAddTodo(newTodo);
        setTodo(""); 
    };
   
      return (
        <TodoListLayout 
            setTodo={setTodo}
            todo ={todo} 
            isLoading={isLoading} 
            handleAdd={handleAdd} 
            error={error}
            search={search}
            handleSearchChange={handleSearchChange} 
            toggleSortMode={toggleSortMode}
            isSorted={isSorted}
            displayedTodos={displayedTodos}
            editingTodoId={editingTodoId}
            localTitle={localTitle}
            handleTitleChange={handleTitleChange}
            handleSave={handleSave}
            toggleEdit={toggleEdit}
            handleDelete={handleDelete}
        />
    );
};
