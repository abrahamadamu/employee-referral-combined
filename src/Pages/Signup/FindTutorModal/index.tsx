import { useState, useRef, useEffect, useContext } from "react";
import {
  Typography,
  Autocomplete,
  TextField,
  Alert,
  Grid,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowCircleLeft, ArrowForward, Cancel } from "@mui/icons-material";
import Button from "../Sections/Components/Button";
import { referralContext } from "Contexts/contexts";
import styles from "./styles.module.scss";
import { backend } from "Commons/data";
import Axios from "axios";
import subjectsList from "./subjectsList";

const modalPages = [
  {
    type: "subject",
    question: "Select Subject",
    button: "Continue",
    id: "subject",
  },
  {
    id: "forwho",
    type: "choice",
    question: "Is the tutoring for you?",
    options: [
      {
        id: "self",
        name: "Yes, it is for me",
      },
      {
        id: "child",
        name: "For my child",
      },
      {
        id: "other",
        name: "For someone else",
      },
    ],
  },
  {
    id: "starttime",
    type: "choice",
    question: "How soon would you like to meet with your tutor?",
    options: [
      {
        id: "this week",
        name: "This week or sometime soon",
      },
      {
        id: "today",
        name: "Today",
      },
      {
        id: "other",
        name: "Not sure",
      },
    ],
  },
  {
    id: "sessions",
    type: "choice",
    question: "How many tutoring sessions do you need?",
    options: [
      {
        id: "one session",
        name: "Just 1 session",
      },
      {
        id: "weekly",
        name: "On a weekly basis",
      },
      {
        id: "other",
        name: "As needed",
      },
    ],
  },
  {
    id: "level",
    type: "choice",
    question: "What type of tutor are you interested in?",
    options: [
      {
        id: "beginner",
        name: "Beginner",
      },
      {
        id: "intermediate",
        name: "Intermediate",
      },
      {
        id: "expert",
        name: "Expert ($75/hr+)",
      },
    ],
  },
  {
    id: "personal",
    type: "form",
    question: "Enter your personal info",
    inputs: [
      {
        id: "name",
        name: "Enter your name",
        type: "text",
      },
      {
        id: "email",
        name: "Enter your email",
        type: "email",
      },
      {
        id: "phone",
        name: "Enter your phone",
        type: "phone",
      },
    ],
    button: "Contact tutors now!",
  },
  {
    type: "completed",
    question: "Thanks for the Info!",
    id: "completed",
  },
];

