import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Next = styled(Grid)(({ theme }) => ({
  borderRadius: "5px",
  padding: "10px 70px",
  color: "white",
  backgroundColor: theme.palette.primary.main,
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.1)",
  },
}));
