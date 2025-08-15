import { Divider, Paper } from "@mui/material";
import Payments from "./Payments";
import Container from "@mui/material/Container";
import Display from "./Display";
import Outputs from "./Outputs";

const VendingMachine = () => {
  return (
    <Container>
      <h1>Vending Machine</h1>
      <Paper elevation={8} style={{ maxWidth: 400 }}>
        <Display />
        <Divider />
        <Payments />
        <Divider />
        <Outputs />
      </Paper>
    </Container>
  );
};

export default VendingMachine;
