import { rest } from "msw";
import invoicesData from "../data";
import { Invoice } from "../interfaces";

export const handlers = [
  rest.get(`${process.env.REACT_APP_API}/invoices`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(invoicesData));
  }),
  rest.post(`${process.env.REACT_APP_API}/invoices`, (req, res, ctx) => {
    const values = req.body as Invoice;

    const createdAt = new Date(values.createdAt);
    const newInvoice = {
      ...values,
      id: `ID${Math.floor(Math.random() * (1 - 1000) + 1)}`,
      paymentDue: new Intl.DateTimeFormat("es-CL").format(
        createdAt.setDate(createdAt.getDate() + values.paymentTerms)
      ),
      status: "paid",
    };

    return res(ctx.status(200), ctx.json(newInvoice));
  }),
];
