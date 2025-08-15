import Grid from "@mui/material/Grid";
import { Button, ButtonGroup } from "@mui/material";
import { CARD_LIMIT, CASH_UNITS } from "../constants/payments";
import { paymentAtom, totalAtom } from "../atoms/payments";
import { PaymentEnum } from "../types/payments";
import { useAtom } from "jotai";

export default function Payments() {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [total, setTotal] = useAtom(totalAtom);

  const handlePayment = (selected: PaymentEnum) => {
    setPayment(selected);
  };

  return (
    <Grid
      container
      rowGap={1}
      justifyContent="center"
      textAlign="center"
      sx={{ p: 3 }}
    >
      <Grid size={6}>지불 수단을 선택하세요.</Grid>
      <Grid size={4}>
        <ButtonGroup>
          <Button
            variant={payment === PaymentEnum.Cash ? "contained" : "outlined"}
            onClick={() => handlePayment(PaymentEnum.Cash)}
            disabled={payment === PaymentEnum.Card}
          >
            현금
          </Button>
          <Button
            variant={payment === PaymentEnum.Card ? "contained" : "outlined"}
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
          <Grid size={12}>합계: {total.toLocaleString()}원</Grid>
        </>
      )}
      {payment === PaymentEnum.Card && (
        <Grid size={12}>(1회 결제 한도: {CARD_LIMIT.toLocaleString()}원)</Grid>
      )}
    </Grid>
  );
}
