import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { InvoicesContextProvider } from "../../context/invoiceContext";
import { Home } from ".";
import dataInvoice from "../../data";

describe("Home Page", () => {
  it("Render data in the home", async () => {
    render(
      <InvoicesContextProvider>
        <MemoryRouter>
          <Home />
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
