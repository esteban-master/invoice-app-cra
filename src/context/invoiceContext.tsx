import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Filters, Invoice } from "../interfaces";
import { getInvoices } from "../components/api-invoices";
export const InvoiceContext = createContext<null | {
  invoices: Invoice[] | null;
  filters: Filters[];
  deleteInvoice: (id: string) => void;
  addNewInvoice: (invoice: Invoice) => void;
  markAsPaid: (id: string) => void;
  changeFilters: (id: Filters) => void;
}>(null);

type Props = {
  children: ReactNode;
};

export const InvoicesContextProvider = ({ children }: Props) => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);
  const [filters, setFilters] = useState<Filters[]>([]);

  useEffect(() => {
    getInvoices().then(setInvoices);
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices((prev) =>
      prev ? prev.filter((invoice) => invoice.id !== id) : null
    );
  }, []);

  const addNewInvoice = useCallback((invoice: Invoice) => {
    setInvoices((prev) => (prev ? [invoice, ...prev] : [invoice]));
  }, []);

  const changeFilters = useCallback((filter: Filters) => {
    setFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : prev.concat(filter)
    );
  }, []);

  const markAsPaid = useCallback((id: string) => {
    setInvoices((prev) =>
      prev
        ? prev.map((invoice) => {
            if (invoice.id === id) {
              return { ...invoice, status: "paid" };
            }
            return invoice;
          })
        : null
    );
  }, []);

  const value = useMemo(
    () => ({
      invoices,
      filters,
      deleteInvoice,
      markAsPaid,
      changeFilters,
      addNewInvoice,
    }),
    [invoices, filters, deleteInvoice, markAsPaid, addNewInvoice, changeFilters]
  );
  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("Inicializar Invoice Context antes de usar");
  }
  return context;
};