function FindTutorModal({
  hideSignupForm: exit,
  subject,
}: {
  hideSignupForm: () => void;
  subject?: string;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(subject ? 1 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    subject ? { subject } : {}
  );

  const [showAlert, setShowAlert] = useState<string | null>(null);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => setShowAlert(null), 3000);
    }
  }, [showAlert]);

  const lastPage = currentQuestion === modalPages.length - 1;
  return (
    <div className={styles.FindTutorModal}>
      <div className={[styles.window].join(" ")}>
        {/* <div className={styles.completed}></div> */}
        {!lastPage && (
          <div className={styles.controls}>
            <Grid
              container
              onClick={() =>
                setCurrentQuestion(Math.max(0, currentQuestion - 1))
              }
              gap={1}
              className={styles.icon}
              width="max-content"
              wrap="nowrap"
            >
              <ArrowCircleLeft className={styles.icon} />
              <Typography
                fontFamily="Proxima Nova, sans-serif"
                fontWeight="bold"
                fontSize="16px"
              >
                Previous
              </Typography>
            </Grid>
            <div className={styles.progress}>
              <div
                className={styles.inner}
                style={{
                  width:
                    Math.round(
                      ((currentQuestion + 1) * 100) / (modalPages.length + 1)
                    ) + "%",
                }}
              ></div>
            </div>
            <Typography fontSize="14px">
              Steps {currentQuestion + 1}/{modalPages.length}
            </Typography>
            <Cancel className={styles.icon} onClick={exit} />
          </div>
        )}
        <div
          className={[styles.content, lastPage ? styles.completed : ""].join(
            " "
          )}
        >
          {(() => {
            const page = modalPages[currentQuestion];
            if (page.type === "subject") {
              return (
                <SelectSubject
                  key={page.id}
                  id={page.id}
                  question={page.question}
                  button={page.button}
                  current={{ get: currentQuestion, set: setCurrentQuestion }}
                  answers={{ get: answers, set: setAnswers }}
                  alert={{ set: setShowAlert, get: showAlert }}
                />
              );
            } else if (page.type === "choice") {
              return (
                page.options && (
                  <ChoiceQuestion
                    key={page.id}
                    id={page.id}
                    question={page.question}
                    options={page.options}
                    button={page.button}
                    current={{ get: currentQuestion, set: setCurrentQuestion }}
                    answers={{ get: answers, set: setAnswers }}
                  />
                )
              );
            } else if (page.type === "form") {
              return (
                page.inputs && (
                  <Form
                    key={page.id}
                    id={page.id}
                    question={page.question}
                    inputs={page.inputs}
                    button={page.button}
                    current={{ get: currentQuestion, set: setCurrentQuestion }}
                    answers={{ get: answers, set: setAnswers }}
                    alert={{ get: showAlert, set: setShowAlert }}
                  />
                )
              );
            } else if (page.type === "completed") {
              return (
                <Completed
                  key={page.id}
                  id={page.id}
                  question={page.question}
                  current={{ get: currentQuestion, set: setCurrentQuestion }}
                  answers={{ get: answers, set: setAnswers }}
                  exit={exit}
                />
              );
            }

            console.log({ answers });
            return <></>;
          })()}
          {/* <SelectSubject /> */}
          {/* <ChoiceQuestion /> */}
          {/* <Form /> */}
        </div>
      </div>
      {showAlert && (
        <Alert
          severity="warning"
          sx={{
            position: "fixed",
            margin: "0 auto",
            bottom: "30px",
          }}
        >
          {showAlert}
        </Alert>
      )}
    </div>
  );
}

function SelectSubject({
  id,
  question,
  button,
  current,
  answers,
  alert,
}: {
  id: string;
  question: string;
  button: string | undefined;
  current: { get: number; set: (v: number) => void };
  answers: {
    get: Record<string, string>;
    set: (v: Record<string, string>) => void;
  };
  alert: { get: string | null; set: (v: string | null) => void };
}) {
  const [subject, setSubject] = useState<string>(answers.get[id]);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={[styles.contentBox, styles.SelectSubject].join(" ")}>
      <Typography
        variant="title1"
        fontSize={{ xs: "28px", md: "40px" }}
        lineHeight={{ xs: "40px", md: "unset" }}
        fontWeight="normal"
      >
        {question}
      </Typography>
      <div className={styles.selectCnt}>
        <div className={styles.logo} />
        <Autocomplete
          className={styles.input}
          value={subject ? subject : null}
          onChange={(_, v) => setSubject(v ?? "")}
          options={subjectsList}
          renderInput={(params) => (
            <TextField {...params} variant="standard" placeholder="Subject" />
          )}
        />
      </div>
      <Button
        openReferral={false}
        sx={{
          marginTop: { xs: "30px", md: "unset" },
          width: "max-content",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
        onClick={() => {
          if (subject) {
            answers.set({ ...answers.get, [id]: subject });
            current.set(current.get + 1);
          } else {
            alert.set("Please enter required information");
          }
        }}
        smallerDevice={!sm}
      >
        {button}
      </Button>
    </div>
  );
}

function ChoiceQuestion({
  id,
  question,
  options,
  button,
  current,
  answers,
}: {
  id: string;
  question: string;
  options: {
    name: string;
    id: string;
  }[];
  button: string | undefined;
  current: { get: number; set: (v: number) => void };
  answers: {
    get: Record<string, string>;
    set: (v: Record<string, string>) => void;
  };
}) {
  return (
    <div className={[styles.contentBox, styles.ChoiceQuestion].join(" ")}>
      <Typography
        variant="title1"
        fontSize={{ xs: "28px", md: "40px" }}
        lineHeight={{ xs: "40px", md: "unset" }}
        fontWeight="normal"
        textAlign="center"
      >
        {question}
      </Typography>
      <Box
        className={styles.choices}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className={[
              styles.choice,
              answers.get[id] === option.id ? styles.highlighted : "",
            ].join(" ")}
            onClick={() => {
              answers.set({ ...answers.get, [id]: option.id });
              current.set(current.get + 1);
            }}
          >
            <Typography fontSize="inherit">{option.name}</Typography>
          </div>
        ))}
      </Box>
    </div>
  );
}

