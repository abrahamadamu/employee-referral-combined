import {
  Person,
  Star,
  Summarize,
  CheckCircle,
  Abc as IconType,
} from "@mui/icons-material";
import { Typography, Box, useMediaQuery } from "@mui/material";
import IconCircle from "../Components/IconCircle";
import Button from "../Components/Button";
import styles from "./styles.module.scss";
import { useState } from "react";

const descriptions: {
  [key: string]: {
    title: string;
    Icon: typeof IconType;
    iconColor: string;
    iconBackground: string;
    points: string[];
    action: string;
    button: { label: string; color: string; textColor: string };
  };
} = {
  join: {
    title: "Join the HeyTutor network",
    Icon: Star,
    iconColor: "black",
    iconBackground: "#fff497",
    points: [
      "Tutor students in over 250 different subjects",
      "Engage students and inspire them to learn",
      "Hundreds of new students sign up every day",
      "Receive live customer support from real human beings – no bots here!",
    ],
    action: "Join",
    button: {
      label: "Join the HeyTutor network",
      color: "#fff497",
      textColor: "black",
    },
  },
  organize: {
    title: "Organize for Success",
    Icon: Summarize,
    iconColor: "black",
    iconBackground: "#bee7ff",
    points: [
      "Manage lessons using HeyTutor’s scheduling platform.",
      "Report and track your lessons so that you get paid on time and in full.",
      "Receive feedback on student progress",
    ],
    action: "Start",
    button: {
      label: "Organize for Success",
      color: "#bee7ff",
      textColor: "black",
    },
  },
  create: {
    title: "Create a free online profile",
    Icon: Person,
    iconColor: "black",
    iconBackground: "#dac4f6",
    points: [
      "Create a custom profile and showcase yourself to potential students",
      "Use your qualifications, experience and pictures to make your profile stand out",
      "Build your business with testimonials from previous clients!",
    ],
    action: "Create",
    button: {
      label: "Create a free online profile",
      color: "#9663fc",
      textColor: "white",
    },
  },
};

function How() {
  const RS_mobileView = useMediaQuery("(max-width:1000px)");

  return RS_mobileView ? <Mobile /> : <Large />;
}

function Mobile() {
  const [openAccordion, setOpenAccordion] = useState("join");
  const smallerDevice = useMediaQuery("(max-width: 750px)");

  return (
    <div className={styles.Mobile}>
      <div className={styles.title}>
        <Typography
          variant="title1"
          fontWeight="normal"
          fontSize={smallerDevice ? "32px" : "40px"}
        >
          How we work
        </Typography>
      </div>
      <div className={styles.accordion}>
        {Object.keys(descriptions).map((descID) => (
          <HorizontalButton
            key={descID}
            descID={descID}
            openAccordion={{ get: openAccordion, set: setOpenAccordion }}
          />
        ))}
      </div>
    </div>
  );
}

function HorizontalButton({
  descID,
  openAccordion,
}: {
  descID: string;
  openAccordion: { set: (v: string) => void; get: string };
}) {
  const myData = descriptions[descID];
  const smallerFont = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <div
        className={styles.horizontalButton}
        style={{ backgroundColor: myData.iconBackground }}
        onClick={() => {
          openAccordion.set(descID);
        }}
      >
        <div className={styles.iconCnt}>
          {<myData.Icon className={styles.icon} />}
        </div>
        <Typography
          sx={{ fontSize: smallerFont ? "20px" : "24px", fontWeight: 700 }}
        >
          {myData.button.label}
        </Typography>
      </div>
      <Description
        Icon={myData.Icon}
        action={myData.action}
        iconBackground={myData.iconBackground}
        iconColor={myData.iconColor}
        points={myData.points}
        title={myData.title}
        accordionMode
        open={descID === openAccordion.get}
      ></Description>
    </>
  );
}

