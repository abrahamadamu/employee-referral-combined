import { AccessTimeFilled, Groups, School, Window } from "@mui/icons-material";
import { Abc as IconType } from "@mui/icons-material";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";
import IconCircle from "../Components/IconCircle";
import styles from "./styles.module.scss";

type EmptyBoxData = { show: boolean };

function Benefits() {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const showFirstBox = useMediaQuery("(min-width: 1460px)");
  const showSecondBox = useMediaQuery("(min-width: 1300px)");
  const highsm = useMediaQuery("(min-width: 750px)");

  const benefits: (
    | {
        Icon: typeof IconType;
        title: string;
        text: string;
        color: string;
        background: string;
      }
    | EmptyBoxData
  )[] = [
    {
      Icon: AccessTimeFilled,
      title: "Consistent Scheduling!",
      text: "We are hiring tutors to work M-F from 2:30 - 6PM. Great for tutors interested in part time work!",
      color: "white",
      background: "#9663fc",
    },
    {
      Icon: Window,
      title: "Competitive Pay",
      text: "HeyTutor pays $19-22/hour depending on experience! Lead tutors can earn up to $26/hour.",
      color: "black",
      background: "#c8f3d9",
    },
    {
      Icon: Groups,
      title: "Impact Your Community",
      text: "Work with K-8 students in your community that were significantly impacted by learning loss.",
      color: "black",
      background: "#ffda7a",
    },
    { show: showSecondBox },
    {
      Icon: School,
      title: "Local School Sites",
      text: "Work with school sites all across Los Angeles, some just down the street from your home!",
      color: "black",
      background: "#bee7ff",
    },
    { show: showFirstBox },
  ];

  return (
    <Box
      className={styles.Benefits}
      sx={{
        padding: { lg: "90px", md: "60px", sm: "40px", xs: "24px" },
        borderRadius: { xs: "56px", md: "100px" },
      }}
    >
      <div className={styles.content}>
        {!lg && (
          <Typography
            variant="title1"
            fontSize={highsm ? "40px" : "32px"}
            fontWeight="normal"
            lineHeight="45px"
            textAlign="center"
            marginBottom="40px"
          >
            Benefits of working with us
          </Typography>
        )}
        <Box
          className={styles.top}
          sx={{
            gridTemplateColumns: {
              lg: "1fr repeat(2, 304px)",
              md: "1fr 1fr",
              sm: "1fr",
            },
          }}
        >
          {lg && (
            <Box className={styles.title} width="300px">
              <Typography
                variant="title1"
                fontSize="52px"
                fontWeight="normal"
                lineHeight="62px"
              >
                Benefits
                <br />
                of working
                <br /> with us
              </Typography>
            </Box>
          )}
          {getBenefit(0, 2)}
        </Box>
        <Box
          className={styles.bottom}
          sx={{
            display: { md: "flex", xs: "grid" },
            justifyContent: "flex-end",
            gridTemplateColumns: {
              lg: "repeat(auto-fit, 304px)",
              md: "1fr 1fr",
              sm: "1fr",
            },
          }}
        >
          {getBenefit(2)}
        </Box>
      </div>
    </Box>
  );

  function getBenefit(start: number, end?: number) {
    return benefits.slice(start, end).map((benefitData, i) => {
      function isEmptyBoxData(data: any): data is EmptyBoxData {
        return (data as EmptyBoxData).show !== undefined;
      }

      if (isEmptyBoxData(benefitData)) {
        return <EmptyBox key={i} {...benefitData} />;
      } else {
        return <BenefitBox key={benefitData.title} {...benefitData} />;
      }
    });
  }
}

function BenefitBox({
  Icon,
  title,
  text,
  color,
  background,
}: {
  Icon: typeof IconType;
  title: string;
  text: string;
  color: string;
  background: string;
}) {
  return (
    <Box
      className={styles.box}
      sx={{
        "&:hover": {
          lg: {
            transform: "rotate(4deg)",
          },
        },
      }}
      style={{ color: color, backgroundColor: background }}
    >
      <IconCircle
        Icon={Icon}
        color={color === "white" ? "black" : "white"}
        background={color}
      />

      <Typography color="inherit" fontSize="24px" fontWeight="bold">
        {title}
      </Typography>
      <Typography color="inherit" fontSize="16px">
        {text}
      </Typography>
    </Box>
  );
}

function EmptyBox({ show }: { show: boolean }) {
  return show ? (
    <Box
      className={[styles.box, styles.emptyBox].join(" ")}
      style={{ color: "white", backgroundColor: "white" }}
      sx={{
        "&:hover": {
          lg: {
            transform: "rotate(4deg)",
          },
        },
      }}
    ></Box>
  ) : (
    <></>
  );
}

export default Benefits;
