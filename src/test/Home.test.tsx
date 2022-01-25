import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { InvoicesContextProvider } from "../context/invoiceContext";
import { Home } from "../Pages/Home";
import { Layout } from "../components/Layout";
import dataInvoice from "../data";

describe("Home Page", () => {
  it("Render data in the home", async () => {
    render(
      <InvoicesContextProvider>
        <MemoryRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </InvoicesContextProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByText(/cargando.../i));
    expect(screen.getByText("New Invoice")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: `${dataInvoice.length} invoices` })
    ).toBeInTheDocument();
  });
});
