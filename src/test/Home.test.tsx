import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { InvoicesContextProvider } from "../context/invoiceContext";
import { Home } from "../Pages/Home";
import invoicesData from "../data";
import userEvent from "@testing-library/user-event";
import { Layout } from "../components/Layout";
import { CreateInvoice } from "../Pages/CreateInvoice";

describe("Home Page", () => {
  it("Ir hacia pagina de crear invoice", async () => {
    render(
      <InvoicesContextProvider invoicesData={invoicesData}>
        <MemoryRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="invoice/new" element={<CreateInvoice />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </InvoicesContextProvider>
    );

    userEvent.click(screen.getByText(/new invoice/i));
    expect(
      screen.getByRole("heading", { name: "Crear Invoice" })
    ).toBeInTheDocument();
  });
});
