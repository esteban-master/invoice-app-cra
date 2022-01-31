import { useParams } from "react-router-dom";

export const Invoice = () => {
  const { id } = useParams();
  return <div>Invoice {id}</div>;
};
