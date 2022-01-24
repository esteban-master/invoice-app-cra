import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Invoices from "../components/Invoices";
import { InvoicesContextProvider } from "../context/invoiceContext";
import invoicesData from "../data";
import { Invoice } from "../interfaces";

describe("Invoices", () => {
  const setup = (invoicesData: Invoice[]) =>
    render(
      <InvoicesContextProvider invoicesData={invoicesData}>
        <MemoryRouter>
          <Invoices
            renderItem={(invoice) => (
              <Invoices.Item key={invoice.id} invoice={invoice} />
            )}
          />
        </MemoryRouter>
      </InvoicesContextProvider>
    );
  it("Render list invoices", () => {
    setup(invoicesData);

    invoicesData.map((invoice) =>
      expect(screen.getByRole("heading", { name: invoice.clientName }))
    );
  });
  it("Render empty invoices", () => {
    setup([]);

    expect(
      screen.getByRole("heading", { name: /no hay nada aqui/i })
    ).toBeInTheDocument();
  });
});
