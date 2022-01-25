import { ReactNode } from "react";
import { useInvoiceContext } from "../context/invoiceContext";
import { Invoice } from "../interfaces";
import { InvoiceItem } from "./InvoiceItem";

type Props = {
  renderItem: (invoice: Invoice) => ReactNode;
};

const Invoices = ({ renderItem }: Props) => {
  const { invoices } = useInvoiceContext();
  return (
    <div>
      {!invoices ? (
        <p>Cargando...</p>
      ) : invoices.length > 0 ? (
        <div>
          <h2> {invoices.length} invoices </h2>
          {invoices.map(renderItem)}
        </div>
      ) : (
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/illustration-empty.svg`}
            alt="Imagen indicando que no hay invoices"
          />
          <h2>No hay nada aqui</h2>
        </div>
      )}
    </div>
  );
};

Invoices.Item = InvoiceItem;

export default Invoices;
