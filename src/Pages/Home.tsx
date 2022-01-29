import { useModal } from "@ebay/nice-modal-react";
import Button from "@mui/material/Button";
import { CreateInvoiceModal } from "../components/CreateInvoiceModal";
import Invoices from "../components/Invoices";

export const Home = () => {
  const miModal = useModal(CreateInvoiceModal);
  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" onClick={() => miModal.show()}>
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
