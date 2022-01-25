import { rest } from "msw";
import invoicesData from "../data";

export const handlers = [
  rest.get("https://api.com/invoices", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(invoicesData));
  }),
];
