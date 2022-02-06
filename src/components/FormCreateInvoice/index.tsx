import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { format } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectPaymentTerms } from "./components/SelectPaymentTerms";
import { CreatedAt } from "./components/CreatedAt";
import { Invoice } from "../../interfaces";
import { TotalInput } from "./components/TotalInput";
import { TextInput } from "./components/TextInput";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  submit: (values: Omit<Invoice, "id" | "status" | "paymentDue">) => void;
};

export const FormCreateInvoice = ({ submit }: Props) => {
  const methods = useForm<Invoice>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      paymentTerms: 1,
      items: [{ name: "", price: "", quantity: "", total: "" }],
      createdAt: format(new Date(), 'MM/dd/yyyy')
    },
  });
  const fieldArray = useFieldArray({
    control: methods.control,
    name: "items",
  });

  function submitForm(values: Invoice) {
    submit({
      ...values,
      items: values.items.map((item) => ({
        ...item,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),
      total: values.items.reduce((acc, item) => {
        return acc + Number(item.total);
      }, 0),
    });
  }

  return (
    <FormProvider {...methods}>
      <Stack
        component={"form"}
        onSubmit={methods.handleSubmit(submitForm)}
        spacing={3}
      >
        <Typography component={"h2"}>Bill From</Typography>

        <TextInput name="senderAddress.street" label="Sender Street" />
        <Stack spacing={1} direction={"row"} justifyContent="space-between">
          <TextInput name="senderAddress.city" label="Sender City" />
          <TextInput name="senderAddress.postCode" label="Sender PostCode" />
          <TextInput name="senderAddress.country" label="Sender Country" />
        </Stack>

        <Typography component={"h2"}>Bill To</Typography>
        <TextInput name="clientName" label="Client Name" />
        <TextInput name="clientEmail" label="Client Email" />
        <TextInput name="clientAddress.street" label="Client Street" />

        <Stack spacing={1} direction={"row"} justifyContent="space-between">
          <TextInput name="clientAddress.city" label="Client City" />
          <TextInput name="clientAddress.postCode" label="Client PostCode" />
          <TextInput name="clientAddress.country" label="Client Country" />
        </Stack>

        <Stack direction={"row"} justifyContent="space-between">
          <CreatedAt />

          <SelectPaymentTerms />
        </Stack>

        <TextInput name="description" label="Description" />

        <Typography variant="h5" component={"h2"}>
          Item List
        </Typography>

        <Stack spacing={4}>
          {fieldArray.fields.map((field, index) => (
            <Stack key={index} spacing={2}>
              <TextInput name={`items.${index}.name`} label="Item Name" />

              <Stack
                spacing={1}
                direction={"row"}
                justifyContent="space-between"
              >
                <TextInput
                  name={`items.${index}.quantity`}
                  label="Quantity"
                  type="number"
                />

                <TextInput
                  type="number"
                  name={`items.${index}.price`}
                  label="Price"
                />

                <TotalInput index={index} />
                <IconButton
                  onClick={() => fieldArray.remove(index)}
                  aria-label={`delete-item-${index}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Button
          onClick={() =>
            fieldArray.append({
              name: "",
              quantity: "",
              price: "",
              total: "",
            })
          }
          variant="contained"
        >
          Add new Item
        </Button>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};
