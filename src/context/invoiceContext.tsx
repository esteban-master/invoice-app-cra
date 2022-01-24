import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Filters, Invoice } from "../interfaces";

export const InvoiceContext = createContext<null | {
  invoices: Invoice[];
  filters: Filters[];
  deleteInvoice: (id: string) => void;
  addNewInvoice: (invoice: Invoice) => void;
  markAsPaid: (id: string) => void;
  changeFilters: (id: Filters) => void;
}>(null);

type Props = {
  children: ReactNode;
  invoicesData: Invoice[];
};

export const InvoicesContextProvider = ({ children, invoicesData }: Props) => {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [filters, setFilters] = useState<Filters[]>([]);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  }, []);

  const addNewInvoice = useCallback((invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
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
      prev.map((invoice) => {
        if (invoice.id === id) {
          return { ...invoice, status: "paid" };
        }
        return invoice;
      })
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
