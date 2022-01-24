import { createContext, FC, useContext } from "react";

type Todo = { id: number; name: string; done: boolean };

export const fakeTodos: Todo[] = [
  { id: 1, name: "Tarea 1", done: false },
  { id: 2, name: "Tarea 2", done: true },
];

export const TodosContext = createContext<{ todos: Todo[] }>({ todos: [] });

export const TodosProviderContext: FC = ({ children }) => {
  return (
    <TodosContext.Provider
      value={{
        todos: fakeTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("Inicializar Context antes de usar");
  }
  return context;
};

export const useTodo = (id: string) => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("Inicializar Context antes de usar");
  }

  return {
    todo: context.todos.find((todo) => todo.id.toString() === id.toString()),
  };
};
