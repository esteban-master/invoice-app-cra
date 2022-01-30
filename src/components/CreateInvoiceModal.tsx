import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { FormCreateInvoice } from "./FormCreateInvoice";
import { createNewInvoice } from "./api-invoices";
import { Invoice } from "../interfaces";

export const CreateInvoiceModal = NiceModal.create(() => {
  const modal = useModal();

  async function handleSubmit(values: Partial<Invoice>) {
    createNewInvoice(values).then((res) => {
      modal.resolve(res);
      modal.hide();
      modal.remove();
    });
  }

  return (
    <Drawer
      anchor="left"
      open={modal.visible}
      onClose={() => {
        modal.hide();
        modal.remove();
      }}
    >
      <Stack
        sx={{
          width: "500px",
          padding: "1em",
        }}
      >
        <Typography variant="h6" component="h2">
          New Invoice
        </Typography>

        <FormCreateInvoice submit={handleSubmit} />
      </Stack>
    </Drawer>
  );
});
