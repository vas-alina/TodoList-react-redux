import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodos, setLoading, setError } from "../actions/set-todos";
import { selectTodos } from "../selectors/select-todos";
import { selectError } from "../selectors/select-error";
import { selectIsLoading } from "../selectors/select-loading";

export const useGetTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(setLoading(true));
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((loadedTodos) => {
        dispatch(setTodos(loadedTodos));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError("Ошибка при загрузке задач: " + error.message));
      });
  }, [dispatch]);

  return { todos, isLoading, error };
};
