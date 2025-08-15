import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { BEVERAGE_LIST } from "../constants/constants";
import type { Beverage } from "../types/display";
import { useAtomValue } from "jotai";
import { paymentAtom } from "../atoms/payment";

export default function Display() {
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const isPaymentSelected = useAtomValue(paymentAtom);

  const handleChange = (selected: Beverage, checked: boolean) => {
    if (checked) {
      setBeverages((prev) => [...prev, selected]);
    } else {
      setBeverages((prev) => {
        return prev.filter((item) => item.name !== selected.name);
      });
    }
  };

  return (
    <FormGroup sx={{ p: 3 }}>
      {BEVERAGE_LIST.map((item) => (
        <FormControlLabel
          onChange={(e: SyntheticEvent, checked: boolean) =>
            handleChange(item, checked)
          }
          control={
            <Checkbox checked={!!beverages.find((i) => i.name === item.name)} />
          }
          disabled={!isPaymentSelected}
          label={`${item.name}: ${item.price.toLocaleString()} 원`}
        />
      ))}
    </FormGroup>
  );
}
