import Grid from "@mui/material/Grid";
import { Box, Button } from "@mui/material";
import { paymentAtom, totalAtom } from "../atoms/payments";
import { useAtom } from "jotai";
import { beveragesAtom } from "../atoms/display";
import { PaymentEnum } from "../types/payments";
import { getSumOfBeveragePrice } from "../utils/utils";
import { outputMessagesAtom } from "../atoms/outputs";

export default function Outputs() {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [beverages, setBeverages] = useAtom(beveragesAtom);
  const [outputMessages, setOutputMessages] = useAtom(outputMessagesAtom);

  const handleBack = () => {
    setPayment(null);
    setTotal(0);
    setBeverages([]);
  };

  const handleConfirm = () => {
    const messages = [
      `${beverages.map((item) => item.name).join(", ")}을(를) 반환했습니다.`,
    ];

    if (payment === PaymentEnum.Cash) {
      const returnChange = total - getSumOfBeveragePrice(beverages);
      messages.push(`잔돈: ${returnChange.toLocaleString()} 원`);
    }
    if (payment === PaymentEnum.Card) {
      messages.push("카드가 반환되었습니다.");
    }

    setOutputMessages(messages);
    handleBack();

    setTimeout(() => {
      setOutputMessages([]);
    }, 2000);
  };

  return (
    <Grid textAlign="end" sx={{ p: 3 }}>
      <Grid size={5}>
        <Button color="error" onClick={handleBack} disabled={!payment}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={beverages.length === 0 || !payment}
        >
          확인
        </Button>
      </Grid>
      {outputMessages.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {outputMessages.map((message) => (
            <Box>{message}</Box>
          ))}
        </Box>
      )}
    </Grid>
  );
}
