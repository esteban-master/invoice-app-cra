import { ReactNode, useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { Invoice } from "../../interfaces";

export const TotalInput = ({
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
