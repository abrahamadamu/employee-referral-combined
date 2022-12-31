import { ArrowForward } from "@mui/icons-material";
import { Typography, useTheme, useMediaQuery, Box } from "@mui/material";
import styles from "./styles.module.scss";
import Button from "../Components/Button";

function Intro() {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const highmd = useMediaQuery("(min-width: 1100px)");
  const highsm = useMediaQuery("(min-width: 750px)");

  const titleProps = (() => {
    if (lg) {
      return { fontSize: "60px" };
    } else if (highmd) {
      return { fontSize: "50px" };
    } else if (highsm) {
      return {};
    } else {
      return { fontSize: "36px", lineHeight: "43px", fontWeight: "normal" };
    }
  })();

  return (
    <Box
      className={styles.Intro}
      sx={{
        padding: { lg: "130px", md: "130px 20px", xs: "64px 20px" },
        borderRadius: { xs: "56px", md: "100px" },
      }}
    >
      <Box
        className={styles.content}
        sx={{ gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}
      >
        <div className={styles.textPart}>
          <div className={styles.title}>
            <Typography variant="title1" {...titleProps}>
              Tutor Local
            </Typography>
            <Typography variant="title1" component="span" {...titleProps}>
              LAUSD{" "}
            </Typography>
            <Typography variant="title1" component="span" {...titleProps}>
              Students!
            </Typography>
          </div>
          <Typography variant="subtitle1">
            HeyTutor is in partnership with LAUSD
          </Typography>
          <Typography
            className={styles.description}
            // fontSize={{ xs: "16px", md: "inherit" }}
            fontSize={{ xs: "16px", md: "18px" }}
          >
            Nearly only 3% of LAUSD students met state standards. HeyTutor is
            looking for part time tutors to help LAUSD students overcome
            learning loss caused by the pandemic. We are recruiting tutors
            throughout Los Angeles to help K-8 students with Math and English
            Language Arts.
          </Typography>
          <div className={styles.applyCnt}>
            <Button smallerDevice={!highsm} openReferral>
              Apply Now
            </Button>
            <Button className={styles.arrow} openReferral>
              <ArrowForward />
            </Button>
          </div>
        </div>
        <Box
          className={styles.imagePart}
          sx={{
            width: { xs: "250px", md: "unset" },
            marginTop: { xs: "50px" },
          }}
        >
          <img src="/images/forms/signup/laboard-cut.jpg" alt="LA board logo" />
        </Box>
      </Box>
    </Box>
  );
}

export default Intro;
