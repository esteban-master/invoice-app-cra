import { Link } from "react-router-dom";
import { Invoice } from "../interfaces";

export const InvoiceItem = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div>
      <Link to={`/invoice/${invoice.id}`}>
        <h3>{invoice.clientName}</h3>
      </Link>
    </div>
  );
};