function Completed({
  id,
  question,
  current,
  answers,
  exit,
}: {
  id: string;
  question: string;
  current: { get: number; set: (v: number) => void };
  answers: {
    get: Record<string, string>;
    set: (v: Record<string, string>) => void;
  };
  exit: () => void;
}) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div
      className={[
        styles.contentBox,
        styles.ChoiceQuestion,
        styles.completed,
      ].join(" ")}
    >
      <Grid container direction="column" alignItems="center" marginTop="30px">
        <svg
          width="109"
          height="102"
          viewBox="0 0 109 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_263_56)">
            <path
              d="M40 42C40 30.9543 48.9543 22 60 22C71.0457 22 80 30.9543 80 42C80 53.0457 71.0457 62 60 62H40L40 42Z"
              fill="#FF983B"
            ></path>{" "}
            <path
              d="M55 102C68.8071 102 80 90.8071 80 77L80 62L25 62C11.1929 62 -1.2592e-06 73.1929 -6.55671e-07 87L0 102L55 102Z"
              fill="#9663FC"
            ></path>{" "}
            <circle cx="20" cy="42" r="20" fill="white"></circle>
          </g>{" "}
          <path
            d="M75.3311 1.88463L75.3309 1.88506L75.3439 1.88839C76.0255 2.06303 76.3856 2.75862 76.1654 3.38943C74.9487 6.83145 73.6699 10.359 71.9062 13.6251C71.5951 14.1886 70.8152 14.4439 70.1714 14.127L70.1714 14.127C69.5231 13.808 69.286 13.0797 69.5901 12.5267L69.5906 12.5258C71.2989 9.3833 72.5347 5.93035 73.7098 2.59635C73.9173 2.02263 74.6439 1.6583 75.3311 1.88463Z"
            fill="black"
            stroke="black"
            strokeWidth="0.4"
          ></path>{" "}
          <path
            d="M84.3451 22.2859L84.3451 22.2859C87.7129 20.1756 90.9459 17.882 94.1869 15.5828C94.4831 15.3726 94.7794 15.1624 95.0759 14.9523C98.614 12.4448 102.176 9.95062 105.937 7.71015L105.941 7.70774L105.941 7.70779C106.532 7.37353 106.72 6.61687 106.344 6.04914L84.3451 22.2859ZM84.3451 22.2859L84.342 22.2879M84.3451 22.2859L84.342 22.2879M84.342 22.2879C83.7509 22.6731 82.9486 22.4859 82.5373 21.9514C82.1516 21.3815 82.3153 20.6184 82.9126 20.228C86.2988 18.1128 89.5491 15.8143 92.7962 13.5181C93.0935 13.3078 93.3907 13.0976 93.6881 12.8876C97.2355 10.3815 100.795 7.89768 104.549 5.66818L104.549 5.66826M84.342 22.2879L104.549 5.66826M104.549 5.66826L104.554 5.66496M104.549 5.66826L104.554 5.66496M104.554 5.66496C105.162 5.27868 105.962 5.47141 106.344 6.04906L104.554 5.66496Z"
            fill="black"
            stroke="black"
            strokeWidth="0.4"
          ></path>{" "}
          <path
            d="M100.319 37.0849L100.319 37.0849L100.322 37.0854C100.698 37.1327 101.017 37.303 101.231 37.5262C101.446 37.7505 101.544 38.0155 101.513 38.2572C101.44 38.7845 100.826 39.2056 100.053 39.1089C98.1412 38.8328 96.2292 38.5567 94.3172 38.2806C92.5685 38.028 90.8198 37.7755 89.0709 37.523C88.2934 37.3776 87.8145 36.8312 87.8898 36.3057C87.966 35.778 88.5839 35.3601 89.3391 35.4998L89.3391 35.5L89.347 35.5011C91.0946 35.7533 92.8421 36.0056 94.5896 36.2579C96.4994 36.5336 98.4091 36.8093 100.319 37.0849Z"
            fill="black"
            stroke="black"
            strokeWidth="0.4"
          ></path>{" "}
          <defs>
            <clipPath id="clip0_263_56">
              <rect
                width="80"
                height="80"
                fill="white"
                transform="translate(0 22)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
        <Typography
          variant="title1"
          fontSize={{ xs: "28px", md: "40px" }}
          fontWeight="normal"
          textAlign="center"
        >
          {question}
        </Typography>
      </Grid>
      <Typography fontSize={{ xs: "14px", md: "unset" }} textAlign="center">
        We will call you from <b>855-781-9042</b> within the next 20 minutes!
      </Typography>
      <Grid container direction="row" justifyContent="center" onClick={exit}>
        <Button
          openReferral={false}
          sx={{
            width: "max-content",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
          small={!sm}
        >
          See other tutors
        </Button>
        <Button
          className={styles.arrow}
          sx={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            padding: "17px",
          }}
          openReferral={false}
          small={!sm}
        >
          <ArrowForward />
        </Button>
      </Grid>
      <br />
    </div>
  );
}

