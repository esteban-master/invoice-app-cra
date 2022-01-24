import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CreateInvoice } from "./Pages/CreateInvoice";
import { Home } from "./Pages/Home";
import { Invoice } from "./Pages/Invoice";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="invoice/:id" element={<Invoice />} />
          <Route path="invoice/new" element={<CreateInvoice />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};
