import { useState, useEffect } from "react";
import { Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { AccessTimeFilled } from "@mui/icons-material";
import { Image } from "./components";
import Button from "../../Components/Button";
import styles from "./styles.module.scss";

export default function FirstPage({
  stage,
}: {
  stage: { set: (st: number) => void; get: number };
}) {
  const [fadeOut, setFadeOut] = useState(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.key == "Enter") action();
    };
  }, []);

  return (
    <Grid
      container
      width="max-content"
      direction="column"
      wrap="nowrap"
      alignItems="center"
      gap={5}
      className={fadeOut ? styles.fadeOutAnim : ""}
    >
      <Image
        className={[styles.fadeInInit, styles.fadeInAnim].join(" ")}
        sx={{
          backgroundImage: `url("/images/forms/signup/laboard.jpg")`,
          marginTop: { xs: "-50px", md: "0" },
        }}
      />
      <Grid>
        <Grid
          container
          width="max-content"
          maxWidth="90vw"
          alignItems="center"
          direction="column"
          gap={1}
          className={[styles.slideInInit, styles.slideInAnim].join(" ")}
        >
          <Typography
            textAlign="center"
            variant="h4"
            fontSize={{ sm: "34px", xs: "30px" }}
          >
            HeyTutor & LAUSD Tutor Application
          </Typography>
          <Typography
            textAlign="center"
            color="#000a"
            fontSize={{ sm: "20px", xs: "16px" }}
          >
            Please fill out this form to sign up for a tutoring position.
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          gap={1}
          sx={
            sm
              ? { position: "fixed", bottom: "10px", left: 0, width: "100%" }
              : {}
          }
          className={[styles.slideInInit, styles.slideInAnim].join(" ")}
        >
          <Button
            text="Apply now"
            sx={{ marginTop: "20px" }}
            onClick={action}
          />
          <Grid
            container
            direction="row"
            width="max-content"
            alignItems="center"
            marginTop="10px"
          >
            <AccessTimeFilled sx={{ fontSize: "14px", marginRight: "4px" }} />
            <Typography fontSize="14px">Takes 1 minute 30 seconds</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  function action() {
    setFadeOut(true);
    setTimeout(() => stage.set(1), 1000);
    document.onkeydown = null;
  }
}
