import { Box, lighten } from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "./styles.module.scss";

const Input = styled("input")(({ theme }) => ({
  width: "100%",
  paddingBottom: "4px",

  color: theme.palette.secondary.main,

  fontFamily: theme.typography.fontFamily,
  fontSize: "22pt",

  border: "none",
  borderBottom: "solid 1px",
  borderBottomColor: lighten(theme.palette.secondary.main, 0.7),

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
  action,
}: {
  placeholder: string;
  marginBottom: string;
  text: { get: string; set: (t: string) => void };
  action: () => void;
}) {
  return (
    <Box className={styles.container} marginBottom={marginBottom}>
      <Input
        value={text.get}
        sx={{ fontSize: { xs: "24px", sm: "30px" } }}
        onChange={(e) => {
          text.set(e.target.value);
        }}
        type="text"
        placeholder={placeholder}
      />
    </Box>
  );
}
