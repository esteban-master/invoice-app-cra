import "./App.css";
import { TodosProviderContext } from "./TodoExample/TodosContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Todos } from "./TodoExample/Todos";
import { Todo } from "./TodoExample/Todo";

function App() {
  return (
    <div className="App">
      <TodosProviderContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todos />}>
              <Route path=":id" element={<Todo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodosProviderContext>
    </div>
  );
}

export default App;
