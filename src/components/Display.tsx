import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import { BEVERAGE_LIST } from "../constants/constants";
import type { Beverage } from "../types/display";
import { useAtom, useAtomValue } from "jotai";
import { beveragesAtom, paymentAtom, totalAtom } from "../atoms/vendingMachine";

export default function Display() {
  const [beverages, setBeverages] = useAtom(beveragesAtom);
  const selectedPayment = useAtomValue(paymentAtom);
  const total = useAtomValue(totalAtom);

  const handleChange = (selected: Beverage, checked: boolean) => {
    if (checked) {
      setBeverages((prev) => [...prev, selected]);
    } else {
      setBeverages((prev) => {
        return prev.filter((item) => item.name !== selected.name);
      });
    }
  };

  const sumPrice = beverages.reduce((partialSum, a) => partialSum + a.price, 0);

  return (
    <FormGroup sx={{ p: 3 }}>
      {BEVERAGE_LIST.map((item) => {
        const checked = !!beverages.find((i) => i.name === item.name);

        return (
          <FormControlLabel
            onChange={(_: SyntheticEvent, checked: boolean) =>
              handleChange(item, checked)
            }
            control={
              <Checkbox
                checked={checked}
                disabled={
                  !checked &&
                  (!selectedPayment || total - sumPrice < item.price)
                }
              />
            }
            label={`${item.name}: ${item.price.toLocaleString()} 원`}
          />
        );
      })}
    </FormGroup>
  );
}
