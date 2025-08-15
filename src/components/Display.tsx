import { type SyntheticEvent } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import type { Beverage } from "../types/display";
import { useAtom, useAtomValue } from "jotai";
import { paymentAtom, totalAtom } from "../atoms/payments";
import { beveragesAtom } from "../atoms/display";
import { BEVERAGE_LIST } from "../constants/display";
import { getSumOfBeveragePrice } from "../utils/utils";
import { PaymentEnum } from "../types/payments";

export default function Display() {
  const [beverages, setBeverages] = useAtom(beveragesAtom);
  const payment = useAtomValue(paymentAtom);
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

  const sumPrice = getSumOfBeveragePrice(beverages);

  return (
    <FormGroup sx={{ p: 3 }}>
      {BEVERAGE_LIST.map((item) => {
        const checked = !!beverages.find((i) => i.name === item.name);
        const availablePrice = total - sumPrice;
        const disabled =
          !payment ||
          (payment === PaymentEnum.Cash && availablePrice < item.price);

        return (
          <FormControlLabel
            onChange={(_: SyntheticEvent, checked: boolean) =>
              handleChange(item, checked)
            }
            control={
              <Checkbox checked={checked} disabled={!checked && disabled} />
            }
            label={`${item.name}: ${item.price.toLocaleString()} 원`}
          />
        );
      })}
    </FormGroup>
  );
}