function Form({
  id,
  question,
  inputs,
  button,
  current,
  answers,
  alert,
}: {
  id: string;
  question: string;
  inputs: {
    name: string;
    id: string;
    type: string;
  }[];
  button: string | undefined;
  current: { get: number; set: (v: number) => void };
  answers: {
    get: Record<string, string>;
    set: (v: Record<string, string>) => void;
  };
  alert: {
    get: string | null;
    set: (v: string | null) => void;
  };
}) {
  const form = useRef<HTMLFormElement>(null);
  const referralData = useContext(referralContext);

  const [saving, setSaving] = useState(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={[styles.contentBox, styles.Form].join(" ")}>
      <Typography
        variant="title1"
        fontSize={{ xs: "28px", md: "40px" }}
        lineHeight={{ xs: "40px", md: "unset" }}
        fontWeight="normal"
      >
        {question}
      </Typography>
      <form className={styles.inputs} ref={form}>
        {inputs.map((input) => (
          <input
            key={input.id}
            className={styles.input}
            type={input.type}
            placeholder={input.name}
            required
            name={input.id}
            onKeyDown={(e) => {
              if (input.type !== "phone") return;

              let allow = false;

              if (Number(e.key)) allow = true;
              if (["(", ")", "+", "-"].indexOf(e.key) >= 0) allow = true;
              if (e.key.length > 1) allow = true;
              if (e.ctrlKey || e.altKey) allow = true;

              if (!allow) e.preventDefault();
            }}
          />
        ))}
      </form>
      <Button
        openReferral={false}
        sx={{
          width: "max-content",
          paddingLeft: "40px",
          paddingRight: "40px",
          fontSize: "16px",
          marginTop: "20px",
          ...(saving ? { backgroundColor: "#000a" } : {}),
        }}
        smallerDevice={!sm}
        onClick={() => {
          if (!form.current) return;
          if (saving) return;

          const data = Object.fromEntries(new FormData(form.current));

          const emailRegExp = new RegExp(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ // eslint-disable-line
          );
          if (!emailRegExp.test(data.email + "")) {
            alert.set("Hmm... that email doesn't look right");
            return false;
          }
          if ((data.name + "").length < 2) {
            alert.set("Please enter your name");
            return false;
          }
          if ((data.phone + "").length < 7 || (data.phone + "").length > 15) {
            alert.set("Hmm... that phone number doesn't look right");
            return false;
          }

          submitForm({
            ...answers.get,
            email: data.email + "",
            name: data.name + "",
            phone: data.phone + "",
          }).then(() => current.set(current.get + 1));

          answers.set({
            ...answers.get,
            email: data.email + "",
            name: data.name + "",
            phone: data.phone + "",
          });
        }}
      >
        {saving ? "Saving..." : button}
      </Button>
    </div>
  );

  function submitForm(data: Record<string, string>) {
    // return Promise.resolve("Yes");
    setSaving(true);
    return Axios.post(backend + "/saveminiform", {
      ...data,
      meta_referral: referralData.get.id,
    })
      .then((response) => {
        return response.data.success;
      })
      .catch((e) => setSaving(false));
  }
}

export default FindTutorModal;
