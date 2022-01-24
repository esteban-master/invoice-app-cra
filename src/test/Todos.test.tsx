import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { Todos } from "../TodoExample/Todos";
import { Todo } from "../TodoExample/Todo";
import { fakeTodos, TodosContext } from "../TodoExample/TodosContext";

describe("Todos", () => {
  const setup = (initialEntries = ["/"]) =>
    render(
      <TodosContext.Provider value={{ todos: fakeTodos }}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<Todos />}>
              <Route path=":id" element={<Todo />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </TodosContext.Provider>
    );
  it("Render list todos", () => {
    setup();
    fakeTodos.forEach((todo) => expect(screen.getByText(todo.name)));
  });

  it("Render first todo", () => {
    setup(["/1"]);
    const [todo1] = fakeTodos;
    expect(screen.getByText(`Todo ${todo1.name}`)).toBeInTheDocument();
  });
});