function Description({
  Icon,
  iconColor,
  iconBackground,
  title,
  points,
  action,
  accordionMode,
  open,
}: {
  Icon: typeof IconType;
  iconColor: string;
  iconBackground: string;
  title: string;
  points: string[];
  action: string;
  accordionMode?: boolean;
  open?: boolean;
}) {
  const smallerDevice = useMediaQuery("(max-width: 750px)");

  return (
    <div
      className={[
        styles.textBoxCntContainer,
        accordionMode ? (open ? styles.openAnim : styles.closeAnim) : "",
      ].join(" ")}
    >
      <div
        className={[
          styles.textBoxCnt,
          accordionMode ? styles.accordionMode : "",
        ].join(" ")}
        style={accordionMode ? { padding: "30px" } : {}}
      >
        <div className={styles.textBox}>
          {!smallerDevice && (
            <div className={styles.titleCnt}>
              <IconCircle
                Icon={Icon}
                color={iconColor}
                background={iconBackground}
              />
              <Typography fontSize="24px" fontWeight="bold">
                {title}
              </Typography>
            </div>
          )}
          {points.map((point) => (
            <div className={styles.checkItem} key={point}>
              <CheckCircle sx={{ color: "black", marginTop: "2px" }} />
              <Typography fontSize={smallerDevice ? "14px" : "18px"}>
                {point}
              </Typography>
            </div>
          ))}
          <Button
            smallerDevice={smallerDevice}
            sx={{
              marginTop: "30px",
            }}
            openReferral
          >
            {action}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Large() {
  const [readyDescs, setReadyDescs] = useState(["join", "organize"]);

  const RS_reduceLeftTitle = useMediaQuery("(max-width:1100px)");

  const description =
    descriptions[
      Object.keys(descriptions).find(
        (descID) => readyDescs.indexOf(descID) === -1
      ) ?? ""
    ];

  return (
    <div className={styles.Large}>
      <Box className={styles.titlePart}>
        <Box sx={{ paddingLeft: { lg: "100px" } }}>
          <Typography
            variant="title1"
            fontWeight="normal"
            fontSize={RS_reduceLeftTitle ? "40px" : "52px"}
          >
            How we
            <br />
            work
          </Typography>
          <Box className={styles.imgCnt}>
            <img src="/images/arts/curlyarrow.svg" alt="arrow art" />
          </Box>
        </Box>
      </Box>
      <div className={styles.contentPart}>
        <Description
          title={description.title}
          Icon={description.Icon}
          iconColor={description.iconColor}
          iconBackground={description.iconBackground}
          points={description.points}
          action={description.action}
        />
        {readyDescs.map((descID) => (
          <VerticalButton
            key={descID}
            descID={descID}
            readyDescs={{ set: setReadyDescs, get: readyDescs }}
          />
        ))}
      </div>
    </div>
  );
}

function VerticalButton({
  descID,
  readyDescs,
}: {
  readyDescs: {
    get: string[];
    set: (v: string[]) => void;
  };
  descID: string;
}) {
  const myData = descriptions[descID].button;

  return (
    <div
      className={styles.verticalButton}
      style={{ backgroundColor: myData.color }}
      onClick={() => {
        let lastDesc = readyDescs.get[readyDescs.get.length - 1];
        const lastDescIndex = Object.keys(descriptions).indexOf(lastDesc);
        if (lastDescIndex === -1) return;

        const newReadyID =
          Object.keys(descriptions)[
            (lastDescIndex + 1) % Object.keys(descriptions).length
          ];

        const newReadyDescs: typeof readyDescs.get = structuredClone(
          readyDescs.get
        );
        newReadyDescs.push(newReadyID);
        newReadyDescs.shift();

        readyDescs.set(newReadyDescs);
      }}
    >
      <Typography
        color={myData.textColor}
        sx={{ writingMode: "vertical-lr", fontSize: "24px", fontWeight: 700 }}
      >
        {myData.label}
      </Typography>
    </div>
  );
}

export default How;
