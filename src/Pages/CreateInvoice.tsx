import { Link } from "react-router-dom";
import { FormCreateInvoice } from "../components/FormCreateInvoice";

const CreateInvoice = () => {
  return (
    <div>
      <h1>Crear Invoice</h1>
      <Link to={"/"}>Volver</Link>

      <FormCreateInvoice submit={(values) => console.log({ values })} />
    </div>
  );
};

export default CreateInvoice;
