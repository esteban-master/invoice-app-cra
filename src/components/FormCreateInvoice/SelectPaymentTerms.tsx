import { Control, UseFormRegister, useWatch } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Invoice } from "../../interfaces";

type Props = {
  control: Control<Invoice>;
  register: UseFormRegister<Invoice>;
};

export const SelectPaymentTerms = ({ control, register }: Props) => {
  const paymentTerms = useWatch({
    control,
    name: "paymentTerms",
  });
  return (
    <FormControl>
      <InputLabel>Payment Terms</InputLabel>
      <Select
        value={paymentTerms}
        label="Payment Terms"
        {...register("paymentTerms")}
      >
        <MenuItem value={1}>Next 1 Day</MenuItem>
        <MenuItem value={7}>Next 7 Day</MenuItem>
        <MenuItem value={14}>Next 14 Day</MenuItem>
        <MenuItem value={30}>Next 30 Day</MenuItem>
      </Select>
    </FormControl>
  );
};
