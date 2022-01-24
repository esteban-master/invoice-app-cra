import {
  useFieldArray,
  useForm,
  useWatch,
  Control,
  UseFormSetValue,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Invoice } from "../interfaces";
import { ReactNode, useEffect } from "react";

const schema = Yup.object({
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

type Props = {
  submit: (values: any) => void;
};

export const FormCreateInvoice = ({ submit }: Props) => {
  const { register, handleSubmit, setValue, control } = useForm<Invoice>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      paymentTerms: 1,
      items: [{ name: "", price: "", quantity: "", total: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control,
    name: "items",
  });

  function submitForm(values: Invoice) {
    const itemsFieldToNumbers = values.items.map((item) => ({
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
      total: Number(item.price) * Number(item.quantity),
    }));
    const newInvoice = {
      ...values,
      items: itemsFieldToNumbers,
      id: "RT3080",
      paymentDue: "2021-08-19",
      status: "paid",
      total: itemsFieldToNumbers.reduce((acc, item) => {
        return acc + item.total;
      }, 0),
    };
    submit(newInvoice);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <input
          type={"text"}
          id="street"
          aria-label="Sender Street"
          {...register("senderAddress.street")}
        />

        <input aria-label="Sender City" {...register("senderAddress.city")} />
        <input
          aria-label="Sender PostCode"
          {...register("senderAddress.postCode")}
        />
        <input
          aria-label="Sender Country"
          {...register("senderAddress.country")}
        />

        <input aria-label="Client Name" {...register("clientName")} />
        <input
          aria-label="Client Email"
          type="email"
          {...register("clientEmail")}
        />

        <input
          aria-label="Client Street"
          {...register("clientAddress.street")}
        />
        <input aria-label="Client City" {...register("clientAddress.city")} />
        <input
          aria-label="Client PostCode"
          {...register("clientAddress.postCode")}
        />
        <input
          aria-label="Client Country"
          {...register("clientAddress.country")}
        />

        <input aria-label="CreatedAt" type="date" {...register("createdAt")} />
        <input aria-label="Description" {...register("description")} />

        <hr />
        {fieldArray.fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              aria-label={`item.${index}.name`}
              {...register(`items.${index}.name`)}
            />
            <input
              type="number"
              aria-label={`item.${index}.quantity`}
              {...register(`items.${index}.quantity`)}
            />
            <input
              type="number"
              aria-label={`item.${index}.price`}
              {...register(`items.${index}.price`)}
            />
            <TotalInput
              index={index}
              control={control}
              setValue={setValue}
              input={() => {
                return (
                  <>
                    <input type="text" {...register(`items.${index}.total`)} />
                  </>
                );
              }}
            />
            <button onClick={() => fieldArray.remove(index)}>
              Remove item
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            fieldArray.append({
              name: "",
              quantity: 0,
              price: 0,
              total: 0,
            })
          }
        >
          Add new Item
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const TotalInput = ({
  index,
  control,
  setValue,
  input,
}: {
  index: number;
  control: Control<Invoice>;
  setValue: UseFormSetValue<Invoice>;
  input: () => ReactNode;
}) => {
  const watch = useWatch({
    control,
    name: `items.${index}`,
  });

  useEffect(() => {
    setValue(
      `items.${index}.total`,
      Number(Number(watch.price) * Number(watch.quantity))
    );
  }, [watch.price, watch.quantity, index, setValue]);
  return <>{input()}</>;
};
