import { ReactNode } from "react";
import { useInvoiceContext } from "../../context/invoiceContext";
import { Invoice } from "../../interfaces";
import { InvoiceItem } from "../InvoiceItem/InvoiceItem";

type Props = 
 | { renderItem?: (invoice: Invoice) => ReactNode; children?: never }
 | { renderItem?: never; children?: (invoice: Invoice[]) => ReactNode; };


const Invoices = ({ renderItem, children }: Props) => {
  const { invoices } = useInvoiceContext();
  return (
    <div>
      { !invoices && <p>Cargando...</p> }
      { invoices && Boolean(invoices.length) && (
        <>
          { renderItem && <div> { invoices.map( renderItem ) }</div>  }
          { children && children(invoices) }
        </>
      )}
      { !Boolean( invoices?.length ) && <div>
          <img
            src={`${process.env.PUBLIC_URL}/illustration-empty.svg`}
            alt="Imagen indicando que no hay invoices"
          />
          <h2>No hay nada aqui</h2>
        </div> }
    </div>
  );
};

Invoices.Item = InvoiceItem;

export default Invoices;
