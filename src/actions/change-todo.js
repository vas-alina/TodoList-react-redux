export const CHANGE_TODO = "CHANGE_TODO";

export const changeTodo = (todo) => ({
  type: CHANGE_TODO,
  payload: todo,
});
