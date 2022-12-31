import { ReactNode, useState, useEffect, useRef } from "react";
import { Alert } from "@mui/material";
import PhoneInput from "../../Components/PhoneInput";
import Button from "../../Components/Button";
import QuestionBox from "../Common/QuestionBox";

export default function PhoneQuestion({
  name,
  question,
  subQuestion,
  required,
  next,
  className,
  index,
  current,
}: {
  name: string;
  question: ReactNode;
  subQuestion?: ReactNode;
  required: boolean;
  next?: (data: { question: string; answer: string }) => void;
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
    <QuestionBox {...{ question, subQuestion, className, index }}>
      <PhoneInput
        text={{ get: text, set: setText }}
        placeholder="Type your answer here..."
        marginBottom="15px"
      />
      {error ? (
        <Alert sx={{ width: "max-content" }} severity="error">
          {error}
        </Alert>
      ) : (
        <Button text="Submit" smaller onClick={action} />
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
    if (text.length < 7) {
      setError("Hmm... that phone number doesn't look right");
      return false;
    }
    if (text.length > 15) {
      setError("Max characters reached");
      return false;
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
