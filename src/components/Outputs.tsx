import Grid from "@mui/material/Grid";
import { Alert, Box, Button, type AlertProps } from "@mui/material";
import { paymentAtom, totalAtom } from "../atoms/payments";
import { useAtom } from "jotai";
import { beveragesAtom } from "../atoms/display";
import { PaymentEnum } from "../types/payments";
import { getSumOfBeveragePrice } from "../utils/utils";
import { CARD_LIMIT } from "../constants/payments";
import { useEffect, useState } from "react";

interface Message {
  severity: "success" | "error" | "info";
  text: string;
}

export default function Outputs() {
  const [payment, setPayment] = useAtom(paymentAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [beverages, setBeverages] = useAtom(beveragesAtom);

  const [messages, setMessages] = useState<Message[]>([]);

  const handleBack = () => {
    setPayment(null);
    setTotal(0);
    setBeverages([]);
  };

  const executePayment = () => {
    const sumPrice = getSumOfBeveragePrice(beverages);

    if (payment === PaymentEnum.Card && sumPrice > CARD_LIMIT) {
      setMessages([
        { severity: "error", text: "[결제실패] 카드 한도를 초과했습니다." },
        { severity: "info", text: "카드를 받으세요." },
      ]);
      return;
    }

    const results: Message[] = [];

    results.push({
      severity: "success",
      text: `${beverages
        .map((item) => item.name)
        .join(", ")}을(를) 반환합니다.`,
    });

    if (payment === PaymentEnum.Cash) {
      const returnChange = total - sumPrice;
      results.push({
        severity: "info",
        text: `잔돈 ${returnChange.toLocaleString()} 원을 받으세요.`,
      });
    }
    if (payment === PaymentEnum.Card) {
      results.push({
        severity: "info",
        text: "카드를 받으세요",
      });
    }

    setMessages(results);
  };

  const handleConfirm = () => {
    executePayment(); // 서버 통신으로 대체 필요
    handleBack();
  };

  useEffect(() => {
    if (!!payment) {
      setMessages([]);
    }
  }, [payment]);

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
      {messages.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {messages.map((message) => (
            <Alert severity={message.severity}>{message.text}</Alert>
          ))}
        </Box>
      )}
    </Grid>
  );
}
