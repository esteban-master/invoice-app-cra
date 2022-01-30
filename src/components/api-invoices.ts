import { Invoice } from "../interfaces";
import api from "../config/api";

export async function createNewInvoice(
  invoice: Partial<Invoice>
): Promise<Invoice> {
  const { data } = await api.post("/invoices", invoice);
  return data;
}

export async function getInvoices() {
  const { data } = await api.get("/invoices");
  return data;
}
