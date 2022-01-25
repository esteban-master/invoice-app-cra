import "./App.css";
import { InvoicesContextProvider } from "./context/invoiceContext";
import Router from "./Routes";

function App() {
  return (
    <div className="App">
      <InvoicesContextProvider>
        <Router />
      </InvoicesContextProvider>
    </div>
  );
}

export default App;
