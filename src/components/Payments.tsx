import Grid from "@mui/material/Grid";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { CASH_UNITS } from "../constants/constants";

enum PaymentEnum {
  Cash = "cash",
  Card = "card",
}

export default function Payments() {
  const [payment, setPayment] = useState<PaymentEnum | null>(null);
  const [total, setTotal] = useState(0);

  const handlePayment = (selected: PaymentEnum) => {
    if (payment === selected) {
      setPayment(null);
    } else {
      setPayment(selected);
    }
  };

  return (
    <Grid
      container
      rowGap={2}
      columnGap={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid size={6}>지불 수단을 선택하세요.</Grid>
      <Grid size={4}>
        <ButtonGroup>
          <Button
            variant={payment === PaymentEnum.Cash ? "contained" : "outlined"}
            onClick={() => handlePayment(PaymentEnum.Cash)}
          >
            현금
          </Button>
          <Button
            variant="outlined"
            onClick={() => handlePayment(PaymentEnum.Card)}
            disabled={payment === PaymentEnum.Cash}
          >
            카드
          </Button>
        </ButtonGroup>
      </Grid>
      {payment === PaymentEnum.Cash && (
        <>
          <Grid size={12}>
            <ButtonGroup size="small">
              {CASH_UNITS.map((item) => (
                <Button onClick={() => setTotal((prev) => prev + item)}>
                  {item.toLocaleString()} 원
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid size={8}>합계: {total.toLocaleString()}원</Grid>
          <Grid size={3}>
            <Button variant="contained">다음</Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
