import Grid from "@mui/material/Grid";
import { Button, ButtonGroup } from "@mui/material";
import { CARD_LIMIT, CASH_UNITS } from "../constants/constants";
import { beveragesAtom, paymentAtom, totalAtom } from "../atoms/vendingMachine";
import { PaymentEnum } from "../types/payments";
import { useAtom } from "jotai";

export default function Payments() {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [beverages, setBeverages] = useAtom(beveragesAtom);

  const handlePayment = (selected: PaymentEnum) => {
    setPayment(selected);

    if (selected === PaymentEnum.Card) {
      setTotal(CARD_LIMIT);
    }
  };

  const handleBack = () => {
    setPayment(null);
    setTotal(0);
    setBeverages([]);
  };

  const handleConfirm = () => {
    alert(
      `${beverages.map((item) => item.name).join(", ")}을(를) 반환했습니다.`
    );
    handleBack();
  };

  return (
    <Grid
      container
      rowGap={2}
      columnGap={2}
      alignItems="center"
      justifyContent="center"
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
      {!!payment && (
        <>
          {payment === PaymentEnum.Cash && (
            <Grid size={12}>
              <ButtonGroup size="small">
                {CASH_UNITS.map((item) => (
                  <Button onClick={() => setTotal((prev) => prev + item)}>
                    {item.toLocaleString()} 원
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
          )}
          <Grid size={6}>합계: {total.toLocaleString()}원</Grid>
          <Grid size={5}>
            <Button color="error" onClick={handleBack}>
              취소
            </Button>
            <Button color="warning" variant="contained" onClick={handleConfirm}>
              확인
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
}
