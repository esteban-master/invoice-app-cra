import Invoices from "../components/Invoices";

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Invoices
        renderItem={(invoice) => (
          <Invoices.Item key={invoice.id} invoice={invoice} />
        )}
      />
    </div>
  );
};
