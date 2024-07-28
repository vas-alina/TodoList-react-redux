import styles from '../styles/TodoList.module.css';
import { TiSortAlphabeticallyOutline, TiSortNumericallyOutline, TiTick, TiPencil, TiTrash, TiTickOutline } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";

export const TodoListLayout = (
    {todo, 
    isLoading, 
    handleAdd, 
    error, 
    search, 
    handleSearchChange, 
    toggleSortMode, 
    isSorted, 
    displayedTodos, 
    editingTodoId, 
    localTitle, 
    handleTitleChange, 
    handleSave, 
    toggleEdit, 
    handleDelete, 
    setTodo
    }) => {
    
   
      return (
        <div className={styles.mainContainer}>
            <div className={styles.addTodoContainer}>
                <input
                    className={styles.addTodoInput}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Задача"
                />
                <button
                className={styles.addTodoButton}
                    disabled={isLoading}
                    onClick={handleAdd}
                >
                  <TiTick />
                </button>
                {isLoading && <p>Загрузка...</p>}
                {error && <p className={styles.error}>Ошибка: {error}</p>}
            </div>

            <div className={styles.searchAndSortTodo}>
                <IoSearch className={styles.icon}/>
                <input 
                    type="text" 
                    value={search} 
                    onChange={handleSearchChange} 
                    placeholder="Поиск по задачам"/>
                <button onClick={toggleSortMode}>
                {isSorted ? <TiSortNumericallyOutline className={styles.icon}/> 
                : 
                <TiSortAlphabeticallyOutline className={styles.icon} />}
                </button>
            </div>
            <div className={styles.todosContainer}>
                <div>
                    {displayedTodos.map((todo) => (
                        <div key={todo.id} className={styles.todoItem}>
                            {editingTodoId === todo.id  ? (
                                <>
                                    <input 
                                        className={styles.toggleInput}
                                        value={localTitle}
                                        onChange={(e) => handleTitleChange(e, todo.id)}
                                        placeholder="Новый текст для задачи"
                                    />
                                    <button  className={styles.buttonSave} onClick={() => handleSave(todo.id)}>
                                    <TiTickOutline className={styles.icon}/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className={styles.todoText}>{todo.title}</span>
                                    <button onClick={() => {toggleEdit(todo.id)}}><TiPencil className={styles.icon}/></button>
                                    <button onClick={() => handleDelete(todo.id)}><TiTrash className={styles.icon}/></button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
