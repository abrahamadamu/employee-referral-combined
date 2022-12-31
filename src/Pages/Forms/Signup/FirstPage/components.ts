import { Box } from "@mui/material";
import { styled } from "@mui/material";

export const Image = styled(Box)(({ theme }) => ({
  width: "600px",
  height: "340px",
  maxHeight: "min(50vh, 45vw)",
  maxWidth: "100vw",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));
