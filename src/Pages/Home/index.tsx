import { useModal } from "@ebay/nice-modal-react";
import Button from "@mui/material/Button";
import { CreateInvoiceModal } from "../../components/CreateInvoiceModal";
import Invoices from "../../components/Invoices/Invoices";
import { useInvoiceContext } from "../../context/invoiceContext";
import { Invoice } from "../../interfaces";

export const Home = () => {
  const createInvoiceModal = useModal(CreateInvoiceModal);
  const { addNewInvoice } = useInvoiceContext();
  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="contained"
        onClick={() =>
          createInvoiceModal.show().then((res) => {
            addNewInvoice(res as Invoice);
          })
        }
      >
        New Invoice
      </Button>
      <Invoices
        renderItem={(invoice) => (
          <Invoices.Item key={invoice.id} invoice={invoice} />
        )}
      />
    </div>
  );
};
