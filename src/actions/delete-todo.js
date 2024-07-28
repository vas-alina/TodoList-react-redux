export const DELETE_TODO = "DELETE_TODO";

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: id,
  });