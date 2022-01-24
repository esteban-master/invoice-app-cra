import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./Pages/Home";
import { Invoice } from "./Pages/Invoice";

const CreateInvoice = React.lazy(() => import("./Pages/CreateInvoice"));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoice/:id" element={<Invoice />} />
          <Route
            path="invoice/new"
            element={
              <React.Suspense fallback={<p>Cargando...</p>}>
                <CreateInvoice />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};
