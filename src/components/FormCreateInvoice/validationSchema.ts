import * as Yup from "yup";

export const schema = Yup.object({
  clientName: Yup.string().required("can't be empty"),
  createdAt: Yup.string().required("can't be empty"),
  description: Yup.string().required("can't be empty"),
  paymentTerms: Yup.number().required("can't be empty"),
  clientEmail: Yup.string()
    .required("can't be empty")
    .email("Please enter a valid email"),
  senderAddress: Yup.object({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty"),
  }),
  clientAddress: Yup.object({
    street: Yup.string().required("can't be empty"),
    city: Yup.string().required("can't be empty"),
    postCode: Yup.string().required("can't be empty"),
    country: Yup.string().required("can't be empty"),
  }),
  items: Yup.array()
    .min(1)
    .of(
      Yup.object({
        name: Yup.string().required("can't be empty"),
        quantity: Yup.number()
          .typeError("should be a number")
          .min(1, "minimum 1")
          .required("can't be empty"),
        price: Yup.number()
          .typeError("should be a number")
          .required("can't be empty"),
        total: Yup.number().required("can't be empty"),
      })
    ),
});
