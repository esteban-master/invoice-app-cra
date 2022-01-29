import "./App.css";
import { InvoicesContextProvider } from "./context/invoiceContext";
import Router from "./Routes";
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <>
      <NiceModal.Provider>
        <InvoicesContextProvider>
          <Router />
        </InvoicesContextProvider>
      </NiceModal.Provider>
    </>
  );
}

export default App;
