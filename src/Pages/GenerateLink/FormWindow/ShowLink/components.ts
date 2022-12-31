import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LinkBox = styled(Grid)(({ theme }) => ({
  width: "fit-content",
  maxWidth: "520px",
  padding: "20px 20px",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "24px",
  backgroundColor: "#f2e9fd",

  cursor: "pointer",
}));
