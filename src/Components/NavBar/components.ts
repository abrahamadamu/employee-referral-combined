import { AppBar as RowAppBar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AppBar = styled(RowAppBar)(({ theme }) => ({
  height: "115px",
  padding: "0px",
  [theme.breakpoints.up("lg")]: {
    padding: "0px 90px",
  },
  justifyContent: "center",

  backgroundColor: "#f8f8f8",
  boxShadow: "unset",
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  padding: "8px 28px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: "white",
  borderRadius: "350px",
  textTransform: "none",
}));

export const Img = styled("img")(({ theme }) => ({
  marginLeft: "15px",
  height: "26px",
  width: "130px",
  [theme.breakpoints.up("md")]: {
    marginLeft: "0",
    height: "29px",
    width: "144px",
  },
}));
