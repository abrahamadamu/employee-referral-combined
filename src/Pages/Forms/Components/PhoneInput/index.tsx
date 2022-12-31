import { Box, lighten, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./styles.module.scss";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { CSSProperties } from "react";

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  paddingBottom: "4px",

  // color: theme.palette.secondary.main,

  // fontFamily: theme.typography.fontFamily,
  // fontSize: "22pt",

  // border: "none",
  // borderBottom: "solid 1px",
  // borderBottomColor: lighten(theme.palette.secondary.main, 0.7),

  boxSizing: "border-box",

  "&::placeholder": {
    paddingBottom: "15px",
    color: lighten(theme.palette.secondary.main, 0.7),
  },
  "&:focus": {
    outline: "none",
    border: "none",
    borderBottom: "solid 3px",
    borderBottomColor: theme.palette.secondary.main,
  },
}));

export default function TextInput({
  placeholder,
  marginBottom,
  text,
}: {
  placeholder: string;
  marginBottom: string;
  text: { get: string; set: (t: string) => void };
}) {
  const theme = useTheme();

  const style = {
    "--phone-input-color-main": theme.palette.secondary.main,
    "--phone-input-color-lighter": lighten(theme.palette.secondary.main, 0.7),
    "--phone-input-font-family": theme.typography.fontFamily,
    "--phone-input-font-size": "22pt",
  } as CSSProperties;

  return (
    <Box className={styles.container} marginBottom={marginBottom} style={style}>
      <PhoneInput
        country="us"
        countryCodeEditable={false}
        enableSearch
        disableSearchIcon
        placeholder="Enter phone number"
        value={text.get}
        onChange={text.set}
        inputClass={styles.phoneinput}
        containerClass={styles.phonecontainer}
        buttonClass={styles.countrybutton}
        searchStyle={{ border: "none", color: theme.palette.secondary.light }}
        dropdownStyle={{ color: theme.palette.secondary.main }}
      />
      {/* <Input
        value={text.get}
        onChange={(e) => {
          text.set(e.target.value);
        }}
        type="text"
        placeholder={placeholder}
      /> */}
    </Box>
  );
}
