import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type Props = { index: number };

export const TotalInput = ({ index }: Props) => {
  const { register, control, setValue } = useFormContext();
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
  return (
    <TextField
      {...register(`items.${index}.total`)}
      type="number"
      variant="outlined"
      disabled
      label="Total"
    />
  );
};
