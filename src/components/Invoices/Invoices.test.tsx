import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import Invoices from "./Invoices";
import { InvoicesContextProvider } from "../../context/invoiceContext";

import invoicesData from "../../data";

describe("Invoices", () => {
  const setup = () =>
    render(
      <InvoicesContextProvider>
        <MemoryRouter>
          <Invoices
            renderItem={(invoice) => (
              <Invoices.Item key={invoice.id} invoice={invoice} />
            )}
          />
        </MemoryRouter>
      </InvoicesContextProvider>
    );
  it("Render list invoices", async () => {
    setup();

    await waitFor(() =>
      invoicesData.map((invoice) =>
        expect(screen.getByRole("heading", { name: invoice.clientName }))
      )
    );
  });
  it("Render empty invoices", async () => {
    server.use(
      rest.get("https://api.com/invoices", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );

    setup();
    // Esperar a que se quite el estado de cargando
    // para seguir realizando tests
    await waitForElementToBeRemoved(() => screen.queryByText(/cargando.../i));

    expect(
      screen.getByRole("heading", {
        name: /no hay nada aqui/i,
      })
    ).toBeInTheDocument();
  });
});
