import { useState, useRef } from "react";
import {
  Grid,
  Typography,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Generate } from "./components";

import Axios from "axios";
import { backend } from "Commons/data";

import styles from "./styles.module.scss";

const linktype = "BOleE6NCysEMqsCzLLSS";
function Form({
  link,
}: {
  link: { get: string | undefined; set: (a: string | undefined) => void };
}) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  const form = useRef<HTMLFormElement>(null);

  function generateLink() {
    Axios.post(backend + "/getlink", {
      email,
      firstname,
      lastname,
      linktype,
    })
      .then((response) => {
        link.set(response.data);
      })
      .catch((response) => {
        console.log(response);
        link.set("");
      });
  }

  function checkAndSubmit() {
    if (link.get == undefined || !form.current) return;
    form.current.requestSubmit();
    if (form.current.checkValidity()) {
      generateLink();
      link.set(undefined);
    }
  }

  const FormComponent = styled("form")(({ theme }) => ({}));

  return (
    <form
      className={styles.grow}
      ref={form}
      style={{ width: md ? "60%" : "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Grid container gap={4} alignItems="center" justifyContent="center">
        <Typography variant="h5" color="#555">
          Get your referral link
        </Typography>
        <Grid container direction="column" maxWidth="300px">
          <TextField
            required
            type="email"
            variant="filled"
            sx={{
              ".MuiInputBase-root": {
                backgroundColor: "#fff5 !important",
              },
            }}
            placeholder="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && checkAndSubmit()}
          />
          <TextField
            required
            variant="filled"
            sx={{
              ".MuiInputBase-root": {
                backgroundColor: "#fff5 !important",
              },
            }}
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && checkAndSubmit()}
          />
          <TextField
            required
            variant="filled"
            sx={{
              ".MuiInputBase-root": {
                backgroundColor: "#fff5 !important",
              },
            }}
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && checkAndSubmit()}
          />
        </Grid>
        <Generate
          onClick={checkAndSubmit}
          sx={
            link.get == undefined
              ? {
                  backgroundColor: "lightgray",
                  "&:hover": {
                    filter: "brightness(1)",
                    cursor: "default",
                  },
                }
              : {}
          }
        >
          Get Referral Link
        </Generate>
      </Grid>
    </form>
  );
}

export default Form;
