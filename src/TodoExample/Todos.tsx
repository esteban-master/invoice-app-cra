import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTodosContext } from "./TodosContext";

export const Todos: FC = () => {
  const { todos } = useTodosContext();
  return (
    <div>
      <h1>{todos.length} todos</h1>
      {/* <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="" /> */}
      {todos.map((todo) => (
        <div key={todo.id}>
          <Link to={`${todo.id}`}>
            <h2>{todo.name}</h2>
          </Link>
        </div>
      ))}

      <Outlet />
    </div>
  );
};
