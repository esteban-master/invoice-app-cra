import { useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SelectPaymentTerms } from "./SelectPaymentTerms";
import { CreatedAt } from "./CreatedAt";
import DeleteIcon from "@mui/icons-material/Delete";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validationSchema";
import { Invoice } from "../../interfaces";
import { TotalInput } from "./TotalInput";

type Props = {
  submit: (values: Omit<Invoice, "id" | "status" | "paymentDue">) => void;
};

export const FormCreateInvoice = ({ submit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Invoice>({
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
    <Stack component={"form"} onSubmit={handleSubmit(submitForm)} spacing={3}>
      <Typography component={"h2"}>Bill From</Typography>
      <TextField
        {...register("senderAddress.street")}
        variant="outlined"
        label="Sender Street"
        helperText={
          <ErrorMessage errors={errors} name="senderAddress.street" />
        }
        error={!!errors.senderAddress?.street}
      />
      <Stack spacing={1} direction={"row"} justifyContent="space-between">
        <TextField
          {...register("senderAddress.city")}
          variant="outlined"
          label="Sender City"
        />

        <TextField
          {...register("senderAddress.postCode")}
          variant="outlined"
          label="Sender PostCode"
        />
        <TextField
          {...register("senderAddress.country")}
          variant="outlined"
          label="Sender Country"
        />
      </Stack>

      <Typography component={"h2"}>Bill To</Typography>
      <TextField
        {...register("clientName")}
        variant="outlined"
        label="Client Name"
      />

      <TextField
        {...register("clientEmail")}
        variant="outlined"
        type="email"
        label="Client Email"
      />

      <TextField
        {...register("clientAddress.street")}
        variant="outlined"
        label="Client Street"
      />

      <Stack spacing={1} direction={"row"} justifyContent="space-between">
        <TextField
          {...register("clientAddress.city")}
          variant="outlined"
          label="Client City"
        />
        <TextField
          {...register("clientAddress.postCode")}
          variant="outlined"
          label="Client PostCode"
        />
        <TextField
          {...register("clientAddress.country")}
          variant="outlined"
          label="Client Country"
        />
      </Stack>

      <Stack direction={"row"} justifyContent="space-between">
        <CreatedAt control={control} setValue={setValue} />

        <SelectPaymentTerms control={control} register={register} />
      </Stack>

      <TextField
        label="Description"
        multiline
        rows={1}
        {...register("description")}
      />

      <Typography variant="h5" component={"h2"}>
        Item List
      </Typography>

      <Stack spacing={4}>
        {fieldArray.fields.map((field, index) => (
          <Stack key={index} spacing={2}>
            <TextField
              {...register(`items.${index}.name`)}
              variant="outlined"
              label="Item Name"
            />
            <Stack spacing={1} direction={"row"} justifyContent="space-between">
              <TextField
                {...register(`items.${index}.quantity`)}
                type="number"
                variant="outlined"
                label="Quantity"
              />
              <TextField
                {...register(`items.${index}.price`)}
                type="number"
                variant="outlined"
                label="Price"
              />

              <TotalInput
                index={index}
                control={control}
                setValue={setValue}
                input={() => {
                  return (
                    <TextField
                      {...register(`items.${index}.total`)}
                      type="number"
                      disabled
                      variant="outlined"
                      label="Total"
                    />
                  );
                }}
              />
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
  );
};
