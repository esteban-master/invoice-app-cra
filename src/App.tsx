import "./App.css";
import { InvoicesContextProvider } from "./context/invoiceContext";
import Router from "./Routes";
import invoicesData from "./data";
function App() {
  return (
    <div className="App">
      <InvoicesContextProvider invoicesData={invoicesData}>
        <Router />
      </InvoicesContextProvider>
    </div>
  );
}

export default App;
