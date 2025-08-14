import { Paper } from "@mui/material";
import Payments from "./Payments";
import Container from "@mui/material/Container";

const VendingMachine = () => {
  return (
    <Container>
      <h1>Vending Machine</h1>
      <Paper elevation={8} style={{ padding: 30, maxWidth: 350 }}>
        <Payments />
      </Paper>
    </Container>
  );
};

export default VendingMachine;
