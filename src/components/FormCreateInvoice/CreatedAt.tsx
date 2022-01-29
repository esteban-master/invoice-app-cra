import { useWatch } from "react-hook-form";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export const CreatedAt = ({ control, setValue }: any) => {
  const createdAt = useWatch({
    control,
    name: "createdAt",
  });
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        label="CreatedAt"
        value={createdAt}
        onChange={(newValue) => {
          if (newValue instanceof Date && !isNaN(newValue.getDate())) {
            setValue("createdAt", format(newValue!!, "MM/dd/yyyy"));
          }
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
