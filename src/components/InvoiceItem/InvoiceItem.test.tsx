import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { InvoiceItem } from "./InvoiceItem";
import dataInvoice from "../../data";

describe("Invoice Item", () => {
  const [firstInvoice] = dataInvoice;
  it("Render clientName invoice", () => {
    render(
      <MemoryRouter>
        <InvoiceItem invoice={firstInvoice} />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: firstInvoice.clientName })
    ).toBeInTheDocument();
  });
});
