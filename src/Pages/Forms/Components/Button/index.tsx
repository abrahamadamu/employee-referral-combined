import { Box, Typography, Grid } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check, KeyboardReturn } from "@mui/icons-material";

function Button({
  text,
  icon,
  sx,
  smaller,
  onClick,
}: {
  text: string;
  sx?: SxProps<Theme> | undefined;
  icon?: boolean;
  smaller?: boolean;
  onClick?: () => void;
}) {
  const Container = styled(Box)(({ theme }) => ({
    padding: smaller ? "6px 15px" : "10px 20px",

    fontSize: smaller ? "15pt" : "17pt",
    [theme.breakpoints.down("sm")]: {
      padding: smaller ? "8px 15px" : "10px 20px",
      fontSize: smaller ? "16px" : "17pt",
    },
    fontWeight: "bolder",

    color: "white",
    backgroundColor: theme.palette.secondary.main,

    borderRadius: "5px",
    boxShadow: "7px 5px 20px -4px rgba(0,0,0,0.36)",

    cursor: "pointer",
    userSelect: "none",

    "&:hover": {
      filter: "brightness(1.1)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
  }));
  return (
    <Grid
      container
      width="max-content"
      alignItems="center"
      direction="row"
      justifyContent="center"
      sx={{ ...sx, position: "relative" }}
    >
      <Container onClick={onClick}>
        <Grid container alignItems="start" gap={0.4}>
          <Typography fontSize="inherit" fontWeight="inherit">
            {text}
          </Typography>
          <Check />
        </Grid>
      </Container>
      <Grid
        sx={{ position: "absolute", left: "100%", marginLeft: "12px" }}
        container
        direction="row"
      >
        <Typography
          fontSize="12px"
          sx={{ display: { xs: "none", md: "unset" } }}
          color="black"
        >
          press <b>Enter</b>
        </Typography>
        <KeyboardReturn
          sx={{
            fontSize: "15px",
            marginLeft: "5px",
            display: { xs: "none", md: "unset" },
          }}
        />
      </Grid>
    </Grid>
  );
}
export default Button;
