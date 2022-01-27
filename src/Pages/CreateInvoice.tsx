import { Link, useNavigate } from "react-router-dom";
import { createNewInvoice } from "../components/api-invoices";
import { FormCreateInvoice } from "../components/FormCreateInvoice";
import { useInvoiceContext } from "../context/invoiceContext";

const CreateInvoice = () => {
  const { addNewInvoice } = useInvoiceContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>Crear Invoice</h1>
      <Link to={"/"}>Volver</Link>

      <FormCreateInvoice
        submit={(values) => {
          createNewInvoice(values).then((res) => {
            addNewInvoice(res);
            navigate("/");
          });
        }}
      />
    </div>
  );
};

export default CreateInvoice;
