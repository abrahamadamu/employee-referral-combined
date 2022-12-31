import { ReactNode, useState, useRef, useEffect } from "react";
import { Alert } from "@mui/material";
import TextInput from "../../Components/TextInput";
import Button from "../../Components/Button";
import QuestionBox from "../Common/QuestionBox";

export default function TextQuestion({
  name,
  question,
  subQuestion,
  required,
  next,
  type,
  className,
  index,
  current,
}: {
  name: string;
  question: ReactNode;
  subQuestion?: ReactNode;
  required: boolean;
  next?: (data: { question: string; answer: string }) => void;
  type?: "email" | "text";
  className?: string;
  index: number;
  current: boolean;
}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const actionFunction = useRef(action);
  actionFunction.current = action;

  useEffect(() => {
    setError("");
  }, [text]);

  useEffect(() => {
    if (!current) return;
    document.onkeydown = (e) => {
      if (e.key == "Enter") actionFunction.current();
    };
  }, [index, current]);

  return (
    <QuestionBox {...{ question, subQuestion, className, index, next }}>
      <TextInput
        text={{ get: text, set: setText }}
        placeholder={
          type == "email" ? "name@example.com" : "Type your answer here..."
        }
        marginBottom="15px"
        action={action}
      />
      {error ? (
        <Alert sx={{ width: "max-content" }} severity="error">
          {error}
        </Alert>
      ) : (
        <Button text="OK" smaller onClick={action} />
      )}
    </QuestionBox>
  );

  function validate() {
    if (required) {
      if (!text) {
        setError("Please fill this in");
        return false;
      }
    }
    if (type == "email") {
      const emailRegExp = new RegExp(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ // eslint-disable-line
      );
      if (!emailRegExp.test(text)) {
        setError("Hmm... that email doesn't look right");
        return false;
      }
    }
    return true;
  }

  function action() {
    if (validate() && next) {
      next({ question: name, answer: text });
    } else {
    }
  }
}
