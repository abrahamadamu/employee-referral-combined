import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Next } from "./components";
import styles from "./styles.module.scss";

const link = "";
function TextSlide({
  index,
  title,
  text,
  currentSlide,
}: {
  index: number;
  title: string;
  text: string;
  currentSlide: { get: number; set: (a: number) => void };
}) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{ gridRowStart: "1", gridColumnStart: "1" }}
      className={
        styles.slideItem +
        " " +
        (currentSlide.get === index ? styles.fadeIn : styles.fadeOut)
      }
    >
      <Box>
        <Typography
          alignSelf="start"
          fontWeight={700}
          marginTop="15px"
          fontSize={{ xs: "20px", sm: "24px" }}
        >
          {title}
        </Typography>
        <Typography
          fontSize={{ xs: "15px", sm: "16px" }}
          alignSelf="start"
          marginTop="15px"
        >
          {text}
        </Typography>
      </Box>
      <Grid
        marginTop="35px"
        container
        justifyContent="start"
        alignItems="center"
      >
        <Next
          onClick={() => currentSlide.set(currentSlide.get + 1)}
          width={{ xs: "100%", sm: "unset" }}
          textAlign={{ xs: "center", sm: "unset" }}
          sx={
            link == undefined
              ? {
                  backgroundColor: "lightgray",
                  "&:hover": {
                    filter: "brightness(1)",
                    cursor: "default",
                  },
                }
              : {}
          }
        >
          Next
        </Next>
      </Grid>
    </Box>
  );
}

export default TextSlide;
