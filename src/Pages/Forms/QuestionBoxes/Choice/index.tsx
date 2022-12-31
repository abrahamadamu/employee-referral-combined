import { ReactNode, useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, useTheme, lighten, Alert } from "@mui/material";
import Button from "../../Components/Button";
import { Check } from "@mui/icons-material";
import QuestionBox from "../Common/QuestionBox";
import styles from "./styles.module.scss";

export default function ChoiceQuestion({
  name,
  question,
  subQuestion,
  options,
  className,
  next,
  required,
  index,
  current,
}: {
  name: string;
  question: ReactNode;
  subQuestion?: ReactNode;
  options: { text: string; type: "text" | "other" }[];
  className?: string;
  next?: (data: { question: string; answer: string }) => void;
  required: boolean;
  index: number;
  current: boolean;
}) {
  const [selected, setSelected] = useState("");

  const actionFunction = useRef(action);
  actionFunction.current = action;

  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    if (selected.indexOf("other") == -1 && selected) action();
  }, [selected]);

  useEffect(() => {
    if (!current) return;
    document.onkeydown = (e) => {
      if (e.key == "Enter") actionFunction.current();
    };
  }, [index, current]);

  return (
    <QuestionBox {...{ question, subQuestion, className, index }}>
      <Grid
        container
        gap={1}
        direction="column"
        width="max-content"
        marginBottom="15px"
      >
        {options.map((option, index) => (
          <Option
            key={option.text}
            {...{ text: option.text, index }}
            selected={{ get: selected, set: setSelected }}
            other={option.type === "other"}
          />
        ))}
      </Grid>
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
      if (!selected) {
        setError("Oops! Please make a selection");
        return false;
      }
    }

    return true;
  }

  function action() {
    if (validate() && next) {
      next({ question: name, answer: selected });
    } else {
    }
  }
}

function Option({
  text,
  index,
  selected,
  other,
}: {
  text: string;
  index: number;
  selected: { get: string; set: (index: string) => void };
  other?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text.replace(/[oO]ther: /, ""));

  const theme = useTheme();
  const lightbg = lighten(theme.palette.secondary.main, 0.85);
  const mainColor = theme.palette.secondary.main;

  const isSelected = (selected.get + "").replace(/[oO]ther: /, "") === value;
  return (
    <Grid
      className={styles.optionContainer}
      container
      sx={{
        backgroundColor: lightbg,
        border: `${isSelected ? "3px" : "1px"} solid ${
          theme.palette.secondary.light
        }`,
      }}
      onClick={() => {
        selected.set(other ? "other: " + value : value);
      }}
    >
      <Grid
        container
        direction="row"
        gap={1}
        wrap="nowrap"
        alignItems="center"
        minWidth="160px"
      >
        {!editing && (
          <Grid
            container
            width="24px"
            height="24px"
            sx={{
              padding: "2px",
              backgroundColor: isSelected ? mainColor : "white",
              borderRadius: "2px",
              border: `"1px" solid ${mainColor}`,
              color: isSelected ? "white" : mainColor,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ lineHeight: 0, fontSize: "13px", fontWeight: "bold" }}>
              {String.fromCharCode(65 + index)}
            </Box>
          </Grid>
        )}
        {other && editing ? (
          <input
            autoFocus
            className={styles.otherInput}
            style={{ backgroundColor: lightbg, color: mainColor }}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              selected.set("other: " + e.target.value);
            }}
            type="text"
            onBlur={(e) => {
              setEditing(false);
            }}
          />
        ) : (
          <Typography
            color={mainColor}
            fontSize={{ xs: "16px", sm: "18px" }}
            flexGrow="1"
            onClick={(e) => {
              if (other) {
                setEditing(true);
              }
            }}
          >
            {other ? value.replace(/other: /, "") : value}
          </Typography>
        )}
        {isSelected && <Check sx={{ color: mainColor }} />}
      </Grid>
    </Grid>
  );
}
