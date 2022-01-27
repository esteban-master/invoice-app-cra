import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormCreateInvoice } from "../components/FormCreateInvoice";
import { useInvoiceContext } from "../context/invoiceContext";
import { Invoice } from "../interfaces";

async function createNewInvoice(invoice: any): Promise<Invoice> {
  const { data } = await axios.post("https://api.com/invoices", invoice);
  return data;
}

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
