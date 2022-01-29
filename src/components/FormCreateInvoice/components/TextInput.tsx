import TextField from "@mui/material/TextField";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext, get as getErrorForm } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  type?: string;
};

export const TextInput = ({ name, label, type = "text" }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      variant="outlined"
      label={label}
      type={type}
      {...register(name)}
      error={!!getErrorForm(errors, name)}
      helperText={<ErrorMessage errors={errors} name={name} />}
    />
  );
};
