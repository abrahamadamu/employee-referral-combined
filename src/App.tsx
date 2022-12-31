import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateLink from "./Pages/GenerateLink";
import SignupForm from "./Pages/Forms/Signup";
import Signup from "./Pages/Signup";
import ContextInitializer from "Contexts/contexts";
import "./app.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9663fc",
    },
    secondary: {
      main: "rgb(1, 66, 172)",
    },
  },
  typography: {
    fontFamily: "DMSans",
    title1: {
      fontFamily: "Recoleta",
      fontSize: "60px",
      fontWeight: 700,
      lineHeight: "70px",
      color: "black",
    },
    subtitle1: {
      fontFamily: "Proxima Nova",
      fontSize: "24px",
      fontWeight: 600,
      lineHeight: "1.6rem",
      margin: " 15px 0",
      color: "#444",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title1: "div",
        },
      },
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ContextInitializer>
          <CssBaseline />
          <Routes>
            <Route path="getlink" element={<GenerateLink />} />
            {["signup/form", "signup/form/:URL_referral"].map((path) => (
              <Route path={path} key={path} element={<SignupForm />} />
            ))}
            {["signup", "signup/:URL_referral"].map((path) => (
              <Route path={path} key={path} element={<Signup />} />
            ))}
          </Routes>
        </ContextInitializer>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
