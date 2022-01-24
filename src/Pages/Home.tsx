import { Link } from "react-router-dom";
import Invoices from "../components/Invoices";

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={"invoice/new"}>New Invoice</Link>
      <Invoices
        renderItem={(invoice) => (
          <Invoices.Item key={invoice.id} invoice={invoice} />
        )}
      />
    </div>
  );
};
