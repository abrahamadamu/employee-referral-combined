import { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, useTheme, LinearProgress } from "@mui/material";
import styles from "./styles.module.scss";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

import ChoiceQuestion from "../../QuestionBoxes/Choice";
import TextQuestionForm from "../../QuestionBoxes/Text";
import PhoneQuestionForm from "../../QuestionBoxes/Phone";
import questions from "./questions";

import Axios from "axios";
import { backend } from "Commons/data";

export default function Form({
  stage,
}: {
  stage: { set: (s: number) => void; get: number };
}) {
  const theme = useTheme();
  const { URL_referral } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState([-1, 0]);
  const [data, setData] = useState<{ [name: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <Grid
        container
        gridTemplateColumns="1fr"
        sx={{ display: "grid" }}
        wrap="nowrap"
        width="max-content"
      >
        {questions.map((q, i) => {
          let className = "";
          if (currentQuestion[0] < currentQuestion[1]) {
            if (i + 1 < currentQuestion[1]) {
              className = styles.hiddenUp;
            } else if (i + 1 === currentQuestion[1]) {
              className = styles.flyOutUpAnim;
            } else if (i === currentQuestion[1]) {
              className = styles.flyInUpAnim;
            } else {
              className = styles.hiddenDown;
            }
          } else {
            if (currentQuestion[1] > i) {
              className = styles.hiddenUp;
            } else if (i === currentQuestion[1]) {
              className = styles.flyInDownAnim;
            } else if (i === currentQuestion[1] + 1) {
              className = styles.flyOutDownAnim;
            } else {
              className = styles.hiddenDown;
            }
          }

          switch (q.type) {
            case "text":
            case "email":
              return (
                <TextQuestionForm
                  name={q.name}
                  question={q.question}
                  subQuestion={q.subQuestion}
                  required={q.required}
                  type={q.type}
                  key={i}
                  className={className}
                  index={i}
                  next={next}
                  current={i === currentQuestion[1]}
                />
              );
            case "phone":
              return (
                <PhoneQuestionForm
                  name={q.name}
                  question={q.question}
                  subQuestion={q.subQuestion}
                  required={q.required}
                  key={i}
                  className={className}
                  index={i}
                  next={next}
                  current={i === currentQuestion[1]}
                />
              );
            case "choice":
              if (!q.choices) return <></>;
              return (
                <ChoiceQuestion
                  name={q.name}
                  question={q.question}
                  subQuestion={q.subQuestion}
                  options={q.choices}
                  required={q.required}
                  key={i}
                  className={className}
                  index={i}
                  next={next}
                  current={i === currentQuestion[1]}
                />
              );
            default:
              return <></>;
          }
        })}
      </Grid>
      <Grid
        container
        direction="row"
        className={styles.arrowContainer}
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <KeyboardArrowUp className={styles.arrow} onClick={previous} />
        <KeyboardArrowDown onClick={() => next()} className={styles.arrow} />
      </Grid>
      {submitting && (
        <Grid
          className={styles.submitting}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            width="max-content"
            direction="column"
            alignItems="center"
            gap={2}
          >
            <LinearProgress color="secondary" sx={{ width: "100px" }} />
            <Typography variant="h5">Submitting...</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );

  function next(answered?: { question: string; answer: string }) {
    let newArray = [...currentQuestion];
    newArray.push(Math.min(currentQuestion[1] + 1, questions.length - 1));
    newArray.shift();
    setCurrentQuestion(newArray);

    if (answered) {
      const newData = { ...data, [answered.question]: answered.answer };
      setData(newData);
      if (newArray[0] === newArray[1]) {
        setSubmitting(true);
        submit(newData)
          .then((response) => {
            if (response) {
              stage.set(2);
            }
          })
          .catch((e) => {
            setSubmitting(false);
          });
      }
    }
  }
  function previous() {
    let newArray = [...currentQuestion];
    newArray.push(Math.max(currentQuestion[1] - 1, 0));
    newArray.shift();
    if (newArray[0] === newArray[1]) return;
    setCurrentQuestion(newArray);
  }

  function submit(data: { [key: string]: string }) {
    for (let i = 0; i <= questions.length; i++) {
      const question = questions[i];
      if (question?.required && !data[question.name]) {
        setCurrentQuestion([currentQuestion[0], i]);
        return Promise.reject();
      }
    }
    return Axios.post(backend + "/saveform", {
      ...data,
      meta_referral: URL_referral,
    }).then((response) => {
      return response.data.success;
    });
  }
}
