import {
  ADD_TODO,
  CHANGE_TODO,
  DELETE_TODO,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
} from "../actions/actions";

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case CHANGE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
};
export default todoReducer;
