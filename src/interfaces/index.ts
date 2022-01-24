export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: Filters;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
export type Filters = "draft" | "pending" | "paid";

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number | string;
  price: number | string;
  total: number | string;
}
