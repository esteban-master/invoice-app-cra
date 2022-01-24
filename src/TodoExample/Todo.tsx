import { Link, useParams } from "react-router-dom";
import { useTodo } from "./TodosContext";

export const Todo = () => {
  const { id } = useParams<{ id: string }>();
  const { todo } = useTodo(id!);

  return (
    <div>
      <h1>Todo {todo?.name}</h1>
      <Link to="/"> Volver </Link>
    </div>
  );
};
