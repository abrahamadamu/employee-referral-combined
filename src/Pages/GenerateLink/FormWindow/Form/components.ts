import { Container, Grid } from "@mui/material";
// import styled from "@mui/styled-engine";
import { styled } from "@mui/material/styles";

export const Window = styled(Container)(() => ({
  width: "100vw",
  maxWidth: "800px !important",
  minHeight: "500px",
  position: "relative",
  padding: "0",
  overflow: "hidden",

  display: "grid",
  placeItems: "center",

  borderRadius: "20px",

  boxShadow: "1px 8px 53px 5px #ddd",
}));

export const Content = styled(Grid)(() => ({
  width: "90%",
  height: "90%",
  position: "absolute",
}));

// const a = ss.styles

export const Generate = styled(Grid)(({ theme }) => ({
  borderRadius: "5px",
  padding: "10px 70px",
  color: "white",
  backgroundColor: theme.palette.primary.main,
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.1)",
  },
}));

export const LinkBox = styled(Grid)(({ theme }) => ({
  width: "fit-content",
  maxWidth: "400px",
  padding: "20px 20px",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "24px",
  backgroundColor: "#f2e9fd",

  cursor: "pointer",
}));
