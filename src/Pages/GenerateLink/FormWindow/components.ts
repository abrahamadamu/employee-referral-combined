import { Container, Grid } from "@mui/material";
// import styled from "@mui/styled-engine";
import { styled } from "@mui/material/styles";

export const Window = styled(Container)(({ theme }) => ({
  marginTop: "10vh",
  [theme.breakpoints.down("sm")]: {
    marginTop: "5vh",
  },
  width: "100vw",
  maxWidth: "600px !important",
  minHeight: "400px",
  padding: "40px 40px !important",
  overflow: "hidden",

  display: "grid",
  placeItems: "center",

  borderRadius: "20px",

  boxShadow: "1px 8px 53px 5px #ddd",
  backdropFilter: "blur(13px)",
  border: "#ffff 2px solid",
}));

export const Content = styled(Grid)(() => ({
  // height: "90%",
  // position: "relative",
}));
